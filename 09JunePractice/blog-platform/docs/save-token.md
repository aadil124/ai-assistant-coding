# Token-Saving Guide

## Principles

* **Clarify First:** Always ask clarifying questions before writing code to resolve any ambiguities. Do not write speculative code or assume requirements.
* **Focus on the Delta:** Only generate or describe code that has changed. Do not output unchanged lines, full file rewrites, or boilerplate code.
* **Context Preservation:** Do not read or request to read files that are already within the current conversation context or recently loaded.
* **No Redundant Repetitions:** Do not restate, paraphrase, or repeat the user's task or instructions back to the user. Start directly with the response or tool execution.
* **Minimalist Responses:** Keep explanations brief and technical. Exclude unnecessary comments, debugging logs, verbose code explanations, and boilerplate templates unless explicitly requested.

## Prompt Patterns

* **Draft Before Code:** Use quick summaries or outline proposals to align on logic before generating files.
* **Diff Representation:** For code changes, present only the code block modified with standard diff notation (`+`/`-`) or clear start/end references rather than pasting the whole file.
* **Direct Answers:** Respond to questions with immediate answers; do not add conversational pleasantries.

## What to Avoid

* **Full-File Pasting:** Avoid pasting entire source files in the chat output when only a few lines are being added or modified.
* **Redundant API Logs:** Avoid verbose console logs or API payload prints unless troubleshooting a specific runtime issue.
* **Verbose Explanations:** Avoid detailing how standard programming syntax or language features work. Assume a highly experienced developer audience.

## File Reference Strategy

* **Use File References:** Refer to files using standard workspace references (e.g., `[filename.ext](file:///path/to/file)`) rather than copy-pasting code blocks from them.
* **Link Target Sections:** Use line anchors (e.g., `#L10-L20`) in file links to direct attention to specific blocks of code instead of explaining their location.

## Quick Checklist

* [ ] Have I asked clarifying questions for all ambiguous requirements before writing code?
* [ ] Am I outputting only the modified lines of code (the delta) instead of the entire file?
* [ ] Have I avoided repeating the user's request?
* [ ] Am I referencing files with standard links rather than copying their contents into the chat?
* [ ] Have I excluded unnecessary code comments, console logs, and boilerplate code?
