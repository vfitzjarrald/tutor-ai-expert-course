# Offline / downloadable references

Use these when you want local copies. All lessons also embed live links.

| Resource | Download / access |
|----------|-------------------|
| VanLehn ITS survey (PDF) | https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf |
| Bloom 2-sigma (PDF) | https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf |
| BKT paper (PDF) | https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf |
| Deep Learning book (free HTML) | https://www.deeplearningbook.org/ |
| MCP specification | https://modelcontextprotocol.io/specification/2025-03-26 |
| OWASP LLM Top 10 | https://owasp.org/www-project-top-10-for-large-language-model-applications/ |

## Suggested local setup (once)

```bash
mkdir -p resources/bundled/papers
curl -L -o resources/bundled/papers/vanlehn-its-2011.pdf \
  "https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf"
curl -L -o resources/bundled/papers/bloom-two-sigma.pdf \
  "https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf"
curl -L -o resources/bundled/papers/bkt-corbett-anderson.pdf \
  "https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf"
```

Lessons reference these URLs directly; local copies are optional for offline study.
