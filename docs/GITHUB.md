# Publishing to GitHub

## Pre-flight

From the repository root:

```bash
./scripts/package_for_github.sh
```

This verifies lesson files, checks for secrets, and confirms the repo is ready to push.

## Create the remote repository

```bash
# Authenticated with gh CLI
gh repo create tutor-ai-expert-course --public --source=. --remote=origin --description "78-week self-paced curriculum: tutor-based AI, RAG, GraphRAG, knowledge maps, MCP, and production capstone"
```

Or create an empty repo on github.com, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/tutor-ai-expert-course.git
```

## First push

```bash
git add -A
git status   # confirm no .env or secrets
git commit -m "Initial release: 78-week tutor AI expert curriculum"
git branch -M main
git push -u origin main
```

## Optional: GitHub Release with Word export

Attach the portable workbook to a release:

```bash
gh release create v1.0.0 \
  exports/tutor-ai-expert-course.docx \
  --title "Tutor AI Expert Course v1.0" \
  --notes "Full 78-week curriculum with embedded sources and note spaces."
```

## After cloning (for you or contributors)

1. Set course start: edit `curriculum/start-date.txt` (Monday of Week 1).
2. Open in Cursor: **File → Open Folder** → cloned repo.
3. Optional canvas: open `canvases/tutor-ai-expert-learning-plan.canvas.tsx`.
4. Capstone setup: see `capstone/README.md`.
5. Weekday automation: see `automations/daily-learning-plan.md`.

## What gets published

| Included | Excluded |
|----------|----------|
| 78 lesson markdown files | `.env`, API keys |
| Curriculum docs, checks, resources | `capstone/logs/`, `*.jsonl` |
| Capstone scaffold & eval harness | Local `.venv/` |
| Cursor canvas & automation templates | Legacy `exports/*.doc` |
| Portable `.docx` workbook | |
