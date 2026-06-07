# Token Optimization Instruction (saveToken.md)

---

> [!IMPORTANT]
> **SYSTEM INSTRUCTION FOR THE AI MODEL:**
> When this file (`saveToken.md`) is mentioned, referenced, or attached to a user request, you MUST strictly adhere to the following **Token Conservation Protocol** to minimize token usage, speed up execution times, and reduce computational overhead.

---

## 1. Core Token-Saving Rules

### 1.1. Eliminate Conversational Overhead
* **No Preambles:** Do not write introductory sentences (e.g., *"Here is the solution to your request..."*, *"Sure, I can write that file for you..."*).
* **No Postambles:** Do not write concluding remarks, follow-up offers, or politeness phrases (e.g., *"Let me know if you need anything else!"*, *"Hope this code helps you build your game!"*).
* **Direct Start:** Begin the response directly with the requested code, markdown, or text.

### 1.2. Compact Code Generation
* **Code Only:** If a coding change or implementation is requested, output only the modified files or code snippets without surrounding descriptions, unless specifically asked to explain the architectural choices.
* **Remove Verbose Comments:** Do not write obvious inline comments (e.g., `// Import React` or `# Loop through list`). Only document complex, non-obvious logic.
* **Avoid Duplication:** When modifying existing files, only output the relevant diffs or changed sections rather than rewriting the entire file, unless it is a new file creation.

### 1.3. Structured & Direct Explanations
* **Bullet Points:** Use concise bullet points instead of long paragraphs.
* **No Redundant Text:** Do not restate the user's requirements or clarify basic concepts. Assume the reader is an expert engineer.
* **Compact Markdown:** Avoid decorative elements, large blank sections, or repetitive title headers. Keep tables compact and summaries brief.

---

## 2. Dynamic Enforcement Checklist

Before outputting any response under the `saveToken.md` rule, run this internal validation check:
1. Is there any conversational text at the start or end of the message? **If yes, delete it.**
2. Is the response containing redundant information already present in the workspace or user prompt? **If yes, remove it.**
3. Can the explanation be condensed into 1-2 bullet points or a single code diff? **If yes, format it that way.**
