"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createUserAction,
  loginAction,
  resetPasswordAction,
  saveNoteAction,
  toggleDayCompleteAction,
  type ActionResult,
} from "@/app/actions";

export function CompleteToggle({
  week,
  day,
  completed,
}: {
  week: number;
  day: number;
  completed: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => {
        startTransition(async () => {
          await toggleDayCompleteAction(fd);
          router.refresh();
        });
      }}
    >
      <input type="hidden" name="week" value={week} />
      <input type="hidden" name="day" value={day} />
      <input type="hidden" name="completed" value={completed ? "false" : "true"} />
      <button type="submit" className={completed ? "btn-secondary" : "btn-primary"} disabled={pending}>
        {pending ? "Saving…" : completed ? "Mark incomplete" : "Mark complete"}
      </button>
    </form>
  );
}

export function NoteEditor({
  week,
  day,
  initialBody,
}: {
  week: number;
  day: number;
  initialBody: string;
}) {
  const [body, setBody] = useState(initialBody);
  const [status, setStatus] = useState<string>("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setBody(initialBody);
  }, [initialBody, week, day]);

  function scheduleSave(next: string) {
    setBody(next);
    setStatus("Saving…");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const fd = new FormData();
      fd.set("week", String(week));
      fd.set("day", String(day));
      fd.set("body", next);
      const result = await saveNoteAction(fd);
      setStatus(result.ok ? "Saved" : result.error);
    }, 600);
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-heading" htmlFor="day-notes">
        Your notes
      </label>
      <textarea
        id="day-notes"
        className="textarea-field min-h-[180px]"
        value={body}
        onChange={(e) => scheduleSave(e.target.value)}
        placeholder="Capture takeaways, lab results, questions…"
      />
      <p className="mt-2 text-xs text-text-muted">{status || "Autosaves across devices"}</p>
    </div>
  );
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null as ActionResult | null);

  return (
    <form action={formAction} className="card space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-heading" htmlFor="username">
          Username
        </label>
        <input id="username" name="username" className="input-field" autoComplete="username" required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-heading" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input-field"
          autoComplete="current-password"
          required
        />
      </div>
      {state && !state.ok ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" className="btn-primary w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createUserAction, null as ActionResult | null);

  return (
    <form action={formAction} className="card space-y-4">
      <h2 className="text-lg text-heading">Issue learner access</h2>
      <div>
        <label className="mb-1 block text-sm font-semibold text-heading" htmlFor="new-username">
          Username
        </label>
        <input id="new-username" name="username" className="input-field" required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-heading" htmlFor="displayName">
          Display name (optional)
        </label>
        <input id="displayName" name="displayName" className="input-field" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-heading" htmlFor="new-password">
          Password (leave blank to generate)
        </label>
        <input id="new-password" name="password" type="text" className="input-field" />
      </div>
      <label className="flex items-center gap-2 text-sm text-heading">
        <input type="checkbox" name="generate" defaultChecked />
        Generate a strong password
      </label>
      {state?.ok ? (
        <div className="border border-primary/30 bg-primary/5 p-3 text-sm text-heading">
          <p>{state.message}</p>
          {state.password ? (
            <p className="mt-2 font-mono text-base font-semibold text-primary">{state.password}</p>
          ) : null}
          <p className="mt-2 text-xs text-text-muted">Copy it now — it won’t be shown again.</p>
        </div>
      ) : null}
      {state && !state.ok ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "Creating…" : "Create learner"}
      </button>
    </form>
  );
}

export function ResetPasswordButton({ userId }: { userId: string }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, null as ActionResult | null);

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="userId" value={userId} />
      <button type="submit" className="btn-secondary text-xs" disabled={pending}>
        {pending ? "…" : "Reset password"}
      </button>
      {state?.ok && state.password ? (
        <p className="font-mono text-xs text-primary">{state.password}</p>
      ) : null}
      {state && !state.ok ? <p className="text-xs text-red-600">{state.error}</p> : null}
    </form>
  );
}
