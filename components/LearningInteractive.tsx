"use client";

import { useActionState, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitQuizAction, toggleGateItemAction, type ActionResult } from "@/app/actions";
import type { QuizQuestion, QuizScope } from "@/lib/checks";
import type { GateItem } from "@/lib/gates";

export function QuizForm({
  questions,
  scope,
  threshold,
}: {
  questions: QuizQuestion[];
  scope: QuizScope;
  threshold: number;
}) {
  const [state, formAction, pending] = useActionState(submitQuizAction, null as ActionResult | null);
  const [revealed, setRevealed] = useState(false);

  return (
    <form
      action={async (fd) => {
        await formAction(fd);
        setRevealed(true);
      }}
      className="space-y-6"
    >
      <input type="hidden" name="scope" value={scope} />
      {questions.map((q) => (
        <fieldset key={q.id} className="card">
          <legend className="mb-3 text-sm font-semibold text-heading">
            Q{q.number}. {q.stem}
          </legend>
          <div className="space-y-2">
            {q.choices.map((c) => (
              <label key={c.letter} className="flex cursor-pointer items-start gap-2 text-sm">
                <input type="radio" name={`answer-${q.id}`} value={c.letter} className="mt-1" required />
                <span>
                  <span className="font-semibold text-heading">{c.letter})</span> {c.text}
                </span>
              </label>
            ))}
          </div>
          {revealed && state?.ok ? (
            <p className="mt-3 text-sm text-text-muted">
              <span className="font-semibold text-heading">Explanation: </span>
              {q.explanation}
            </p>
          ) : null}
        </fieldset>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "Scoring…" : "Submit quiz"}
        </button>
        <span className="text-xs text-text-muted">Passing threshold: ≥{threshold}%</span>
      </div>
      {state?.ok ? (
        <div className="border border-primary/30 bg-primary/5 p-4 text-sm text-heading">{state.message}</div>
      ) : null}
      {state && !state.ok ? <p className="text-sm text-red-600">{state.error}</p> : null}
    </form>
  );
}

export function GateChecklist({
  items,
  states,
}: {
  items: GateItem[];
  states: Record<string, boolean>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const done = states[`${item.phase}:${item.key}`] ?? false;
        return (
          <li key={item.key} className="flex items-start gap-3 rounded border border-border bg-white px-3 py-2">
            <form
              action={(fd) => {
                startTransition(async () => {
                  await toggleGateItemAction(fd);
                  router.refresh();
                });
              }}
            >
              <input type="hidden" name="phase" value={item.phase} />
              <input type="hidden" name="itemKey" value={item.key} />
              <input type="hidden" name="done" value={done ? "false" : "true"} />
              <button
                type="submit"
                disabled={pending}
                className={`mt-0.5 h-5 w-5 border ${done ? "border-primary bg-primary text-white" : "border-border bg-white"}`}
                aria-label={done ? "Mark incomplete" : "Mark complete"}
              >
                {done ? "✓" : ""}
              </button>
            </form>
            <span className={`text-sm ${done ? "text-text-muted line-through" : "text-heading"}`}>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function PathHints({ paths, noteBody, week, day }: { paths: string[]; noteBody: string; week: number; day: number }) {
  const exportName = useMemo(() => {
    const preferred = paths.find((p) => p.includes(`week-${String(week).padStart(2, "0")}`)) ?? paths[0];
    if (preferred?.endsWith(".md")) return preferred.split("/").pop() ?? `week-${week}-day-${day}-notes.md`;
    return `week-${String(week).padStart(2, "0")}-day-${String(day).padStart(2, "0")}-notes.md`;
  }, [paths, week, day]);

  function copy(text: string) {
    void navigator.clipboard.writeText(text);
  }

  function downloadNote() {
    const blob = new Blob([noteBody || ""], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportName;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Suggested repo paths</p>
      {paths.length === 0 ? (
        <p className="text-sm text-text-muted">No `notes/`, `capstone/`, or `labs/` paths found in this lesson.</p>
      ) : (
        <ul className="space-y-2">
          {paths.map((p) => (
            <li key={p} className="flex items-center justify-between gap-2 text-sm">
              <code className="truncate rounded bg-surface px-2 py-1 text-heading">{p}</code>
              <button type="button" className="btn-secondary text-xs" onClick={() => copy(p)}>
                Copy
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2 pt-2">
        <button type="button" className="btn-secondary text-xs" onClick={() => copy(noteBody)}>
          Copy note
        </button>
        <button type="button" className="btn-primary text-xs" onClick={downloadNote}>
          Export {exportName}
        </button>
      </div>
      <p className="text-xs text-text-muted">Paste into Cursor under the suggested path — the app does not write to the repo.</p>
    </div>
  );
}
