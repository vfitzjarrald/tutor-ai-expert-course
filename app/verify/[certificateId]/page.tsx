import { notFound } from "next/navigation";
import { EXPERT_PD_HOURS } from "@/config/achievements";
import { getExpertCertificateById } from "@/lib/achievements";

export const dynamic = "force-dynamic";

export default async function VerifyCertificatePage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;
  const certificate = await getExpertCertificateById(certificateId);
  if (!certificate) notFound();

  const issued = new Date(certificate.issuedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container-app py-16">
      <div className="mx-auto max-w-xl card">
        <p className="page-hero-step">Public verification</p>
        <h1 className="text-2xl text-heading">AI Expert certificate</h1>
        <p className="mt-2 text-sm text-text-muted">
          This record confirms a valid VPF AI Expert credential. No account or course activity is shown.
        </p>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Recipient</dt>
            <dd className="mt-1 font-semibold text-heading">{certificate.recipientName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Credential</dt>
            <dd className="mt-1 font-semibold text-heading">VPF AI Expert</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Issued</dt>
            <dd className="mt-1 text-heading">{issued}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Professional development</dt>
            <dd className="mt-1 text-heading">
              Equivalent to {certificate.pdHours || EXPERT_PD_HOURS} hours of cumulative PD
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Status</dt>
            <dd className="mt-1 font-semibold text-primary">Valid</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-text-muted">Certificate ID</dt>
            <dd className="mt-1 break-all font-mono text-xs text-heading">{certificate.id}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
