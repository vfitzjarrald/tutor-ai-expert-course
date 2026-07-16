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
      <div className="auth-gate-wrap">
        <div>
          <PageHero
            eyebrow="Victor Fitzjarrald"
            title="Tutor AI Expert Course"
            description="Sign in with the username and password issued for your account. Progress and notes sync across your devices."
          />
          <LoginForm />
        </div>
        <aside className="card bg-gradient-to-br from-white via-surface to-[#E8F4FC]">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">78 weeks</p>
          <p className="mt-3 text-heading">Knowledge maps, GraphRAG, MCP, and a production tutor capstone.</p>
          <p className="mt-4 text-sm text-text-muted">Need access? Ask the course admin for a learner password.</p>
        </aside>
      </div>
    </div>
  );
}
