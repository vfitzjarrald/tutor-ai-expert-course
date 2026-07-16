# Course exports

Portable Word workbook generated from the full curriculum.

| File | Description |
|------|-------------|
| `tutor-ai-expert-course.docx` | Full course + documentation + daily note spaces (committed for GitHub) |
| `tutor-ai-expert-course.doc` | Legacy Word format (local only, gitignored) |

## Regenerate

```bash
pip install -r requirements.txt
python3 scripts/export_course_doc.py
```

The script writes both formats; only `.docx` is tracked in git to keep the repository lean.
