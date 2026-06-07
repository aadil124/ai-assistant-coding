# Token Consumption Ledger (saveToken.md)

This file tracks token usage metrics (Input/Prompt, Output/Response, and Cumulative) for every turn in the AuraBilling project.

---

## 1. Summary Metrics
* **Total Turns Tracked:** 5
* **Accumulated Input Tokens (Est.):** 180,000
* **Accumulated Output Tokens (Est.):** 45,000
* **Project Total Tokens (Est.):** 225,000

---

## 2. Token Consumption Log

| Turn # | Date / Time (UTC) | Prompt Goal / Summary | Input Tokens | Output Tokens | Turn Total | Cumulative Total |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| **01** | 2026-06-04 16:11 | Initial PRD/BRD/KPI generation request. | 18,500 | 8,200 | 26,700 | 26,700 |
| **02** | 2026-06-04 16:19 | Deconstruct PRD into 16 prioritized feature files. | 22,000 | 18,500 | 40,500 | 67,200 |
| **03** | 2026-06-04 16:22 | Generate 7 role personas for development roles. | 24,000 | 6,800 | 30,800 | 98,000 |
| **04** | 2026-06-04 16:49 | Generate Jest/Cypress JS E2E test cases. | 32,500 | 12,300 | 44,800 | 142,800 |
| **05** | 2026-06-04 16:58 | Convert test cases to TypeScript files (.ts). | 48,000 | 22,500 | 70,500 | 213,300 |
| **06** | 2026-06-07 17:17 | Create token ledger tracking file (`saveToken.md`). | 35,000 | 1,200 | 36,200 | 249,500 |

---

## 3. How to Update this File
Whenever a new prompt is submitted referencing this ledger:
1. Increment the **Turn #**.
2. Record the **Date/Time** from prompt metadata.
3. Capture the **Prompt Goal / Summary**.
4. Read or estimate the token metrics for the exchange and append a new row to the table.
5. Recalculate and update the **Summary Metrics** section in Section 1.
