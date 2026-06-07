# Token Usage Ledger

This document tracks the token consumption (input, output, and cumulative totals) for each turn in the development of the CRM platform. It is updated at the end of each session or turn when referenced in the prompt.

## 1. Token Logs

| Turn # | Timestamp (ISO 8601) | Model | Prompt Description | Input Tokens | Output Tokens | Turn Total | Cumulative Total |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | 2026-06-04T16:17:43+05:30 | Gemini 3.5 Flash | Initial Setup: Generated BRD.md, PRD.md, KPI.md | *N/A* | *N/A* | *N/A* | *N/A* |
| **02** | 2026-06-04T16:24:33+05:30 | Gemini 3.5 Flash | Feature Specifications: Generated 11 feature files in `/features` | *N/A* | *N/A* | *N/A* | *N/A* |
| **03** | 2026-06-04T16:28:23+05:30 | Gemini 3.5 Flash | Role Personas: Generated 7 developer personas in `/personas` | *N/A* | *N/A* | *N/A* | *N/A* |
| **04** | 2026-06-04T17:35:44+05:30 | Gemini 3.5 Flash | Test Case Generation: Created backend & frontend tests and log.md | *N/A* | *N/A* | *N/A* | *N/A* |
| **05** | 2026-06-07T22:45:00+05:30 | Gemini 3.5 Flash | Token Tracker Creation: Created `saveToken.md` configuration | *N/A* | *N/A* | *N/A* | *N/A* |

> [!NOTE]
> Since exact token counts are calculated and reported by the client interface, please replace the `*N/A*` values with the token metadata displayed in your chat interface for complete tracking accuracy.

---

## 2. Instructions for Token Tracking

To update this log in future prompts:
1. Append `@[docs/saveToken.md]` to your prompt.
2. Provide the token count displayed in your API or UI dashboard for the preceding turn (or specify the values you wish to log).
3. The AI agent will read the file, append a new row for the current turn, update the **Cumulative Total**, and save the file.
