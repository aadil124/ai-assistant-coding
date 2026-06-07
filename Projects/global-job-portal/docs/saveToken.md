# Token Usage Auditor (saveToken)

This document serves as the official log for tracking LLM token consumption across all prompts in this project. When this file is referenced in a prompt, the assistant must update the table below with estimated or actual token usage for the current turn.

---

## Token Consumption Log

| Date & Time (UTC) | Prompt ID / Description | Input Tokens | Output Tokens | Total Tokens | Cumulative Tokens |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-06-03 16:24 | BRD, PRD, and KPI file creation | ~1,200 | ~1,800 | ~3,000 | ~3,000 |
| 2026-06-03 16:32 | Feature Spec files generation | ~3,800 | ~3,200 | ~7,000 | ~10,000 |
| 2026-06-07 17:16 | Create saveToken.md | ~1,000 | ~600 | ~1,600 | ~11,600 |

---

## Instructions for the Assistant
1. **Auditing Action:** Whenever the user references `saveToken.md` in their request, estimate the input/output tokens used for that prompt-response cycle.
2. **Table Update:** Append a new row to the *Token Consumption Log* table in this file using the `replace_file_content` or `multi_replace_file_content` tools.
3. **Cumulative Calculation:** Calculate the new sum by adding the current total to the previous cumulative total.
4. **Verbatim Preservation:** Keep all other parts of this document (including this instructions block) intact.
