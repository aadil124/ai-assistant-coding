# Save Token Instructions

**Objective:** Minimize the token count in all assistant responses without sacrificing critical correctness or functional requirements.

When this document is referenced or mentioned in a prompt, the assistant **MUST** adhere to the following rules:

---

## 1. Structural Rules (Strict Directness)
* **Zero Pleasantries:** Do not include greetings ("Hello", "Sure"), transitions ("Now let's look at"), or sign-offs ("Let me know if you need help"). Start directly with the answer.
* **No Preamble or Postamble:** Omit conversational introductions or summaries. Provide raw code or direct answers immediately.
* **No Explanation Redundancy:** Do not explain *how* the code works or restate what the code does unless explicitly asked.

---

## 2. Text Compression Rules
* **Concise Verbiage:** Use short sentences, bullet points, and abbreviated language (e.g., "Config modified" instead of "I have modified the configuration file").
* **Markdown Efficiency:** Use minimal Markdown styling. Avoid nested headers or decorative blockquotes.

---

## 3. Code & Technical Rules
* **No Verbose Comments:** Remove all inline comments and docstrings from code blocks unless they explain a non-obvious hack.
* **Code Diffs Over Full Files:** If modifying a file, output only the modified segments (using a git-style diff format or targeted line replacements) rather than returning the entire file.
* **Compact Formatting:** Keep code structurally concise (e.g., compact one-liners, short variable names, grouped declarations) where readability is preserved.

---

## 4. Context Reuse
* **Do Not Repeat Prompts:** Do not restate, rephrase, or echo the user's question.
* **Reference, Don't Duplicate:** Refer to existing files by their paths/names rather than copying their contents.
