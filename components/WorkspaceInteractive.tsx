"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  runPlaygroundAction,
  saveWorkspaceFileAction,
  setLearningTrackAction,
  type PlaygroundActionResult,
} from "@/app/actions";
import type { LearningTrack } from "@/lib/learning-track";
import type { PlaygroundRecipe } from "@/lib/workspace-overlays";

export function TrackSelectionCards({
  current,
  compact = false,
}: {
  current?: LearningTrack | null;
  compact?: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function choose(track: LearningTrack) {
    setError(null);
    startTransition(async () => {
      const result = await setLearningTrackAction(track);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
        <button
          type="button"
          disabled={pending}
          onClick={() => choose("dev")}
          className={`card text-left transition hover:border-primary/40 ${
            current === "dev" ? "border-primary ring-1 ring-primary/30" : ""
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Dev Path</p>
          <p className="mt-2 text-lg font-semibold text-heading">Build in my own systems</p>
          <p className="mt-2 text-sm text-text-muted">
            Use Cursor, git, and your local repo. Best if you are comfortable with code and terminals.
          </p>
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => choose("workspace")}
          className={`card text-left transition hover:border-primary/40 ${
            current === "workspace" ? "border-primary ring-1 ring-primary/30" : ""
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Workspace Path</p>
          <p className="mt-2 text-lg font-semibold text-heading">Build in app workspace</p>
          <p className="mt-2 text-sm text-text-muted">
            Complete labs inside the site — notes, configs, and a managed AI playground. No local git required.
          </p>
        </button>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {pending ? <p className="text-sm text-text-muted">Saving path…</p> : null}
    </div>
  );
}

export function WorkspaceEditor({
  initialPath,
  initialBody,
  files,
  suggestedPaths = [],
}: {
  initialPath: string;
  initialBody: string;
  files: Array<{ path: string; updatedAt: string }>;
  suggestedPaths?: string[];
}) {
  const router = useRouter();
  const [path, setPath] = useState(initialPath);
  const [body, setBody] = useState(initialBody);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setPath(initialPath);
    setBody(initialBody);
  }, [initialPath, initialBody]);

  function save(nextBody = body, nextPath = path) {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("path", nextPath);
      fd.set("body", nextBody);
      const result = await saveWorkspaceFileAction(null, fd);
      if (result.ok) {
        setStatus("Saved");
        router.refresh();
      } else {
        setStatus(result.error);
      }
    });
  }

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (path && body !== initialBody) save(body, path);
    }, 900);
    return () => window.clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, path]);

  const allPaths = [...new Set([...suggestedPaths, ...files.map((f) => f.path)])].sort();

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="card space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Files</p>
        <ul className="max-h-[28rem] space-y-1 overflow-auto text-sm">
          {allPaths.map((filePath) => (
            <li key={filePath}>
              <Link
                href={`/workspace?path=${encodeURIComponent(filePath)}`}
                className={`block truncate rounded px-2 py-1 ${
                  filePath === path ? "bg-primary/10 font-semibold text-heading" : "text-text hover:bg-surface"
                }`}
              >
                {filePath}
              </Link>
            </li>
          ))}
        </ul>
        <form
          className="space-y-2 border-t border-border pt-3"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const input = new FormData(form).get("newPath");
            const next = String(input ?? "").trim();
            if (!next) return;
            setPath(next);
            setBody("");
            save("", next);
            form.reset();
          }}
        >
          <label className="block text-xs text-text-muted">
            New file path
            <input
              name="newPath"
              className="mt-1 w-full rounded border border-border bg-white px-2 py-1.5 text-sm"
              placeholder="notes/week-01/my-file.md"
            />
          </label>
          <button type="submit" className="btn-secondary w-full text-xs" disabled={pending}>
            Create
          </button>
        </form>
      </aside>
      <div className="card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <code className="text-sm text-heading">{path || "Select a file"}</code>
          <button type="button" className="btn-primary text-xs" disabled={pending || !path} onClick={() => save()}>
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
        <textarea
          className="min-h-[28rem] w-full rounded border border-border bg-white p-3 font-mono text-sm leading-relaxed text-heading"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            setStatus(null);
          }}
          placeholder="Write your deliverable here…"
        />
        {status ? <p className="text-xs text-text-muted">{status}</p> : null}
      </div>
    </div>
  );
}

export function WorkspaceLessonPanel({
  files,
  fileStatus,
  deliverable,
  labSteps,
}: {
  files: string[];
  fileStatus: Record<string, boolean>;
  deliverable: string;
  labSteps: string[];
}) {
  const filled = files.filter((f) => fileStatus[f]).length;
  return (
    <div className="card space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">My Workspace</p>
        <p className="mt-2 text-sm text-heading">{deliverable}</p>
        <p className="mt-1 text-xs text-text-muted">
          {filled}/{files.length} suggested files have content (soft check — not required to mark complete).
        </p>
      </div>
      <ol className="list-decimal space-y-2 pl-5 text-sm">
        {labSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <ul className="space-y-2">
        {files.map((filePath) => (
          <li key={filePath} className="flex items-center justify-between gap-2 text-sm">
            <code className="truncate rounded bg-surface px-2 py-1 text-heading">{filePath}</code>
            <span className="shrink-0 text-xs text-text-muted">{fileStatus[filePath] ? "Saved" : "Empty"}</span>
          </li>
        ))}
      </ul>
      <Link
        href={files[0] ? `/workspace?path=${encodeURIComponent(files[0])}` : "/workspace"}
        className="btn-primary inline-flex text-sm"
      >
        Open in Workspace
      </Link>
    </div>
  );
}

export function AiPlaygroundPanel({
  recipe,
  optional = false,
}: {
  recipe: PlaygroundRecipe;
  optional?: boolean;
}) {
  const [userPrompt, setUserPrompt] = useState(recipe.userPromptTemplate);
  const [state, formAction, pending] = useActionState(
    runPlaygroundAction,
    null as PlaygroundActionResult | null,
  );

  return (
    <div className="card space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          {optional ? "Optional · " : ""}AI Playground
        </p>
        <p className="mt-2 text-sm text-heading">Run a managed LLM experiment (no local API keys).</p>
        {recipe.hint ? <p className="mt-1 text-xs text-text-muted">{recipe.hint}</p> : null}
      </div>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="systemPrompt" value={recipe.systemPrompt} />
        <input type="hidden" name="outputPath" value={recipe.outputPath} />
        <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
          User message
          <textarea
            name="userPrompt"
            className="mt-2 min-h-[8rem] w-full rounded border border-border bg-white p-3 text-sm"
            value={userPrompt}
            onChange={(event) => setUserPrompt(event.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn-primary text-sm" disabled={pending}>
          {pending ? "Running…" : "Run playground"}
        </button>
      </form>
      {state?.ok ? (
        <div className="space-y-2 rounded border border-primary/20 bg-primary/5 p-3 text-sm">
          <p className="font-semibold text-heading">Model reply ({state.model})</p>
          <pre className="whitespace-pre-wrap font-sans text-text">{state.output}</pre>
          {state.savedPath ? (
            <p className="text-xs text-text-muted">
              Saved to <code>{state.savedPath}</code>
            </p>
          ) : null}
        </div>
      ) : null}
      {state && !state.ok ? <p className="text-sm text-red-600">{state.error}</p> : null}
    </div>
  );
}
