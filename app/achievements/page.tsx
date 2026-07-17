import Link from "next/link";
import { AchievementBadge } from "@/components/AchievementBadge";
import { PearsonCredentialForm } from "@/components/PearsonCredentialForm";
import { PageHero } from "@/components/SiteChrome";
import {
  ACHIEVEMENTS,
  AI_EXPERT_ACHIEVEMENT_ID,
  bonusAchievements,
  requiredAchievements,
} from "@/config/achievements";
import {
  achievementProgressSummary,
  getExpertCertificateForUser,
  getPearsonCredential,
  syncUserAchievements,
} from "@/lib/achievements";
import { getSession } from "@/lib/auth";
import { PHASES } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const session = await getSession();
  if (!session) return null;

  const { all } = await syncUserAchievements(session.id);
  const earnedIds = new Set(all.map((row) => row.achievementId));
  const earnedAt = new Map(all.map((row) => [row.achievementId, row.earnedAt]));
  const sourceById = new Map(all.map((row) => [row.achievementId, row.sourceType]));
  const summary = achievementProgressSummary(earnedIds);
  const certificate = await getExpertCertificateForUser(session.id);
  const pearson = await getPearsonCredential(session.id);
  const latest = all.at(-1);
  const latestDef = latest ? ACHIEVEMENTS.find((item) => item.id === latest.achievementId) : null;

  return (
    <div>
      <PageHero
        eyebrow="Skills overview · permanent achievements"
        title="My Achievements"
        description="Earn badges by demonstrating knowledge on diagnostics, completing Fast Track lessons, and clearing phase gates. Optional depth and industry credentials are bonus-only."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Required</p>
          <p className="mt-2 text-2xl text-heading">
            {summary.requiredEarned}/{summary.requiredTotal}
          </p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Bonus</p>
          <p className="mt-2 text-2xl text-heading">
            {summary.bonusEarned}/{summary.bonusTotal}
          </p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Latest</p>
          <p className="mt-2 text-lg text-heading">{latestDef?.title ?? "None yet"}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">AI Expert</p>
          {summary.isExpert ? (
            <>
              <p className="mt-2 text-lg font-semibold text-heading">Unlocked</p>
              <Link href="/achievements/certificate" className="nav-link mt-2 inline-block text-sm">
                View certificate
              </Link>
            </>
          ) : (
            <p className="mt-2 text-sm text-text-muted">
              {requiredAchievements().length - summary.requiredEarned} required milestones remain
            </p>
          )}
        </div>
      </div>

      <section className="card mb-8 border-primary/20 bg-gradient-to-br from-white via-primary/5 to-accent/5">
        <div className="flex flex-wrap items-start gap-5">
          <AchievementBadge
            achievement={ACHIEVEMENTS.find((item) => item.id === AI_EXPERT_ACHIEVEMENT_ID)!}
            earned={summary.isExpert}
            size={120}
          />
          <div className="min-w-0 flex-1">
            <p className="page-hero-step">Final badge</p>
            <h2 className="text-2xl text-heading">AI Expert</h2>
            <p className="mt-2 text-sm text-text-muted">
              Requires every required Fast Track badge, Week 78, the Phase 7 checklist, and ≥85% on the
              expert quiz. Optional depth and Pearson credentials are not required.
            </p>
            {certificate ? (
              <Link href="/achievements/certificate" className="btn-primary mt-4 inline-block">
                Open AI Expert certificate
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <div className="space-y-10">
        {PHASES.map((phase) => {
          const badges = ACHIEVEMENTS.filter(
            (item) => item.phase === phase.id && item.requiredForExpert,
          );
          if (!badges.length) return null;
          return (
            <section key={phase.id}>
              <div className="mb-4">
                <p className="page-hero-step">
                  Phase {phase.id} · Weeks {phase.weekStart}–{phase.weekEnd}
                </p>
                <h2 className="text-xl text-heading">{phase.name}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {badges.map((badge) => {
                  const earned = earnedIds.has(badge.id);
                  return (
                    <article
                      key={badge.id}
                      className={`card ${earned ? "" : "bg-surface/40"}`}
                    >
                      <div className="flex items-start gap-4">
                        <AchievementBadge achievement={badge} earned={earned} size={72} />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-heading">{badge.title}</h3>
                          <p className="mt-1 text-sm text-text-muted">{badge.description}</p>
                          <p className="mt-2 text-xs text-text-muted">
                            {earned
                              ? `Earned ${new Date(earnedAt.get(badge.id)!).toLocaleDateString()} · ${
                                  sourceById.get(badge.id)?.replaceAll("_", " ") ?? "achievement"
                                }`
                              : badge.howToEarn}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section>
          <div className="mb-4">
            <p className="page-hero-step">Bonus · optional</p>
            <h2 className="text-xl text-heading">Depth & industry credentials</h2>
          </div>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bonusAchievements().map((badge) => {
              const earned = earnedIds.has(badge.id);
              return (
                <article key={badge.id} className={`card ${earned ? "" : "bg-surface/40"}`}>
                  <div className="flex items-start gap-4">
                    <AchievementBadge achievement={badge} earned={earned} size={72} />
                    <div>
                      <h3 className="font-semibold text-heading">{badge.title}</h3>
                      <p className="mt-1 text-sm text-text-muted">{badge.description}</p>
                      <p className="mt-2 text-xs text-text-muted">
                        {earned
                          ? `Earned ${new Date(earnedAt.get(badge.id)!).toLocaleDateString()}`
                          : badge.howToEarn}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <PearsonCredentialForm alreadyEarned={Boolean(pearson)} />
        </section>
      </div>
    </div>
  );
}
