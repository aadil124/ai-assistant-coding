# Token Optimization and Response Efficiency Rules (saveToken.md)

Whenever this file is referenced or mentioned in a prompt, the AI assistant must adhere strictly to the following rules to minimize token usage, conserve context window space, and ensure responses are as concise and direct as possible.

---

## 1. Response Rules
1. **No Pleasantries or Filler:** Do not write introductions, transitions, or conclusions (e.g., "Certainly!", "Here is the code you requested...", "I hope this helps!"). Start directly with the answer, code, or command.
2. **No Re-summarization:** If an artifact (like an implementation plan, task list, or walkthrough) is created or updated, do NOT summarize its contents in the chat message. Simply point to the file path.
3. **No Paraphrasing of Prompts:** Do not restate or paraphrase the user's instructions or requirements before responding.
4. **Short Explanations:** Keep explanations to 1-2 sentences maximum. Only provide explanations if specifically requested or if explaining a non-obvious design decision.

---

## 2. Code and Diff Rules
1. **Incremental Diffs Only:** Never output entire code files if only a few lines are changing. Use standard diff blocks (`+` and `-`) showing only the modified lines and 1-2 lines of surrounding context.
2. **No Placeholders in Diffs:** Do not output large blocks of unchanged code with comments like `// rest of the code remains the same`. Only output the exact lines affected.
3. **Use File Links:** Refer to files using concise markdown links (e.g., `[file.py](file:///path/to/file.py)`). Do not print out the full path repeatedly in text.

---

## 3. Formatting and Structure Rules
1. **Concise Tables:** Use compact markdown tables instead of long bulleted lists when presenting comparative data or statuses.
2. **Dense Lists:** Keep bullet points short (less than 10 words per bullet). Avoid nesting lists deeper than two levels.
3. **Command Output:** Limit command outputs to only the direct results or error messages. Do not print out standard success notices or verbose warnings.

---

## 4. Multi-Agent & Subagent Rules
1. **Direct Delegation:** When delegating tasks to subagents, write concise, objective-only prompts. Avoid long background descriptions.
2. **Short Progress Reports:** When checking on background tasks or subagents, use a quick tabular status check rather than long paragraphs.
