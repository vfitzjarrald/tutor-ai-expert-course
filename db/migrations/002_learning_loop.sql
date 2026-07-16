-- Quiz attempts and phase gate checklist items
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scope TEXT NOT NULL,
  score_pct DOUBLE PRECISION NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_scope
  ON quiz_attempts(user_id, scope, created_at DESC);

CREATE TABLE IF NOT EXISTS gate_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phase INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 7),
  item_key TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, phase, item_key)
);

CREATE INDEX IF NOT EXISTS idx_gate_items_user ON gate_items(user_id);
