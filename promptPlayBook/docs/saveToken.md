# Token Conservation Protocol (SaveToken)

When this protocol is referenced, you must strictly adhere to the following rules to minimize token consumption for both input context and output responses.

## 1. Output Conciseness (Save Output Tokens)
* **Zero Boilerplate**: Skip all introductory and concluding conversational text (e.g., "Sure, I can help with that", "Let me know if you need anything else"). Start immediately with the result.
* **Code Diffs Only**: When editing existing code, never output the entire file. Only output the specific lines, functions, or blocks that changed. Use comments like `// ... (existing code)` to represent unmodified parts.
* **No Unsolicited Explanations**: Do not explain what the code does, why you made a choice, or how to install dependencies unless explicitly requested.
* **Compact Formatting**: Avoid verbose lists or nested tables if a simple line of text or a short code snippet suffices.

## 2. Code Density Guidelines
* **Omit Imports**: Do not include imports, package declarations, or setup boilerplate unless they were modified.
* **Inline Placeholders**: Replace unmodified segments of code with concise comment placehholders indicating they remain unchanged.

## 3. Standard Response Format
When providing a code fix or refactor, structure your output exactly as follows:

```[language]
// [File: relative/path/to/file]
// ... (unmodified code above) ...

[YOUR MODIFIED OR NEW CODE HERE]

// ... (unmodified code below) ...
```

---
*To use this protocol, append this to your prompt:*  
`"Apply the Token Conservation Protocol in docs/saveToken.md to your response."`
