"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import {
  submitPearsonCredentialAction,
  type ActionResult,
} from "@/app/actions";
import { PEARSON_CERT_URL } from "@/config/achievements";

export function PearsonCredentialForm({ alreadyEarned }: { alreadyEarned: boolean }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    submitPearsonCredentialAction,
    null as ActionResult | null,
  );

  if (alreadyEarned) {
    return (
      <div className="card text-sm">
        <p className="font-semibold text-heading">Pearson Generative AI Foundations</p>
        <p className="mt-2 text-text-muted">
          Industry credential recorded. This bonus badge does not waive Fast Track diagnostics or gates.
        </p>
      </div>
    );
  }

  return (
    <form
      action={async (formData) => {
        await formAction(formData);
        router.refresh();
      }}
      className="card space-y-4"
    >
      <div>
        <p className="page-hero-step mb-1">Optional industry credential</p>
        <h3 className="text-lg text-heading">Pearson Generative AI Foundations</h3>
        <p className="mt-2 text-sm text-text-muted">
          Submit your Certiport credential to earn a bonus badge. This does{" "}
          <strong className="text-heading">not</strong> waive VPF diagnostics, lessons, or phase gates.{" "}
          <a
            href={PEARSON_CERT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Learn about the exam
          </a>
          .
        </p>
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-heading" htmlFor="credentialId">
          Credential ID
        </label>
        <input id="credentialId" name="credentialId" className="input-field" required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-heading" htmlFor="issuedOn">
          Issue date
        </label>
        <input id="issuedOn" name="issuedOn" type="date" className="input-field" required />
      </div>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="attest" value="true" className="mt-1" required />
        <span>
          I attest that I personally earned the Pearson Generative AI Foundations certification and the
          details above are accurate.
        </span>
      </label>
      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "Saving…" : "Submit credential"}
      </button>
      {state?.ok ? <p className="text-sm text-heading">{state.message}</p> : null}
      {state && !state.ok ? <p className="text-sm text-red-600">{state.error}</p> : null}
    </form>
  );
}
