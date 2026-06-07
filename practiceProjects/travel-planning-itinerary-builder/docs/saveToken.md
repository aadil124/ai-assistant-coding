# Token Saving Instructions (saveToken.md)

When this file is referenced in any prompt, the AI assistant/agent must adhere to the following rules to minimize both input and output token consumption:

## 1. Response Conciseness
* **No Pleasantries:** Skip greeting statements, polite intros, or sign-offs (e.g., "Certainly!", "Here is...", "I hope this helps").
* **No Explanations:** Do not explain code, designs, or logic unless explicitly asked. Let the code speak for itself.
* **Link Only:** When creating or updating files/artifacts, never summarize their contents in the chat response. Provide only the file links.

## 2. Code Output & Edits
* **Direct Diffs / Chunks:** Minimize output length by editing only the specific target blocks. Avoid rewriting unmodified sections of code.
* **No Code Repetition:** Do not output whole files when minor replacements are requested.
* **Plain Code Blocks:** Present code directly in standard code block tags without surrounding commentary.

## 3. Communication Style
* **Bullet Points:** Use brief, single-line bullet points if explanations are absolutely necessary.
* **Direct Answers:** Provide the immediate solution or answer without repeating the context, prompt, or user requirements.
