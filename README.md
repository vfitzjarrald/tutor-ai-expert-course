# Tutor-Based AI Expert Course

Self-paced curriculum to become an expert in **tutor-based AI**: knowledge maps, graph databases, RAG, GraphRAG, MCP, and production agentic tutors.

**78 weeks · 60 min/business day · ~390 hours · Mon–Fri**

## Course microsite (web app)

Personal multi-user portal with calendar, schedule, day completion, and persistent notes. Design system matches [victorfitzjarrald.com](https://victorfitzjarrald.com) (Open Sans, `#2EA3F2`).

**Target production URL:** `https://aicourse.victorfitzjarrald.com`

### Local run

```bash
cp .env.example .env.local
# Set SESSION_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD
# Leave DATABASE_URL as placeholder to use local file store (data/local-store.json)

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with the admin credentials from `.env.local`.

| Route | Purpose |
|-------|---------|
| `/login` | Sign in |
| `/` | Today’s lesson |
| `/calendar` | Month calendar |
| `/schedule` | Full phase → week outline |
| `/weeks/[n]/days/[d]` | Lesson + complete + notes |
| `/admin/users` | Issue learner usernames/passwords (admin only) |

### Cross-device persistence (Neon)

For production / multi-device sync:

1. Create a Neon database (Vercel Marketplace → Neon, or [neon.tech](https://neon.tech)).
2. Set `DATABASE_URL` in `.env.local` / Vercel env to the Neon connection string.
3. Run migrations + admin seed:

```bash
npm run db:migrate
```

4. Deploy to Vercel; add env vars `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`.
5. Attach custom domain `aicourse.victorfitzjarrald.com` in the Vercel project.

Local file store is **single-machine only**. Neon is required for cross-device sync.

### Design system

Tokens and chrome patterns are ported from the Victor Fitzjarrald site / scouting subdomain: `app/globals.css`, `tailwind.config.ts`, `components/SiteChrome.tsx`.

## Curriculum quick start (markdown)

1. Set your start date: [`curriculum/start-date.txt`](curriculum/start-date.txt) (Monday of Week 1).
2. Open this week's lesson: [`curriculum/weeks/week-01.md`](curriculum/weeks/week-01.md).
3. Follow each day block — **all source links are embedded**.
4. Build in [`capstone/`](capstone/).
5. Track phase gates in [`checkpoints/`](checkpoints/).

### Cursor learning plan (optional)

Open [`canvases/tutor-ai-expert-learning-plan.canvas.tsx`](canvases/tutor-ai-expert-learning-plan.canvas.tsx).

### Portable Word workbook

```bash
pip install -r requirements.txt
python3 scripts/export_course_doc.py
```

## Repository layout

```
tutor-ai-expert-course/
├── app/                 # Next.js course microsite
├── components/          # UI (VF design system)
├── lib/                 # auth, db, curriculum, schedule
├── db/migrations/       # Neon SQL schema
├── curriculum/          # Lesson plans (week-01 … week-78)
├── capstone/            # End-to-end adaptive tutor
├── labs/                # Phase-specific sandboxes
├── notes/               # Your summaries & flashcards
├── checkpoints/         # Phase gate evidence
├── exports/             # Portable Word workbook (.docx)
├── resources/           # Bundled link index
├── scripts/             # Lesson generator, docx, db migrate
├── automations/         # Cursor weekday-noon study automation
├── canvases/            # Cursor learning-plan canvas
└── docs/                # Publishing & setup guides
```

## Capstone modules

| Module | Path | Phase |
|--------|------|-------|
| LLM client & prompts | `capstone/src/tutor/llm/`, `prompts/` | 1 |
| RAG pipeline | `capstone/src/tutor/rag/` | 1–4 |
| Knowledge graph | `capstone/src/tutor/graph/`, `data/graph/` | 2–3 |
| Student modeling | `capstone/src/tutor/student_model/` | 3 |
| GraphRAG | `capstone/src/tutor/graphrag/` | 4 |
| MCP tools | `capstone/src/tutor/mcp/` | 5 |
| Eval & observability | `capstone/eval/`, `capstone/src/tutor/observability/` | 1–6 |

## Milestones

| Week | Level |
|------|-------|
| 8 | Competent — RAG tutor + eval |
| 24 | Proficient — graph + student model |
| 40 | Advanced — GraphRAG + MCP agent |
| 52 | Expert-ready — production capstone |
| 78 | Recognized expert |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start course microsite |
| `npm run db:migrate` | Apply Neon schema + seed admin |
| `python3 scripts/generate_lessons.py` | Regenerate all 78 week markdown files |
| `python3 scripts/export_course_doc.py` | Build portable Word workbook in `exports/` |
| `./scripts/package_for_github.sh` | Pre-flight checks before pushing to GitHub |

## Publish to GitHub

See [`docs/GITHUB.md`](docs/GITHUB.md).

## License

[MIT](LICENSE)
