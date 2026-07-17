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
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user
  ON user_achievements(user_id, earned_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_achievements_pending
  ON user_achievements(user_id)
  WHERE celebrated_at IS NULL;

CREATE TABLE IF NOT EXISTS external_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  credential_id TEXT NOT NULL,
  issued_on DATE NOT NULL,
  attested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT,
  UNIQUE (user_id, provider)
);

CREATE INDEX IF NOT EXISTS idx_external_credentials_user
  ON external_credentials(user_id);

CREATE TABLE IF NOT EXISTS expert_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_name TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pd_hours INTEGER NOT NULL DEFAULT 135,
  UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_expert_certificates_user
  ON expert_certificates(user_id);
