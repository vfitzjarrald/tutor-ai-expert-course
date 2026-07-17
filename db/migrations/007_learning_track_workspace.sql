-- Dual Fast Track: learning track preference + in-app workspace files

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS learning_track TEXT
  CHECK (learning_track IS NULL OR learning_track IN ('dev', 'workspace'));

CREATE TABLE IF NOT EXISTS workspace_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, path)
);

CREATE INDEX IF NOT EXISTS idx_workspace_files_user ON workspace_files(user_id);

CREATE TABLE IF NOT EXISTS playground_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_playground_runs_user_created
  ON playground_runs(user_id, created_at DESC);
