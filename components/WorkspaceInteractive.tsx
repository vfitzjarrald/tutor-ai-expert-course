"use client";

import { useActionState, useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  runPlaygroundAction,
  saveWorkspaceFileAction,
  setLearningTrackAction,
  type PlaygroundActionResult,
} from "@/app/actions";
import type { LearningTrack } from "@/lib/learning-track";
import type {
  WorkspaceGuideLesson,
  WorkspaceLessonStatus,
} from "@/lib/workspace-guide";
import type { PlaygroundRecipe } from "@/lib/workspace-overlays";

function padWeek(week: number): string {
  return String(week).padStart(2, "0");
}

function statusLabel(status: WorkspaceLessonStatus): string {
  switch (status) {
    case "done":
      return "Done";
    case "waived":
      return "Waived";
    case "today":
      return "Today";
    case "upcoming":
      return "Up next";
    case "locked":
      return "Locked";
  }
}

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

function StatusBadge({ status }: { status: WorkspaceLessonStatus }) {
  const styles: Record<WorkspaceLessonStatus, string> = {
    today: "bg-primary/15 text-primary",
    upcoming: "bg-accent/15 text-accent",
    done: "bg-emerald-100 text-emerald-800",
    waived: "bg-violet-100 text-violet-800",
    locked: "bg-surface text-text-muted",
  };
  return (
    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles[status]}`}>
      {statusLabel(status)}
    </span>
  );
}

export function WorkspaceEditor({
  initialPath,
  initialBody,
  files,
  upNext,
  phaseLessons,
  currentPhase,
  activeLesson,
  fileStatus,
}: {
  initialPath: string;
  initialBody: string;
  files: Array<{ path: string; updatedAt: string }>;
  upNext: WorkspaceGuideLesson[];
  phaseLessons: WorkspaceGuideLesson[];
  currentPhase: number | null;
  activeLesson: WorkspaceGuideLesson | null;
  fileStatus: Record<string, boolean>;
}) {
  const router = useRouter();
  const [path, setPath] = useState(initialPath);
  const [body, setBody] = useState(initialBody);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const lesson of [...upNext, ...phaseLessons]) {
      if (lesson.status === "today" || lesson.status === "upcoming") {
        initial[lesson.nodeId] = true;
      }
    }
    return initial;
  });

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

  const guidedPaths = useMemo(() => {
    const set = new Set<string>();
    for (const lesson of phaseLessons.length ? phaseLessons : upNext) {
      for (const filePath of lesson.files) set.add(filePath);
    }
    for (const lesson of upNext) {
      for (const filePath of lesson.files) set.add(filePath);
    }
    return set;
  }, [phaseLessons, upNext]);

  const orphanFiles = files.filter((file) => !guidedPaths.has(file.path));

  const placeholder = activeLesson
    ? `Deliverable: ${activeLesson.deliverable}`
    : "Write your deliverable here…";

  function renderLessonGroup(lesson: WorkspaceGuideLesson) {
    const isOpen = expanded[lesson.nodeId] ?? lesson.status === "today";
    return (
      <div key={lesson.nodeId} className="rounded border border-border/70">
        <button
          type="button"
          className="flex w-full items-start justify-between gap-2 px-2 py-2 text-left hover:bg-surface"
          onClick={() =>
            setExpanded((prev) => ({ ...prev, [lesson.nodeId]: !isOpen }))
          }
        >
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-heading">
              W{padWeek(lesson.week)} · D{lesson.day}
            </span>
            <span className="block truncate text-[11px] text-text-muted">{lesson.title}</span>
          </span>
          <StatusBadge status={lesson.status} />
        </button>
        {isOpen ? (
          <ul className="space-y-0.5 border-t border-border/60 px-1 py-1">
            {lesson.files.map((filePath) => (
              <li key={filePath}>
                <Link
                  href={`/workspace?path=${encodeURIComponent(filePath)}`}
                  className={`block truncate rounded px-2 py-1 text-xs ${
                    filePath === path
                      ? "bg-primary/10 font-semibold text-heading"
                      : "text-text hover:bg-surface"
                  }`}
                  title={filePath}
                >
                  <span className="mr-1 text-[10px] text-text-muted">
                    {fileStatus[filePath] ? "●" : "○"}
                  </span>
                  {filePath.split("/").pop()}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="card max-h-[70vh] space-y-4 overflow-auto">
        {upNext.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Up next</p>
            <div className="space-y-2">{upNext.map(renderLessonGroup)}</div>
          </div>
        ) : null}

        {phaseLessons.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              {currentPhase != null ? `Phase ${currentPhase}` : "This phase"}
            </p>
            <div className="space-y-2">
              {phaseLessons
                .filter((lesson) => !upNext.some((entry) => entry.nodeId === lesson.nodeId))
                .map(renderLessonGroup)}
            </div>
          </div>
        ) : null}

        {orphanFiles.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">My files</p>
            <ul className="space-y-1 text-sm">
              {orphanFiles.map((file) => (
                <li key={file.path}>
                  <Link
                    href={`/workspace?path=${encodeURIComponent(file.path)}`}
                    className={`block truncate rounded px-2 py-1 ${
                      file.path === path
                        ? "bg-primary/10 font-semibold text-heading"
                        : "text-text hover:bg-surface"
                    }`}
                  >
                    {file.path}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

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

      <div className="space-y-4">
        {activeLesson ? (
          <div className="card space-y-4 border-primary/20 bg-gradient-to-br from-white via-primary/5 to-accent/5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Week {padWeek(activeLesson.week)} · Day {activeLesson.day}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-heading">{activeLesson.title}</h2>
                <p className="mt-1 text-sm text-text-muted">{activeLesson.weekTitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={activeLesson.status} />
                <Link
                  href={`/weeks/${activeLesson.week}/days/${activeLesson.day}`}
                  className="btn-secondary text-xs"
                >
                  Open lesson
                </Link>
              </div>
            </div>

            {activeLesson.objective ? (
              <p className="text-sm">
                <span className="font-semibold text-heading">Objective: </span>
                {activeLesson.objective}
              </p>
            ) : null}
            <p className="text-sm">
              <span className="font-semibold text-heading">Deliverable: </span>
              {activeLesson.deliverable}
            </p>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Lab steps</p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm">
                {activeLesson.labSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Suggested files
              </p>
              <ul className="mt-2 space-y-1">
                {activeLesson.files.map((filePath) => (
                  <li key={filePath}>
                    <Link
                      href={`/workspace?path=${encodeURIComponent(filePath)}`}
                      className={`flex items-center justify-between gap-2 rounded px-2 py-1 text-sm ${
                        filePath === path
                          ? "bg-primary/10 font-semibold text-heading"
                          : "hover:bg-white/70"
                      }`}
                    >
                      <code className="truncate">{filePath}</code>
                      <span className="shrink-0 text-xs text-text-muted">
                        {fileStatus[filePath] ? "Saved" : "Empty"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {activeLesson.playground ? (
              <p className="text-xs text-text-muted">
                This lesson includes an AI playground.{" "}
                <Link
                  href={`/weeks/${activeLesson.week}/days/${activeLesson.day}`}
                  className="nav-link"
                >
                  Run it on the lesson page
                </Link>
                , then return here to review the saved transcript.
              </p>
            ) : null}
          </div>
        ) : (
          <div className="card text-sm text-text-muted">
            Select a lesson file from the sidebar, or create a custom path. Files linked to Fast Track
            lessons show lab steps and the deliverable here.
          </div>
        )}

        <div className="card space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <code className="text-sm text-heading">{path || "Select a file"}</code>
            <button
              type="button"
              className="btn-primary text-xs"
              disabled={pending || !path}
              onClick={() => save()}
            >
              {pending ? "Saving…" : "Save"}
            </button>
          </div>
          <textarea
            className="min-h-[22rem] w-full rounded border border-border bg-white p-3 font-mono text-sm leading-relaxed text-heading"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
              setStatus(null);
            }}
            placeholder={placeholder}
          />
          {status ? <p className="text-xs text-text-muted">{status}</p> : null}
        </div>
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
