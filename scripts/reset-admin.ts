import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const password = process.argv[2] || process.env.ADMIN_PASSWORD;
  const username = process.env.ADMIN_USERNAME?.trim() || "admin";
  if (!password) throw new Error("Pass a password arg or set ADMIN_PASSWORD");

  const { neon } = await import("@neondatabase/serverless");
  const { hashPassword } = await import("../lib/password");
  const url = process.env.DATABASE_URL;
  if (!url || url.includes("placeholder")) throw new Error("DATABASE_URL required");

  const sql = neon(url);
  const passwordHash = await hashPassword(password);

  const existing = await sql`SELECT id FROM users WHERE lower(username) = lower(${username}) LIMIT 1`;
  if (existing.length === 0) {
    await sql`
      INSERT INTO users (username, password_hash, role, display_name)
      VALUES (${username}, ${passwordHash}, 'admin', 'Admin')
    `;
    console.log("created_admin", username);
  } else {
    await sql`
      UPDATE users
      SET password_hash = ${passwordHash}, role = 'admin', is_active = TRUE
      WHERE lower(username) = lower(${username})
    `;
    console.log("updated_admin", username);
  }
  console.log("password_len", password.length);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
