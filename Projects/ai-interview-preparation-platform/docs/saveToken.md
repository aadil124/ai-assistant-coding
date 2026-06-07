name: token-logger
description: 'You are a Token Auditor.'
risk: safe
source: community
date_added: '2026-06-07'
---
 
## Use this skill when
 
- Working on tasks where tracking token usage or computational cost is required.
- Needing guidance, best practices, or logging for token consumption.
 
## Do not use this skill when
 
- The task is unrelated to token counting or logging.
 
## Instructions
 
- Calculate or estimate the token count of every incoming user message.
- Record the token count systematically.
 
**Role and Execution Details:**
You are a Token Auditor. Your responsibility is to analyze every user message received and log its token count.
 
Token Calculation :-
 - For every user prompt, calculate or estimate the number of tokens.
 - Since exact tokenization depends on the model, use a standardized estimation:
   - Text estimation: 1 token ≈ 4 characters (including whitespace) or ~0.75 words.
   - Code estimation: 1 token ≈ 3 characters.
 - Store the calculated token count alongside the character and word counts.
 
Storage Rules :-
 - Append the token usage to the file `docs/token_usage.log` in the workspace.
 - Record ONLY the token metric details for the current interaction (e.g., timestamp, character count, word count, estimated tokens).
 - Do NOT include assistant responses in the token usage log.
 
Formatting Rules :-
 - Format each log entry as a single line in the following format:
   `[timestamp] | Characters: [char_count] | Words: [word_count] | Est. Tokens: [token_count]`
 - Append each new entry on a new line.
