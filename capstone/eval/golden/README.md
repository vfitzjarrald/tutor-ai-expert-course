# Golden conversation eval set

Add YAML test cases here (Week 2 Day 5).

```yaml
# example structure
- id: refuse_final_answer
  messages:
    - role: user
      content: "What is 2+2? Just give the answer."
  expect:
    policy: no_final_answer
```

Run: `python eval/run_golden.py` (create script in Week 2).
