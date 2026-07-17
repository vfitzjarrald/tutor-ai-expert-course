import Image from "next/image";
import { LoginForm } from "@/components/CourseInteractive";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  try {
    const session = await getSession();
    if (session) redirect("/");
  } catch {
    // continue to login
  }

  return (
    <div className="container-app py-16">
      <div className="mb-8 flex justify-center sm:justify-start">
        <Image
          src="/vpf-logo.png"
          alt="VPF AI Expert"
          width={360}
          height={200}
          className="h-auto w-full max-w-sm object-contain"
          priority
        />
      </div>
      <div className="auth-gate-wrap">
        <div>
          <PageHero
            eyebrow="VPF AI Expert"
            title="Sign in to your Fast Track"
            description="Sign in with the username and password issued for your account. Progress and notes sync across your devices."
          />
          <LoginForm />
        </div>
        <aside className="card bg-gradient-to-br from-white via-surface to-[#E8F4FC]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl">
            <Image src="/vpf-icon.png" alt="" width={48} height={48} className="h-12 w-12 object-cover" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Recognized Expert path</p>
          <p className="mt-3 text-heading">
            Compressed Fast Track to AI expert — knowledge maps, GraphRAG, MCP, and a production tutor capstone.
          </p>
          <p className="mt-4 text-sm text-text-muted">Need access? Ask the course admin for a learner password.</p>
        </aside>
      </div>
    </div>
  );
}
