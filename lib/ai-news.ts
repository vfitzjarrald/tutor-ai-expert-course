import { AI_NEWS_FEEDS } from "@/config/ai-news-feeds";

export type AiNewsItem = {
  title: string;
  source: string;
  url: string;
  publishedAt: string | null;
  summary: string;
};

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function plainText(value: string) {
  return decodeXml(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function field(block: string, names: string[]) {
  for (const name of names) {
    const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
    if (match?.[1]) return match[1];
  }
  return "";
}

function atomLink(block: string) {
  const match =
    block.match(/<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["']/i) ??
    block.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  return match?.[1] ?? "";
}

export function parseNewsFeed(xml: string, source: string): AiNewsItem[] {
  const blocks = [
    ...xml.matchAll(/<(item|entry)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi),
  ].map((match) => match[2]);

  return blocks
    .map((block) => {
      const title = plainText(field(block, ["title"]));
      const url = plainText(field(block, ["link"])) || atomLink(block);
      const publishedRaw = plainText(field(block, ["pubDate", "published", "updated", "dc:date"]));
      const description = plainText(field(block, ["description", "summary", "content", "content:encoded"]));
      const date = publishedRaw ? new Date(publishedRaw) : null;
      return {
        title,
        source,
        url,
        publishedAt: date && !Number.isNaN(date.getTime()) ? date.toISOString() : null,
        summary:
          description.length > 280 ? `${description.slice(0, 277).trimEnd()}…` : description,
      };
    })
    .filter((item) => item.title && /^https?:\/\//.test(item.url));
}

async function fetchFeed(feed: (typeof AI_NEWS_FEEDS)[number]) {
  const response = await fetch(feed.url, {
    headers: { "User-Agent": "My-AI-Day/1.0" },
    next: { revalidate: 60 * 60 * 24 },
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) throw new Error(`${feed.name} returned ${response.status}`);
  return parseNewsFeed(await response.text(), feed.name);
}

export async function getAiNews(limit = 6): Promise<AiNewsItem[]> {
  const results = await Promise.allSettled(AI_NEWS_FEEDS.map(fetchFeed));
  const deduped = new Map<string, AiNewsItem>();

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const item of result.value) {
      const key = item.url.replace(/\/$/, "").toLowerCase() || item.title.toLowerCase();
      if (!deduped.has(key)) deduped.set(key, item);
    }
  }

  return [...deduped.values()]
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, limit);
}
