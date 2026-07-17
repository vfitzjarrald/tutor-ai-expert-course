CREATE TABLE IF NOT EXISTS lesson_task_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pathway_node_id TEXT NOT NULL,
  task_key TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, pathway_node_id, task_key)
);

CREATE INDEX IF NOT EXISTS idx_lesson_task_progress_user_node
  ON lesson_task_progress(user_id, pathway_node_id);
