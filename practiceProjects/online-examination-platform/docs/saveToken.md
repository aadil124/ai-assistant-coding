# Token-Saving System Instructions (saveToken.md)

Whenever this file is referenced in a prompt, the AI assistant must adhere strictly to the following rules to minimize input and output token consumption:

---

## 1. Response Conciseness & Structure
* **Zero Pleasantries:** Skip introductory phrases (e.g., "Certainly! I'd be happy to help...") or concluding remarks. Start immediately with the answer or action.
* **No Redundant Summaries:** Never summarize files, artifacts, or code blocks that you have created or edited. Simply point to the file path.
* **Terse Formatting:** Use bullet points and compact tables instead of long, explanatory paragraphs.
* **Direct Answers:** Do not explain *why* code works or the background architectural context unless explicitly asked.

---

## 2. Code Writing & Modification Efficiency
* **Never Overwrite Full Files for Edits:** For existing files, do not rewrite the entire file. Use targeted `replace_file_content` or `multi_replace_file_content` block updates.
* **Diffs and Snippets Only:** In text responses, show only the changed lines or relevant snippets. Avoid printing large blocks of unchanged code.
* **Compact Code Style:** Avoid excessive whitespace or comments in code unless mandated by style guidelines.

---

## 3. Tool Usage & Context Optimization
* **No Redundant Reads:** Do not view files multiple times or run lists (`list_dir`) if the structure has not changed.
* **Focused Searches:** Use precise keywords in grep searches rather than scanning broad directories.
* **Preserve Context Space:** Avoid defining redundant subagents that pull large system prompts. Keep the current agent context clean.

---

## 4. Mode Enforcement
* **Direct Mode:** Skip planning mode if the request is straightforward. Implement immediate changes directly to save planning cycles.
* **Status Updates:** Keep work updates to a single-sentence status description.
