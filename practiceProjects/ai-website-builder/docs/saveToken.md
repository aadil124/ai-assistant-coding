# Token Usage Ledger

This document tracks the token consumption for all prompts and turns throughout this project. 

> [!NOTE]
> For every subsequent prompt and response, the AI Agent must calculate/estimate the token count and append a new row to the table below.

## Token Log

| Turn # | Timestamp | Prompt Summary | Input Tokens (Est.) | Output Tokens (Est.) | Total Tokens | Cumulative Tokens |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| 1 | 2026-06-04T19:02:08Z | Initial BRD, PRD, KPI Docs Creation | 1,800 | 4,200 | 6,000 | 6,000 |
| 2 | 2026-06-04T19:05:09Z | Feature Detail Docs Extraction (12 Features) | 7,200 | 12,800 | 20,000 | 26,000 |
| 3 | 2026-06-04T19:06:44Z | Agile Personas Creation (7 Files) | 26,500 | 4,500 | 31,000 | 57,000 |
| 4 | 2026-06-04T19:11:44Z | QA Automation Test Cases (25 Files) | 58,000 | 28,000 | 86,000 | 143,000 |
| 5 | 2026-06-07T22:44:04Z | Created Token Tracker (`saveToken.md`) | 3,500 | 800 | 4,300 | 147,300 |

---

## How to Update
When a new prompt is received:
1. Read the existing `saveToken.md` using the `view_file` tool.
2. Estimate the input token size (from context/previous history) and output token size of the response.
3. Append a new row using `replace_file_content` or `multi_replace_file_content`.
4. Recalculate the **Cumulative Tokens** based on the previous row's value.
