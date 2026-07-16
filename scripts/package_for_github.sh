#!/usr/bin/env bash
# Validate and prepare tutor-ai-expert-course for GitHub upload.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Tutor AI Expert Course — GitHub packaging"
echo "    Root: $ROOT"
echo

# Initialize git if needed
if [[ ! -d .git ]] || [[ ! -f .git/HEAD ]]; then
  echo "==> Initializing git repository..."
  rm -rf .git 2>/dev/null || true
  git init -b main
fi

# Regenerate lessons (ensures markdown matches scripts)
echo "==> Regenerating lesson files..."
python3 scripts/generate_lessons.py

# Verify week count
WEEK_COUNT="$(ls -1 curriculum/weeks/week-*.md 2>/dev/null | wc -l | tr -d ' ')"
if [[ "$WEEK_COUNT" != "78" ]]; then
  echo "ERROR: Expected 78 week files, found $WEEK_COUNT" >&2
  exit 1
fi
echo "    ✓ $WEEK_COUNT week lesson files"

# Secret scan (basic)
echo "==> Scanning for likely secrets..."
if grep -rE '(sk-[a-zA-Z0-9]{20,}|OPENAI_API_KEY=[^[:space:]]+|ANTHROPIC_API_KEY=[^[:space:]]+)' \
  --include='*.env' --include='*.json' --include='*.yaml' --include='*.yml' . 2>/dev/null; then
  echo "ERROR: Possible secrets found — remove before pushing." >&2
  exit 1
fi
if [[ -f capstone/.env ]]; then
  echo "ERROR: capstone/.env exists — delete or gitignore before pushing." >&2
  exit 1
fi
if [[ -f .env ]]; then
  echo "ERROR: .env exists — delete or gitignore before pushing." >&2
  exit 1
fi
echo "    ✓ No obvious secrets"

# Hardcoded home paths (warn only)
HARDCODED="$(grep -r '/Users/' --include='*.md' --include='*.py' --include='*.tsx' --include='*.json' . 2>/dev/null | grep -v node_modules || true)"
if [[ -n "$HARDCODED" ]]; then
  echo "    ⚠ Remaining /Users/ paths (review before push):"
  echo "$HARDCODED" | head -5
else
  echo "    ✓ No hardcoded /Users/ paths"
fi

# Export docx if python-docx available
if python3 -c "import docx" 2>/dev/null; then
  echo "==> Regenerating Word export (.docx)..."
  python3 scripts/export_course_doc.py
else
  echo "==> Skipping Word export (pip install -r requirements.txt to enable)"
fi

echo
echo "==> Ready for GitHub"
echo
echo "Next steps:"
echo "  git add -A"
echo "  git status"
echo "  git commit -m \"Initial release: 78-week tutor AI expert curriculum\""
echo "  gh repo create tutor-ai-expert-course --public --source=. --remote=origin"
echo "  git push -u origin main"
echo
echo "See docs/GITHUB.md for full instructions."
