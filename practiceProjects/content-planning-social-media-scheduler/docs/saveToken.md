# Token Optimization & Prompting Guidelines

When interacting with AI Coding Agents (or LLMs), append or reference these instructions to minimize context window bloat and reduce token consumption (input/output).

---

## 1. System Prompt Rules for AI Agents

To minimize output tokens, enforce these instructions on every response:
* **No Code Repetition:** Do not reprint entire files when making small updates. Output only the modified lines or standard Unified Diff blocks.
* **Concise Explanations:** Omit chatty introductions, apologies, and detailed summaries of what the code does unless explicitly requested.
* **No Placeholders:** Write the exact lines needed, avoiding generic `// TODO` or `// rest of the code here` blocks that require follow-up prompts (which doubles token cost).

---

## 2. Recommended Prompt Prefix (Copy-Paste)

Add this snippet to the start or end of your prompts to immediately reduce token usage:

```markdown
[TOKEN SAVER MODE: ON]
- Do not repeat unchanged code blocks. Show only the diff or the specific lines that changed.
- Keep explanations under 2-3 sentences.
- Avoid pleasantries, apologies, or conversational filler.
- If writing a new file, output only the source code without explanations.
```

---

## 3. Best Practices for Saving Context Tokens

* **Scoped File References:** Only reference the specific files relevant to your current edit instead of including the entire codebase.
* **Clear Task Boundaries:** Break down large feature requests into small, single-step tasks. Small prompts require smaller response contexts, avoiding memory overflow and high token usage.
* **Clean Git Status:** Clear out unneeded local `node_modules` or build assets from the agent's context using a `.gitignore` to prevent indexing irrelevant binary data.
