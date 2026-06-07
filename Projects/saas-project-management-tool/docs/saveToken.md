# Token Tracking Log & Instructions

This file serves as both the instruction set and the audit log for tracking token usage across prompts and responses in this workspace.

---

## 1. Instructions for the AI Assistant

Whenever the user mentions or references `docs/saveToken.md` in a prompt, the assistant must:
1. **Calculate / Estimate Tokens** for the current turn:
   * **Prompt Tokens:** If the exact count is not provided by the system metadata, estimate it using: $\text{Characters} / 4$ or $\text{Words} \times 1.3$.
   * **Response Tokens:** If the exact count is not provided, estimate it using the same formula for the assistant's own response.
2. **Append the Record** to the **Token Usage Log Table** below:
   * Insert a new row in the table representing the prompt and response.
   * Calculate the `Total Tokens` (Prompt + Response).
   * Calculate the `Cumulative Total` tokens used across all logged turns.
3. **Save the File:** Automatically rewrite or update this file to reflect the new log entry.

---

## 2. Token Usage Log Table

| Date / Time | Prompt / Turn Description | Est. Prompt Tokens | Est. Response Tokens | Total Tokens | Cumulative Total |
|---|---|---|---|---|---|
| 2026-06-03 | Initial setup (BRD, PRD, KPI creation) | 1,200 | 1,850 | 3,050 | 3,050 |
| 2026-06-03 | 10 feature spec creation | 1,500 | 4,200 | 5,700 | 8,750 |
| 2026-06-07 | Create saveToken.md configuration | 600 | 500 | 1,100 | 9,850 |

*(Note: The above entries represent baseline estimates for the initial setup steps of the repository.)*
