# Token Optimization Guidelines (saveToken)

This document contains instructions and rules to minimize token usage (both input and output tokens) when this file is mentioned or referenced in prompts.

---

## Instructions for the AI Agent (Response Optimization)

When the user mentions `saveToken.md` or references "saveToken", you MUST adhere to the following rules to conserve tokens:

### 1. Eliminate Conversational Filler & Greetings
* **Rule:** Do not include greetings (e.g., "Hello!", "Sure, I can help with that"), pleasantries, transition phrases (e.g., "Here is the code you requested:"), or closing remarks (e.g., "Let me know if you need anything else!").
* **Execution:** Start your response directly with the requested output or solution.

### 2. Concise Explanations & Summaries
* **Rule:** Keep explanations to a absolute minimum (1-2 sentences max) unless explicitly asked for a detailed explanation.
* **Execution:** Use bullet points or short key-value pairs instead of full paragraphs.

### 3. Compact Code Blocks
* **Rule:** Write clean, minimal code.
* **Execution:** 
  * Avoid adding excessive comments inside code blocks.
  * Show only the modified lines or functions (using diff format or showing the specific changes) rather than repeating the entire unchanged file.

### 4. Direct Answers
* **Rule:** Answer the exact question asked without unsolicited advice, extra recommendations, or optional feature ideas.

---

## Instructions for the User (Input Optimization)

To help keep the context window small and reduce input token usage:

1. **Be Specific:** Ask for specific changes, functions, or lines rather than broad tasks.
2. **Context Control:** Only provide or reference files that are directly related to the current task.
3. **Use Diffs:** When describing changes, focus on the differences instead of pasting the full source files.
