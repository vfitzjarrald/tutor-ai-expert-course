-- Per-user course start date (NULL = use global curriculum/start-date.txt)
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS course_start_date DATE;
