"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { markAchievementsCelebratedAction } from "@/app/actions";
import { AchievementBadge } from "@/components/AchievementBadge";
import type { AchievementDefinition } from "@/config/achievements";
import { getAchievement } from "@/config/achievements";

export type CelebrationItem = {
  achievementId: string;
  title?: string;
};

export function AchievementCelebration({
  pending,
}: {
  pending: CelebrationItem[];
}) {
  const [items, setItems] = useState(pending);
  const [open, setOpen] = useState(pending.length > 0);
  const [pendingClose, startTransition] = useTransition();
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setItems(pending);
    setOpen(pending.length > 0);
  }, [pending]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        const ids = items.map((item) => item.achievementId);
        setOpen(false);
        startTransition(async () => {
          await markAchievementsCelebratedAction(ids);
        });
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, items]);

  function dismiss() {
    const ids = items.map((item) => item.achievementId);
    setOpen(false);
    startTransition(async () => {
      await markAchievementsCelebratedAction(ids);
    });
  }

  if (!open || items.length === 0) return null;

  const definitions = items
    .map((item) => getAchievement(item.achievementId))
    .filter(Boolean) as AchievementDefinition[];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-card border border-border bg-white p-6 shadow-card"
      >
        <p className="page-hero-step mb-1">Achievement unlocked</p>
        <h2 id={titleId} className="text-2xl text-heading">
          Congratulations!
        </h2>
        <p id={descId} className="mt-2 text-sm text-text-muted">
          You demonstrated proficiency and earned{" "}
          {definitions.length === 1 ? "a new badge" : `${definitions.length} new badges`}.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {definitions.map((achievement) => (
            <div key={achievement.id} className="rounded-xl border border-border bg-surface/40 p-3 text-center">
              <AchievementBadge achievement={achievement} earned size={88} />
              <p className="mt-2 text-sm font-semibold text-heading">{achievement.title}</p>
              <p className="mt-1 text-xs text-text-muted">{achievement.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/achievements" className="btn-primary" onClick={dismiss}>
            View My Achievements
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="btn-secondary"
            onClick={dismiss}
            disabled={pendingClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
