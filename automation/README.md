# Daily noon learning plan automation

Opens the **learning plan canvas** and **today's lesson file** every weekday at **12:00 local time**.

## One-time setup in Cursor

1. Open **Automations** in Cursor (Glass sidebar or Automations UI).
2. Click **New automation**.
3. Import or paste settings from [`daily-learning-plan-prefill.json`](daily-learning-plan-prefill.json), **or** configure manually:

| Field | Value |
|-------|-------|
| Name | Daily Tutor AI Learning Plan |
| Trigger | Schedule — **Weekdays at 12:00 PM** (cron: `0 12 * * 1-5`) |
| Git repo | This repository (`tutor-ai-expert-course`) |
| Branch | `main` |

4. Paste the **Instructions** from the `prompts` array in the JSON file (or use [`../automations/daily-learning-plan.md`](../automations/daily-learning-plan.md)).
5. **Save** and **Enable** the automation.

## Instructions (copy into automation prompt)

See [`../automations/daily-learning-plan.md`](../automations/daily-learning-plan.md) for the full portable prompt (no hardcoded paths).

## Timezone note

Cursor cron automations use **your local machine timezone**. `0 12 * * 1-5` = noon Mon–Fri in local time.

## Course start date

Edit [`../curriculum/start-date.txt`](../curriculum/start-date.txt) to the Monday you begin Week 1.

## Quick open (manual)

- Canvas: [canvases/tutor-ai-expert-learning-plan.canvas.tsx](../canvases/tutor-ai-expert-learning-plan.canvas.tsx)
- Week 1 lesson: [curriculum/weeks/week-01.md](../curriculum/weeks/week-01.md)
