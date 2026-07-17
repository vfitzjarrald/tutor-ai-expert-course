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

  await sql`
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      scope TEXT NOT NULL,
      score_pct DOUBLE PRECISION NOT NULL,
      answers JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_scope
    ON quiz_attempts(user_id, scope, created_at DESC)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS gate_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      phase INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 7),
      item_key TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT FALSE,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, phase, item_key)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_gate_items_user ON gate_items(user_id)`;

  await sql`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS course_start_date DATE
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS lesson_task_progress (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      pathway_node_id TEXT NOT NULL,
      task_key TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT FALSE,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, pathway_node_id, task_key)
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_lesson_task_progress_user_node
    ON lesson_task_progress(user_id, pathway_node_id)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS diagnostic_attempts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      phase INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 7),
      attempt_kind TEXT NOT NULL CHECK (attempt_kind IN ('baseline', 'reassessment')),
      bank_version INTEGER NOT NULL,
      score_pct DOUBLE PRECISION NOT NULL,
      answers JSONB NOT NULL DEFAULT '{}'::jsonb,
      skill_scores JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_diagnostic_single_baseline
    ON diagnostic_attempts(user_id, phase)
    WHERE attempt_kind = 'baseline'
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_diagnostic_attempts_user_phase
    ON diagnostic_attempts(user_id, phase, created_at DESC)
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS diagnostic_waivers (
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      pathway_week_id TEXT NOT NULL,
      source_attempt_id UUID NOT NULL REFERENCES diagnostic_attempts(id) ON DELETE CASCADE,
      awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, pathway_week_id)
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_diagnostic_waivers_user
    ON diagnostic_waivers(user_id)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS user_achievements (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      achievement_id TEXT NOT NULL,
      source_type TEXT NOT NULL,
      source_ref TEXT,
      evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
      earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      celebrated_at TIMESTAMPTZ,
      UNIQUE (user_id, achievement_id)
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_user_achievements_user
    ON user_achievements(user_id, earned_at DESC)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_user_achievements_pending
    ON user_achievements(user_id)
    WHERE celebrated_at IS NULL
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS external_credentials (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      provider TEXT NOT NULL,
      credential_id TEXT NOT NULL,
      issued_on DATE NOT NULL,
      attested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      notes TEXT,
      UNIQUE (user_id, provider)
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_external_credentials_user
    ON external_credentials(user_id)
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS expert_certificates (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      recipient_name TEXT NOT NULL,
      issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      pd_hours INTEGER NOT NULL DEFAULT 135,
      UNIQUE (user_id)
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_expert_certificates_user
    ON expert_certificates(user_id)
  `;

  await sql`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS learning_track TEXT
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS workspace_files (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      path TEXT NOT NULL,
      body TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, path)
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_workspace_files_user ON workspace_files(user_id)`;
  await sql`
    CREATE TABLE IF NOT EXISTS playground_runs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_playground_runs_user_created
    ON playground_runs(user_id, created_at DESC)
  `;

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
