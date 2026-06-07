# Token Usage Tracker (saveToken.md)

This document serves as instructions and a structured ledger for tracking token consumption across our pair-programming sessions.

---

## 1. Instructions for the AI Assistant

When the user mentions or references `saveToken.md` in a prompt, the AI assistant **MUST** update this file using the following rules:

1. **Calculate Token Stats**: Estimate or retrieve the input (prompt) tokens, output (completion) tokens, and total tokens for the current turn.
2. **Append to Ledger**: Add a new row to the **Token Log Ledger** table below.
3. **Record Details Verbatim**:
   - **Timestamp**: Recording time in UTC.
   - **Turn / Prompt Description**: A short summary of the user's request.
   - **Input Tokens**: Token count of the incoming prompt (including system instructions/context).
   - **Output Tokens**: Token count of the generated response.
   - **Total Tokens**: Sum of input and output tokens for that turn.
   - **Cumulative Tokens**: Running total of all tokens used in the conversation.
4. **Preserve Previous Entries**: Never overwrite or delete existing rows in the ledger. Always append new rows at the bottom of the table.

---

## 2. Token Log Ledger

| Date & Time (UTC) | Turn | Prompt / Task Description | Input Tokens (Est.) | Output Tokens (Est.) | Total Tokens | Cumulative Tokens |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-06-03T16:05:29Z | 1 | Initialize BRD, PRD, and KPI files | 15,000 | 8,000 | 23,000 | 23,000 |
| 2026-06-03T16:10:29Z | 2 | List 10 core features based on specs | 23,200 | 1,000 | 24,200 | 47,200 |
| 2026-06-03T16:12:50Z | 3 | Create 10 feature specification markdown files | 24,500 | 15,000 | 39,500 | 86,700 |
| 2026-06-07T17:15:54Z | 4 | Create saveToken.md tracker in docs | 18,000 | 2,500 | 20,500 | 107,200 |
