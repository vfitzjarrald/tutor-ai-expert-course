import Link from "next/link";
import { DailyChecklist } from "@/components/LearningInteractive";
import {
  BookIcon,
  GateIcon,
  LayersIcon,
  NewsIcon,
  ProgressIcon,
  QuizIcon,
} from "@/components/Icons";
import { PageHero } from "@/components/SiteChrome";
import { getAiNews } from "@/lib/ai-news";
import { getSession } from "@/lib/auth";
import { EXPERT_THRESHOLD, PHASE_GATE_THRESHOLD, isGateWeek } from "@/lib/checks";
import { loadWeek } from "@/lib/curriculum";
import { gatesByPhase } from "@/lib/gates";
import { getGateStates, getLatestQuizScore } from "@/lib/learning";
import { extractDayChecklist, getLessonTaskStates } from "@/lib/day-checklist";
import { getLearnerQueue } from "@/lib/progress";
import { getPhaseForWeek, padWeek } from "@/lib/schedule";
import { ensureAdminSeeded } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    await ensureAdminSeeded();
  } catch {
    // ignore until DB configured
  }

  const session = await getSession();
  if (!session) return null;

  const queue = await getLearnerQueue(session.id, 2);
  const todayPos = queue.today;
  const tomorrowPos = queue.tomorrow;
  const diagnosticDue = queue.diagnosticDue;

  const todayWeek = todayPos ? loadWeek(todayPos.week) : null;
  const todayDay = todayWeek?.days.find((d) => d.day === todayPos?.day);
  const tomorrowWeek = tomorrowPos ? loadWeek(tomorrowPos.week) : null;
  const tomorrowDay = tomorrowWeek?.days.find((d) => d.day === tomorrowPos?.day);
  const checklist =
    todayPos && todayDay
      ? extractDayChecklist(todayDay.rawMarkdown, {
          objective: todayDay.objective,
          deliverable: todayDay.deliverable,
        })
      : [];
  const checklistStates =
    todayPos && checklist.length
      ? await getLessonTaskStates(session.id, todayPos.id)
      : new Map<string, boolean>();
  const news = await getAiNews(6);

  const focusWeek = todayPos?.week ?? queue.lessonAfterDiagnostic?.week ?? 78;
  const phase = getPhaseForWeek(focusWeek);
  const quizScope = phase.id === 7 ? "all" : (`phase-${phase.id}` as const);
  const quiz = await getLatestQuizScore(session.id, quizScope);
  const threshold = phase.id === 7 ? EXPERT_THRESHOLD : PHASE_GATE_THRESHOLD;
  const gateItems = gatesByPhase().get(phase.id) ?? [];
  const gateStates = await getGateStates(session.id);
  const gateDone = gateItems.filter((i) => gateStates.get(`${i.phase}:${i.key}`)).length;

  return (
    <div>
      <PageHero
        eyebrow={
          queue.courseComplete
            ? "Fast Track · Course complete"
            : `Fast Track · ~${queue.config.targetWeeks} weeks · Phase ${phase.id} · Week ${padWeek(focusWeek)}`
        }
        title="My AI Day"
        description={
          queue.courseComplete
            ? "You’ve finished every lesson. Review gates, quizzes, or revisit any week."
            : "Your focused learning module, next step, and AI field briefing."
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="min-w-0 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card">
              <div className="flex items-start gap-3">
                <span className="icon-badge">
                  <ProgressIcon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Progress</p>
                  <p className="mt-1 text-2xl text-heading">{queue.stats.percent}%</p>
                  <p className="text-sm">
                    {queue.stats.completedLessons} completed · {queue.stats.waivedLessons} waived
                  </p>
                  <p className="text-xs text-text-muted">{queue.stats.remaining} remaining</p>
                  <Link href="/diagnostics" className="nav-link mt-2 inline-block text-sm">
                    Diagnostics & growth
                  </Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-3">
                <span className="icon-badge">
                  <QuizIcon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Quiz readiness</p>
                  <p className="mt-1 text-2xl text-heading">{quiz ? `${quiz.scorePct}%` : "—"}</p>
                  <p className="text-sm">
                    {quiz && quiz.scorePct >= threshold ? "Threshold met" : `Need ≥${threshold}%`}
                  </p>
                  <Link href={`/checks?scope=${quizScope}`} className="nav-link mt-2 inline-block text-sm">
                    Knowledge checks
                  </Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-3">
                <span className="icon-badge-accent">
                  <GateIcon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Phase gate</p>
                  <p className="mt-1 text-2xl text-heading">
                    {gateItems.length ? `${gateDone}/${gateItems.length}` : "—"}
                  </p>
                  <p className="text-sm">
                    {isGateWeek(focusWeek) ? "Gate week" : `Week ${gateItems[0]?.week ?? "—"}`}
                  </p>
                  <Link href="/gates" className="nav-link mt-2 inline-block text-sm">
                    Open gates
                  </Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-3">
                <span className="icon-badge-accent">
                  <LayersIcon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Phase hub</p>
                  <p className="mt-1 text-lg text-heading">{phase.name}</p>
                  <div className="mt-2 flex flex-col gap-1">
                    <Link href={`/phases/${phase.id}`} className="nav-link text-sm">
                      Labs & capstone
                    </Link>
                    <Link href={`/resources?phase=${phase.id}`} className="nav-link inline-flex items-center gap-1 text-sm">
                      <BookIcon size={14} />
                      Resources
                    </Link>
                    <Link href="/schedule" className="nav-link text-sm">
                      {queue.optional.length} optional depth lessons
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {diagnosticDue ? (
            <div className="card border-primary/30 bg-gradient-to-br from-white via-primary/5 to-accent/5">
              <p className="page-hero-step">Required before Phase {diagnosticDue.phase}</p>
              <h2 className="text-xl text-heading">Establish your Phase {diagnosticDue.phase} baseline</h2>
              <p className="mt-2 text-sm text-text-muted">
                Demonstrate what you already know before this segment begins. Eligible skills scoring
                at least 80% are waived; phase gates and expert evidence always remain required.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/diagnostics/${diagnosticDue.phase}`} className="btn-primary">
                  Start diagnostic
                </Link>
                <Link href="/diagnostics" className="btn-secondary">
                  View diagnostic history
                </Link>
              </div>
            </div>
          ) : queue.courseComplete ? (
            <div className="card">
              <h2 className="text-xl text-heading">All lessons complete</h2>
              <p className="mt-2 text-sm">
                Use Schedule to revisit any day, or tighten phase gates and expert checks.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/gates" className="btn-primary inline-block">
                  Review gates
                </Link>
                <Link href="/checks?scope=all" className="btn-secondary inline-block">
                  Expert knowledge check
                </Link>
                <Link href="/schedule" className="btn-secondary inline-block">
                  Browse schedule
                </Link>
              </div>
            </div>
          ) : todayWeek && todayDay && todayPos ? (
            <div className="space-y-6">
              <div className="card">
                <p className="page-hero-step">
                  Today’s Fast Track module · Week {padWeek(todayPos.week)} · Day {todayDay.day}
                </p>
                <h2 className="text-xl text-heading">{todayDay.title}</h2>
                <p className="mt-2 text-sm">{todayWeek.title}</p>
                <p className="mt-2 text-xs text-text-muted">
                  About {queue.config.lessonMinutes} minutes · Prerequisites satisfied
                </p>
                {todayWeek.outcomes ? (
                  <p className="mt-4 text-sm text-text-muted">
                    {todayWeek.outcomes.replace(/^By Friday\s*/i, "")}
                  </p>
                ) : null}
                {todayDay.objective ? (
                  <p className="mt-4">
                    <span className="font-semibold text-heading">Objective: </span>
                    {todayDay.objective}
                  </p>
                ) : null}
                {todayDay.deliverable ? (
                  <p className="mt-2">
                    <span className="font-semibold text-heading">Deliverable: </span>
                    {todayDay.deliverable}
                  </p>
                ) : null}
                <div className="mt-6">
                  <Link
                    href={`/weeks/${todayPos.week}/days/${todayDay.day}`}
                    className="btn-primary inline-block"
                  >
                    Open today’s lesson
                  </Link>
                </div>
                {checklist.length ? (
                  <div className="mt-6 border-t border-border pt-6">
                    <DailyChecklist
                      pathwayNodeId={todayPos.id}
                      items={checklist}
                      states={Object.fromEntries(checklistStates)}
                    />
                  </div>
                ) : null}
              </div>

              {tomorrowPos && tomorrowWeek && tomorrowDay ? (
                <div className="card border-dashed">
                  <p className="page-hero-step">
                    Do tomorrow · Week {padWeek(tomorrowPos.week)} · Day {tomorrowDay.day}
                  </p>
                  <h2 className="text-lg text-heading">{tomorrowDay.title}</h2>
                  <p className="mt-1 text-sm text-text-muted">{tomorrowWeek.title}</p>
                  <div className="mt-4">
                    <Link
                      href={`/weeks/${tomorrowPos.week}/days/${tomorrowDay.day}`}
                      className="nav-link text-sm"
                    >
                      Preview next lesson →
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="card">
              <p>Could not load the next lesson. Check curriculum files.</p>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-[88px]">
          <div className="card overflow-hidden p-0">
            <div className="border-b border-border bg-gradient-to-br from-white via-surface to-[#E8F4FC] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="icon-badge">
                  <NewsIcon size={18} />
                </span>
                <div>
                  <p className="page-hero-step mb-0">Field briefing</p>
                  <h2 className="text-lg text-heading">AI News</h2>
                </div>
              </div>
              <p className="mt-2 text-xs text-text-muted">Trusted feeds · refreshed daily</p>
            </div>
            {news.length ? (
              <ul className="divide-y divide-border">
                {news.map((item) => (
                  <li key={item.url} className="px-5 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                      {item.source}
                      {item.publishedAt
                        ? ` · ${new Date(item.publishedAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}`
                        : ""}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug text-heading">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        {item.title}
                      </a>
                    </h3>
                    {item.summary ? (
                      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-text-muted">
                        {item.summary}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-5 py-6 text-sm text-text-muted">
                News is temporarily unavailable. Your learning plan is unaffected.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
