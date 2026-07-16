import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { ensureAdminSeeded, findUserByUsername } = await import("../lib/users");
  const { verifyPassword } = await import("../lib/password");
  const { loadWeek } = await import("../lib/curriculum");
  const { getCoursePosition, readStartDate } = await import("../lib/schedule");

  await ensureAdminSeeded();
  const u = await findUserByUsername("admin");
  console.log("user", u?.username, u?.role);
  console.log("pw_ok", u ? await verifyPassword(process.env.ADMIN_PASSWORD!, u.password_hash) : false);
  console.log("pos", getCoursePosition(new Date(), readStartDate()));
  console.log(
    "week1 days",
    loadWeek(1)?.days.map((d) => d.title),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
