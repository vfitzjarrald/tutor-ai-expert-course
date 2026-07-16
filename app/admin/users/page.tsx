import { redirect } from "next/navigation";
import {
  CreateUserForm,
  ResetLearnerProgressButton,
  ResetPasswordButton,
} from "@/components/CourseInteractive";
import { PageHero } from "@/components/SiteChrome";
import { toggleUserActiveAction } from "@/app/actions";
import { getSession } from "@/lib/auth";
import { listUsers } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/");
  const users = await listUsers();

  return (
    <div>
      <PageHero
        eyebrow="Admin"
        title="Learners & passwords"
        description="Create usernames and passwords to share the course. Each learner has isolated progress and notes."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <CreateUserForm />

        <div className="card overflow-x-auto">
          <h2 className="mb-4 text-lg text-heading">Accounts</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-text-muted">
                <th className="py-2 pr-3">User</th>
                <th className="py-2 pr-3">Role</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border align-top">
                  <td className="py-3 pr-3">
                    <p className="font-semibold text-heading">{u.username}</p>
                    {u.display_name ? <p className="text-xs text-text-muted">{u.display_name}</p> : null}
                  </td>
                  <td className="py-3 pr-3 capitalize">{u.role}</td>
                  <td className="py-3 pr-3">{u.is_active ? "Active" : "Disabled"}</td>
                  <td className="space-y-2 py-3">
                    {u.role === "learner" ? (
                      <>
                        <form action={toggleUserActiveAction}>
                          <input type="hidden" name="userId" value={u.id} />
                          <input type="hidden" name="next" value={u.is_active ? "false" : "true"} />
                          <button type="submit" className="btn-secondary text-xs">
                            {u.is_active ? "Deactivate" : "Activate"}
                          </button>
                        </form>
                        <ResetPasswordButton userId={u.id} />
                        <ResetLearnerProgressButton userId={u.id} username={u.username} />
                      </>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs text-text-muted">Use Account → Start over for yourself.</p>
                        <ResetLearnerProgressButton userId={u.id} username={u.username} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
