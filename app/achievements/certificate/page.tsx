import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AchievementBadge } from "@/components/AchievementBadge";
import { PrintCertificateButton } from "@/components/PrintCertificateButton";
import { ACHIEVEMENTS, AI_EXPERT_ACHIEVEMENT_ID, EXPERT_PD_HOURS } from "@/config/achievements";
import {
  getExpertCertificateForUser,
  syncUserAchievements,
} from "@/lib/achievements";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ExpertCertificatePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  await syncUserAchievements(session.id);
  const certificate = await getExpertCertificateForUser(session.id);
  if (!certificate) notFound();

  const expertBadge = ACHIEVEMENTS.find((item) => item.id === AI_EXPERT_ACHIEVEMENT_ID)!;
  const issued = new Date(certificate.issuedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const verifyPath = `/verify/${certificate.id}`;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <p className="page-hero-step">AI Expert credential</p>
          <h1 className="text-2xl text-heading">Certificate</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrintCertificateButton />
          <Link href="/achievements" className="btn-secondary">
            Back to achievements
          </Link>
        </div>
      </div>

      <div className="certificate-sheet mx-auto max-w-5xl overflow-hidden rounded-card border-4 border-[#7C5CFF] bg-white shadow-card">
        <div className="border-[10px] border-[#2EA3F2]/30 bg-gradient-to-br from-white via-[#F8FBFF] to-[#F4F0FF] px-8 py-10 md:px-14 md:py-12">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                AI Expert
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-heading md:text-4xl">
                Certificate of Achievement
              </h2>
              <p className="mt-2 text-sm text-text-muted">Recognized Expert Fast Track</p>
            </div>
            <AchievementBadge achievement={expertBadge} earned size={110} />
          </div>

          <p className="mt-10 text-sm uppercase tracking-[0.2em] text-text-muted">This certifies that</p>
          <p className="mt-3 text-3xl font-semibold text-heading md:text-4xl">{certificate.recipientName}</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-text">
            has demonstrated the competencies of an AI Expert through the VPF Recognized Expert Fast
            Track, including diagnostics, phase gates, production evidence, teaching, and portfolio
            requirements.
          </p>
          <p className="mt-6 text-lg font-semibold text-heading">
            Equivalent to {EXPERT_PD_HOURS} hours of cumulative professional development.
          </p>

          <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-text-muted">Awarded</p>
              <p className="mt-1 font-semibold text-heading">{issued}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-text-muted">Issuer</p>
              <p className="mt-1 font-semibold text-heading">VPF AI Expert</p>
              <p className="text-sm text-text-muted">Victor Fitzjarrald</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-text-muted">Certificate ID</p>
              <p className="mt-1 break-all font-mono text-xs text-heading">{certificate.id}</p>
              <p className="mt-1 text-xs text-text-muted">Verify at {verifyPath}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
