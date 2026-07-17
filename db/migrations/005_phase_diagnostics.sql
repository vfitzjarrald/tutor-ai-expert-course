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
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_diagnostic_single_baseline
  ON diagnostic_attempts(user_id, phase)
  WHERE attempt_kind = 'baseline';

CREATE INDEX IF NOT EXISTS idx_diagnostic_attempts_user_phase
  ON diagnostic_attempts(user_id, phase, created_at DESC);

CREATE TABLE IF NOT EXISTS diagnostic_waivers (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pathway_week_id TEXT NOT NULL,
  source_attempt_id UUID NOT NULL REFERENCES diagnostic_attempts(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, pathway_week_id)
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_waivers_user
  ON diagnostic_waivers(user_id);
