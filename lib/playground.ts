import { getDb } from "./db";
import {
  isLocalStoreMode,
  localCountPlaygroundRunsSince,
  localRecordPlaygroundRun,
} from "./local-store";

const MAX_RUNS_PER_HOUR = 30;
const MAX_TOKENS = 800;

export type PlaygroundResult =
  | { ok: true; output: string; model: string }
  | { ok: false; error: string };

function playgroundConfig() {
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const apiKey = gatewayKey || openaiKey;
  const baseUrl = (
    process.env.AI_GATEWAY_URL?.trim() ||
    (gatewayKey ? "https://ai-gateway.vercel.sh/v1" : "https://api.openai.com/v1")
  ).replace(/\/$/, "");
  const model =
    process.env.PLAYGROUND_MODEL?.trim() ||
    (gatewayKey ? "openai/gpt-4o-mini" : "gpt-4o-mini");
  return { apiKey, baseUrl, model };
}

export function isPlaygroundConfigured(): boolean {
  return Boolean(playgroundConfig().apiKey);
}

async function countRecentRuns(userId: string): Promise<number> {
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  if (isLocalStoreMode()) return localCountPlaygroundRunsSince(userId, since);
  const sql = getDb();
  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM playground_runs
    WHERE user_id = ${userId} AND created_at >= ${since}::timestamptz
  `;
  return Number((rows[0] as { count: number } | undefined)?.count ?? 0);
}

async function recordRun(userId: string) {
  if (isLocalStoreMode()) {
    await localRecordPlaygroundRun(userId);
    return;
  }
  const sql = getDb();
  await sql`INSERT INTO playground_runs (user_id) VALUES (${userId})`;
}

export async function runPlaygroundChat(opts: {
  userId: string;
  systemPrompt: string;
  userPrompt: string;
}): Promise<PlaygroundResult> {
  const { apiKey, baseUrl, model } = playgroundConfig();
  if (!apiKey) {
    return {
      ok: false,
      error:
        "AI playground is not configured. Set AI_GATEWAY_API_KEY or OPENAI_API_KEY on the server.",
    };
  }

  const recent = await countRecentRuns(opts.userId);
  if (recent >= MAX_RUNS_PER_HOUR) {
    return { ok: false, error: `Rate limit: max ${MAX_RUNS_PER_HOUR} playground runs per hour.` };
  }

  const systemPrompt = opts.systemPrompt.slice(0, 4000);
  const userPrompt = opts.userPrompt.slice(0, 8000);

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return {
        ok: false,
        error: `Provider error (${response.status})${detail ? `: ${detail.slice(0, 200)}` : ""}`,
      };
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const output = data.choices?.[0]?.message?.content?.trim();
    if (!output) return { ok: false, error: "Empty response from model." };

    await recordRun(opts.userId);
    return { ok: true, output, model };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Playground request failed",
    };
  }
}
