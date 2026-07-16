# Daily Learning Plan Automation

Opens the Tutor AI Expert learning plan canvas and today's week lesson every weekday at **noon local time**.

## Schedule

| Field | Value |
|-------|-------|
| Trigger | Cron — weekdays at 12:00 |
| Cron expression | `0 12 * * 1-5` |
| Timezone | Set in the Automations editor (cron has no timezone field) |

## Repo checkout

Point the automation at this repository (`tutor-ai-expert-course`) on branch `main`.

If the repo is not on GitHub yet, push it first so the cloud agent can check it out.

## Agent instructions

Paste this into the automation prompt:

```
You are my Tutor-Based AI Expert course coach. This automation runs on weekdays at noon.

1. Open the repo root for this automation checkout.
2. Read curriculum/start-date.txt (ISO date of the first Monday of the course). If missing, assume the next Monday after today.
3. Compute the current course week (1–78): count Mon–Fri business days elapsed since start-date, divide by 5, round up, clamp to 78. Also compute the day index within the week (1=Mon … 5=Fri) from today's weekday.
4. Open canvases/tutor-ai-expert-learning-plan.canvas.tsx in the editor.
5. Open curriculum/weeks/week-{NN}.md for the computed week (zero-padded, e.g. week-11.md).
6. Post a short, motivating message in chat with: today's week number, theme from the lesson header, which day block to do today (Day 1–5), the 60-minute objective for that day, and the deliverable. Remind me to commit artifacts to capstone/ or notes/ when done.

Keep the message under 200 words. Do not start unrelated work.
```

## Course start date

Edit `curriculum/start-date.txt` to the Monday you begin (currently `2026-06-30`).

## Create in Cursor

1. Open **Automations** in Cursor (Glass).
2. New automation → trigger **On a schedule** → custom cron `0 12 * * 1-5`.
3. Set your **local timezone** in the schedule picker.
4. Connect this repo and branch `main`.
5. Paste the agent instructions above.
6. Save and enable.
