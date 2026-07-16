import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { hash } from "bcryptjs";

config({ path: ".env.local" });
config();

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required");
  }
  if (url.includes("placeholder")) {
    throw new Error(
      "DATABASE_URL is still a placeholder. Create a Neon DB and put the connection string in .env.local",
    );
  }

  const sql = neon(url);

  console.log("Applying schema…");
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'learner')),
      display_name TEXT,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by UUID REFERENCES users(id)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS day_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      week INTEGER NOT NULL CHECK (week BETWEEN 1 AND 78),
      day INTEGER NOT NULL CHECK (day BETWEEN 1 AND 5),
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      completed_at TIMESTAMPTZ,
      UNIQUE (user_id, week, day)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS day_notes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      week INTEGER NOT NULL CHECK (week BETWEEN 1 AND 78),
      day INTEGER NOT NULL CHECK (day BETWEEN 1 AND 5),
      body TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, week, day)
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_day_progress_user ON day_progress(user_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_day_notes_user ON day_notes(user_id)`;

  const admins = await sql`SELECT id FROM users WHERE role = 'admin' LIMIT 1`;
  if (admins.length === 0) {
    const username = process.env.ADMIN_USERNAME?.trim();
    const password = process.env.ADMIN_PASSWORD;
    if (!username || !password) {
      throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD required to seed first admin");
    }
    const passwordHash = await hash(password, 12);
    await sql`
      INSERT INTO users (username, password_hash, role, display_name)
      VALUES (${username}, ${passwordHash}, 'admin', 'Admin')
    `;
    console.log(`Seeded admin user: ${username}`);
  } else {
    console.log("Admin already exists — skip seed");
  }

  console.log("Migrations complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
