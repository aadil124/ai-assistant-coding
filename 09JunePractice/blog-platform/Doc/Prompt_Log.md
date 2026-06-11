# Prompt Log

## Blog-Platform — A modern blogging platform web application

---

## PROMPT 1 — Initialize Prompt Logger and Establish Auditor Role

**Output File:** `Doc/Prompt_Log.md`

---

### Prompt Content (Verbatim)

````text
I am starting the Blog-Platform project. 
Please initialize the prompt logger for this project by reading and following the global instructions located at `C:\Users\md.adil\.gemini\config\skills\prompt_logger.md`
 
Establish the Role:
- Act as the AI Prompt Auditor & SDLC Log Custodian.
- Create the `Doc/Prompt_Log.md` file in the workspace root.
- Initialize it for the project: "{{Project Name}}" — "[Insert Project Description]".
- Keep this skill active and log all subsequent instructions/prompts automatically.
 
 
write this prompt for window
````

---

## PROMPT 2 — Generate Product Requirements Document (PRD)

**Output File:** `docs/prd.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior product manager with 10+ years of experience building
production-grade fullstack web and mobile applications.

Format: Output a single markdown file at docs/prd.md. Use H2 headings for
each section. No extra sections beyond the 8 listed below.

Context: I am starting a new project. I will describe the idea below.
Generate a complete PRD covering ONLY these 8 sections:
1. Problem Statement
2. Solution Overview
3. User Flow
4. API Design
5. Edge Cases
6. KPIs (Success Metrics / Acceptance Criteria)
7. Limitations
8. Tech Stack — add exactly what I give you, do not invent or add anything

Task: Based on the project idea and tech stack below, generate docs/prd.md
with exactly the 8 sections above. Do not add any extra sections.

Project Idea: Build a modern blog platform where users can read, search, and explore articles across multiple categories, while registered authors can create, edit, publish, and manage their own blog posts through an admin dashboard. The platform should provide authentication, comments, tags, and responsive design without any payment gateway.

Tech Stack: 
Frontend: React 19 + Bootstrap 5.3
Backend: Node.js 22 LTS + Express.js 5
Database: MongoDB Atlas (Cloud)
Testing: Jest + Supertest + React Testing Library
Frontend Hosting: Vercel
Backend Hosting: Render
Database Hosting: MongoDB Atlas
````

---

## PROMPT 3 — Generate KPI (Acceptance Criteria) Document

**Output File:** `docs/kpi.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior QA architect and product analyst.

Context: Reference @[docs/prd.md]  as the single source of truth. 
Read every module and every feature in the PRD carefully 
before writing anything.

Format: Create docs/kpi.md with this exact structure:

---
## Module 1: [Module Name]

### Feature 1.1: [Feature Name]
- AC1: [testable, measurable condition]
- AC2: [testable, measurable condition]
- AC3: [testable, measurable condition]

### Feature 1.2: [Feature Name]
- AC1: ...

## Module 2: [Module Name]

### Feature 2.1: [Feature Name]
- AC1: ...
---

Rules:
- First output a summary list of ALL modules and features 
  you found in the PRD before writing the full file
- Every module from the PRD must appear
- Every feature under each module must appear
- Every acceptance criterion must be testable (pass/fail, 
  not vague like "should work well")
- No feature may be skipped
- Do not add features not present in the PRD
- Minimum 3 acceptance criteria per feature

Task: Generate the complete kpi.md now. Start by listing 
all modules and features as a summary, then write the 
full file.
````

---

## PROMPT 4 — Generate Project Scope Document

**Output File:** `docs/project-scope.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior technical project manager defining clear boundaries
for a development team before sprint planning.

Format: Output a single markdown file at docs/project-scope.md with
exactly these 5 sections:
1. In Scope
2. Out of Scope
3. Assumptions
4. Dependencies
5. Constraints

Context: @[docs/prd.md]  defines product requirements.
@[docs/kpi.md]  defines acceptance criteria.
Use both to determine what is and is not being built.

Task: Generate docs/project-scope.md. Be specific and technical.
Every in-scope item must map to a feature in the KPI or PRD.
Out-of-scope items must be explicitly stated to prevent scope creep.
No vague statements.
````

---

## PROMPT 5 — Generate Project Boundary Document

**Output File:** `docs/project-boundary.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior engineering lead setting non-negotiable working
rules for an AI coding assistant on this project.

Format: Output a single markdown file at docs/project-boundary.md.
It must contain exactly these 4 rules — no more, no less, no sub-points:
1. Do not commit code yourself.
2. Do not run any commands without asking me first.
3. Do not write code unless you have the full picture. If you have any
   questions, ask me first. Let's not waste tokens building something
   we do not want.
4. Only create maintainable, modular code.

Context: This file governs how the AI assistant behaves throughout
the entire project lifecycle.

Task: Generate docs/project-boundary.md with exactly the 4 rules above.
Do not add explanations, sub-points, or additional rules.
````

---

## PROMPT 6 — Generate Token-Saving Guide

**Output File:** `docs/save-token.md`

---

### Prompt Content (Verbatim)

````text
Role: You are an expert AI prompt engineer specializing in minimizing
token usage while maximizing output quality from LLMs.

Format: Output a single markdown file at docs/save-token.md with
these sections: Principles, Prompt Patterns, What to Avoid,
File Reference Strategy, Quick Checklist.

Context: This project uses an AI coding assistant. Every prompt costs
tokens. This file will be attached to every future prompt in this project
to guide the AI on communicating efficiently.

Task: Generate docs/save-token.md as a reusable token-saving guide that:
- Instructs AI to ask clarifying questions before writing code
- Avoids re-reading files already in context
- Avoids restating the task back to the user
- Focuses only on the delta — what changed, not the whole file
- Uses file references (@filename) instead of pasting full content
- Avoids unnecessary comments, logs, and boilerplate unless asked
- Is generic enough for any web or mobile project type
````

---

## PROMPT 7 — Generate Frontend Persona Document

**Output File:** `personas/frontend-persona.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior frontend architect creating a persona prompt file
for an AI coding assistant to use throughout the entire project.

Format: Output a single markdown file at personas/frontend-persona.md
with these sections:
- Role Definition
- Tech Stack
- Full Folder Structure (including src/, components/, pages/, hooks/,
  services/, assets/, config/, .env.example, .gitignore, and any
  framework-specific folders)
- Coding Standards
- Component Guidelines
- State Management Rules
- API Integration Rules
- Styling Rules
- Accessibility Rules
- Performance Rules
- What NOT to Do

Context: @[docs/prd.md]  defines the project and tech stack.
@[docs/project-scope.md]  defines the boundaries.
The persona must reflect the exact tech stack from the PRD.

Task: Generate personas/frontend-persona.md as a complete production-ready
persona. Include the full frontend folder structure. Make it specific to
the tech stack in the PRD — no generic filler.
````

---

## PROMPT 8 — Generate Backend Persona Document

**Output File:** `personas/backend-persona.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior backend architect creating a persona prompt file
for an AI coding assistant to use throughout the entire project.

Format: Output a single markdown file at personas/backend-persona.md
with these sections:
- Role Definition
- Tech Stack
- Full Folder Structure (including routes/, controllers/, services/,
  models/, middlewares/, config/, utils/, .env.example, .gitignore,
  and docker-related files if applicable)
- API Design Standards
- Database Guidelines
- Authentication & Authorization Rules
- Error Handling Standards
- Logging Standards
- Security Rules
- Performance Rules
- What NOT to Do

Context: @[docs/prd.md]  defines the project and tech stack.
@[docs/project-scope.md]  defines the boundaries.
The persona must reflect the exact tech stack from the PRD.

Task: Generate personas/backend-persona.md as a complete production-ready
persona. Include the full backend folder structure. Make it specific to
the tech stack in the PRD — no generic filler.
````

---

## PROMPT 9 — Generate QA Persona Document

**Output File:** `personas/qa-persona.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior QA engineer and test architect creating a persona
prompt file for an AI QA assistant covering the entire project lifecycle.

Format: Output a single markdown file at personas/qa-persona.md with
these sections:
- Role Definition
- Testing Tech Stack (testing frameworks only, from PRD)
- Folder Structure:
    test-cases/frontend/  ← feature-wise test files
    test-cases/backend/   ← feature-wise test files
    test-cases/log.md     ← test history log
- Test File Naming Convention
  (NEVER .md — always .test.jsx / .test.tsx / .test.js /
   .test.ts / .spec.ts based on project stack)
- Test Coverage Standards
- Frontend Testing Rules (unit, integration, E2E)
- Backend Testing Rules (unit, integration, API)
- Mocking & Fixture Strategy
- CI Integration Notes
- What NOT to Do

Context: @[docs/prd.md]  defines the project.
@[docs/kpi.md]  defines acceptance criteria.
Testing frameworks are defined in the PRD tech stack.

Task: Generate personas/qa-persona.md. All test output files must use
proper test extensions — never .md. Make it specific to the testing stack
in the PRD.
````

---

## PROMPT 10 — Generate Feature Specification: Authentication & Onboarding

**Output Files:** 
- `features/01-author-registration.md`
- `features/02-author-login.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior full-stack tech lead breaking down a product module
into implementation-ready feature specification files.

Format: Output one markdown file per feature in this batch at
features/[NN-feature-name].md (e.g. 01-user-login.md, 02-user-register.md).
Each file must include exactly these 10 sections:
1. Feature Overview
2. Acceptance Criteria (from kpi.md)
3. UI/UX Requirements
4. API Endpoints Required
5. Data Models / Schema
6. State Management Notes
7. Edge Cases
8. Dependencies on Other Features
9. Testing Requirements (exact test file name with correct extension)
10. Out of Scope for This Feature

Context: @[docs/prd.md]  — product spec.
@[docs/kpi.md]  — acceptance criteria source.
@[docs/project-scope.md]  — project boundaries.
@[personas/frontend-persona.md]  — frontend tech constraints.
@[personas/backend-persona.md]  — backend tech constraints.
@[docs/save-token.md]  — follow all token-saving rules.

Current Batch — Module: [Authentication & Onboarding]
Features in this batch:
- [1.1] [Author Registration] 
- [1.2] [Author Login / Authentication] 
Already completed feature files (do not repeat or contradict):
- [list previously generated feature file names here, or write "None" for first batch]

Task: Generate only the feature files listed in this batch. Cross-reference
dependencies with already completed features. If anything is unclear about
scope, ask before writing.
````

---

## PROMPT 11 — Generate Feature Specification: Public Reader Features

**Output Files:** 
- `features/03-landing-page-navigation.md`
- `features/04-article-search.md`
- `features/05-article-detail.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior full-stack tech lead breaking down a product module
into implementation-ready feature specification files.

Format: Output one markdown file per feature in this batch at
features/[NN-feature-name].md (e.g. 01-user-login.md, 02-user-register.md).
Each file must include exactly these 10 sections:
1. Feature Overview
2. Acceptance Criteria (from kpi.md)
3. UI/UX Requirements
4. API Endpoints Required
5. Data Models / Schema
6. State Management Notes
7. Edge Cases
8. Dependencies on Other Features
9. Testing Requirements (exact test file name with correct extension)
10. Out of Scope for This Feature

Context: @[d:\vibeCoding2026\09JunePractice\blog-platform\docs\prd.md]  — product spec.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria source.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-scope.md]  — project boundaries.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — frontend tech constraints.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — backend tech constraints.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules.

Current Batch — Module: [Public Reader Features]
Features in this batch:
- [2.1] [Landing Page & Feed Navigation (Categories & Tags)] 
- [2.2] [Article Search]
- [2.3] [Article Detail View]
Already completed feature files (do not repeat or contradict):
- [list previously generated feature file names here, or write "None" for first batch]

Task: Generate only the feature files listed in this batch. Cross-reference
dependencies with already completed features. If anything is unclear about
scope, ask before writing.
````

---

## PROMPT 12 — Generate Feature Specification: Article Comments

**Output Files:** 
- `features/06-article-comments.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior full-stack tech lead breaking down a product module
into implementation-ready feature specification files.

Format: Output one markdown file per feature in this batch at
features/[NN-feature-name].md (e.g. 01-user-login.md, 02-user-register.md).
Each file must include exactly these 10 sections:
1. Feature Overview
2. Acceptance Criteria (from kpi.md)
3. UI/UX Requirements
4. API Endpoints Required
5. Data Models / Schema
6. State Management Notes
7. Edge Cases
8. Dependencies on Other Features
9. Testing Requirements (exact test file name with correct extension)
10. Out of Scope for This Feature

Context: @[d:\vibeCoding2026\09JunePractice\blog-platform\docs\prd.md]  — product spec.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria source.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-scope.md]  — project boundaries.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — frontend tech constraints.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — backend tech constraints.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules.

Current Batch — Module: [Article Comments]
Features in this batch:
- [3.1] [Reading and Submitting Comments] 

Already completed feature files (do not repeat or contradict):
- [list previously generated feature file names here, or write "None" for first batch]

Task: Generate only the feature files listed in this batch. Cross-reference
dependencies with already completed features. If anything is unclear about
scope, ask before writing.
````

---

## PROMPT 13 — Generate Feature Specification: Author Admin Dashboard

**Output Files:** 
- `features/07-create-post.md`
- `features/08-edit-post.md`
- `features/09-delete-post.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior full-stack tech lead breaking down a product module
into implementation-ready feature specification files.

Format: Output one markdown file per feature in this batch at
features/[NN-feature-name].md (e.g. 01-user-login.md, 02-user-register.md).
Each file must include exactly these 10 sections:
1. Feature Overview
2. Acceptance Criteria (from kpi.md)
3. UI/UX Requirements
4. API Endpoints Required
5. Data Models / Schema
6. State Management Notes
7. Edge Cases
8. Dependencies on Other Features
9. Testing Requirements (exact test file name with correct extension)
10. Out of Scope for This Feature

Context: @[d:\vibeCoding2026\09JunePractice\blog-platform\docs\prd.md]  — product spec.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria source.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-scope.md]  — project boundaries.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — frontend tech constraints.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — backend tech constraints.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules.

Current Batch — Module: [Author Admin Dashboard]
Features in this batch:
- [4.1] [Author Post Management (Create Post)] 
- [4.2] [Author Post Modification (Edit Post)]
- [4.3] [Author Post Deletion (Delete Post)]
Already completed feature files (do not repeat or contradict):
- [list previously generated feature file names here, or write "None" for first batch]

Task: Generate only the feature files listed in this batch. Cross-reference
dependencies with already completed features. If anything is unclear about
scope, ask before writing.
````

---

## PROMPT 14 — Implement Frontend for Author Registration

**Output Files:** 
- `frontend/package.json`
- `frontend/vite.config.js`
- `frontend/index.html`
- `frontend/.env.example`
- `frontend/.gitignore`
- `frontend/src/assets/styles/main.css`
- `frontend/src/assets/styles/custom.css`
- `frontend/src/components/common/Button.jsx`
- `frontend/src/components/common/Input.jsx`
- `frontend/src/components/common/Spinner.jsx`
- `frontend/src/components/common/Card.jsx`
- `frontend/src/config/api.js`
- `frontend/src/hooks/useFetch.js`
- `frontend/src/services/authService.js`
- `frontend/src/hooks/useAuth.js`
- `frontend/src/pages/Register.jsx`
- `frontend/src/App.jsx`
- `frontend/src/index.js`
- `frontend/src/setupTests.js`

---

### Prompt Content (Verbatim)

````text
Role: You are an expert frontend developer.
Strictly follow @[personas/frontend-persona.md]  for all coding decisions.

Format: Output production-ready code files under frontend/.
Follow the exact folder structure defined in the frontend persona.
One component per file. No barrel exports unless persona allows it.

Context:
@[docs/save-token.md]  — follow all token-saving rules strictly.
@[docs/project-boundary.md]  — follow all boundary rules strictly.
@[personas/frontend-persona.md]  — your coding rulebook for this project.
@[features/01-author-registration.md]  — the only feature being built right now.
  Pay special attention to the "UI Component Map" section from project id : projects/13862293598720849297 and Project Name: Lumina Blog Platform 
@[docs/kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES e.g. 01-user-login.md — or write "None"]

Task: Implement the frontend for feature [Author Registration] exactly as defined
in @[features/01-author-registration.md] 
- Follow the Stitch UI Component Map section exactly — do not invent UI
- Satisfy all acceptance criteria from the feature file
- Use only the tech stack defined in the PRD
- Do not implement any other feature
- If anything is unclear before writing code, ask first
````

---

## PROMPT 15 — Implement Frontend for Author Login / Authentication

**Output Files:**
- `frontend/src/pages/Login.jsx`
- `frontend/src/App.jsx`

---

### Prompt Content (Verbatim)

````text
Role: You are an expert frontend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  for all coding decisions.

Format: Output production-ready code files under frontend/.
Follow the exact folder structure defined in the frontend persona.
One component per file. No barrel exports unless persona allows it.

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — your coding rulebook for this project.
@[features/02-author-login.md]  — the only feature being built right now.
  Pay special attention to the "UI Component Map" section from project id : projects/13862293598720849297 and Project Name: Lumina Blog Platform 
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES e.g. 01-user-login.md — or write "None"]

Task: Implement the frontend for feature [Author Registration] exactly as defined
in @[features/02-author-login.md] 
- Follow the Stitch UI Component Map section exactly — do not invent UI
- Satisfy all acceptance criteria from the feature file
- Use only the tech stack defined in the PRD
- Do not implement any other feature
- If anything is unclear before writing code, ask first
````

---

## PROMPT 16 — Implement Frontend for Landing Page & Feed Navigation

**Output Files:**
- `frontend/src/services/postService.js`
- `frontend/src/components/layout/Header.jsx`
- `frontend/src/components/layout/Footer.jsx`
- `frontend/src/components/posts/PostCard.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/App.jsx`

---

### Prompt Content (Verbatim)

````text
Role: You are an expert frontend developer.
Strictly follow @[personas/frontend-persona.md]  for all coding decisions.

Format: Output production-ready code files under frontend/.
Follow the exact folder structure defined in the frontend persona.
One component per file. No barrel exports unless persona allows it.

Context:
@[docs/save-token.md]  — follow all token-saving rules strictly.
@[docs/project-boundary.md]  — follow all boundary rules strictly.
@[personas/frontend-persona.md]  — your coding rulebook for this project.
@[features/03-landing-page-navigation.md]   — the only feature being built right now.
  Pay special attention to the "UI Component Map" section from project id : projects/13862293598720849297 and Project Name: Lumina Blog Platform 
@[docs/kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES e.g. 01-user-login.md — or write "None"]

Task: Implement the frontend for feature [Author Registration] exactly as defined
in @[features/03-landing-page-navigation.md] 
- Follow the Stitch UI Component Map section exactly — do not invent UI
- Satisfy all acceptance criteria from the feature file
- Use only the tech stack defined in the PRD
- Do not implement any other feature
- If anything is unclear before writing code, ask first
````

---

## PROMPT 17 — Implement Frontend for Article Search

**Output Files:**
- `frontend/src/components/layout/Header.jsx`

---

### Prompt Content (Verbatim)

````text
Role: You are an expert frontend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  for all coding decisions.

Format: Output production-ready code files under frontend/.
Follow the exact folder structure defined in the frontend persona.
One component per file. No barrel exports unless persona allows it.

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — your coding rulebook for this project.
@[features/04-article-search.md]  — the only feature being built right now.
  Pay special attention to the "UI Component Map" section from project id : projects/13862293598720849297 and Project Name: Lumina Blog Platform 
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES e.g. 01-user-login.md — or write "None"]

Task: Implement the frontend for feature [Author Registration] exactly as defined
in @[features/04-article-search.md] 
- Follow the Stitch UI Component Map section exactly — do not invent UI
- Satisfy all acceptance criteria from the feature file
- Use only the tech stack defined in the PRD
- Do not implement any other feature
- If anything is unclear before writing code, ask first
````

---

## PROMPT 18 — Implement Frontend for Article Detail View

**Output Files:**
- `frontend/src/pages/Article.jsx`
- `frontend/src/App.jsx`

---

### Prompt Content (Verbatim)

````text
Role: You are an expert frontend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  for all coding decisions.

Format: Output production-ready code files under frontend/.
Follow the exact folder structure defined in the frontend persona.
One component per file. No barrel exports unless persona allows it.

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — your coding rulebook for this project.
@[features/05-article-detail.md]  — the only feature being built right now.
  Pay special attention to the "UI Component Map" section from project id : projects/13862293598720849297 and Project Name: Lumina Blog Platform 
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES e.g. 01-user-login.md — or write "None"]

Task: Implement the frontend for feature [Author Registration] exactly as defined
in @[features/05-article-detail.md] 
- Follow the Stitch UI Component Map section exactly — do not invent UI
- Satisfy all acceptance criteria from the feature file
- Use only the tech stack defined in the PRD
- Do not implement any other feature
- If anything is unclear before writing code, ask first
````

---

## PROMPT 19 — Implement Frontend for Article Comments

**Output Files:**
- `frontend/src/components/posts/CommentSection.jsx`
- `frontend/src/pages/Article.jsx`

---

### Prompt Content (Verbatim)

````text
Role: You are an expert frontend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  for all coding decisions.

Format: Output production-ready code files under frontend/.
Follow the exact folder structure defined in the frontend persona.
One component per file. No barrel exports unless persona allows it.

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — your coding rulebook for this project.
@[features/06-article-comments.md]   — the only feature being built right now.
  Pay special attention to the "UI Component Map" section from project id : projects/13862293598720849297 and Project Name: Lumina Blog Platform 
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES e.g. 01-user-login.md — or write "None"]

Task: Implement the frontend for feature [Author Registration] exactly as defined
in @[features/06-article-comments.md] 
- Follow the Stitch UI Component Map section exactly — do not invent UI
- Satisfy all acceptance criteria from the feature file
- Use only the tech stack defined in the PRD
- Do not implement any other feature
- If anything is unclear before writing code, ask first
````

---

## PROMPT 20 — Implement Frontend for Author Post Management - Create Post

**Output Files:**
- `frontend/src/pages/CreatePost.jsx`
- `frontend/src/App.jsx`

---

### Prompt Content (Verbatim)

````text
Role: You are an expert frontend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  for all coding decisions.

Format: Output production-ready code files under frontend/.
Follow the exact folder structure defined in the frontend persona.
One component per file. No barrel exports unless persona allows it.

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — your coding rulebook for this project.
@[features/07-create-post.md]   — the only feature being built right now.
  Pay special attention to the "UI Component Map" section from project id : projects/13862293598720849297 and Project Name: Lumina Blog Platform 
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES e.g. 01-user-login.md — or write "None"]

Task: Implement the frontend for feature [Author Registration] exactly as defined
in @[features/07-create-post.md] 
- Follow the Stitch UI Component Map section exactly — do not invent UI
- Satisfy all acceptance criteria from the feature file
- Use only the tech stack defined in the PRD
- Do not implement any other feature
- If anything is unclear before writing code, ask first
````

---

## PROMPT 21 — Implement Frontend for Author Post Modification - Edit Post

**Output Files:**
- `frontend/src/pages/EditPost.jsx`
- `frontend/src/App.jsx`

---

### Prompt Content (Verbatim)

````text
Role: You are an expert frontend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  for all coding decisions.

Format: Output production-ready code files under frontend/.
Follow the exact folder structure defined in the frontend persona.
One component per file. No barrel exports unless persona allows it.

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — your coding rulebook for this project.
@[features/08-edit-post.md]  — the only feature being built right now.
  Pay special attention to the "UI Component Map" section from project id : projects/13862293598720849297 and Project Name: Lumina Blog Platform 
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES e.g. 01-user-login.md — or write "None"]

Task: Implement the frontend for feature [Author Registration] exactly as defined
in @[features/08-edit-post.md] 
- Follow the Stitch UI Component Map section exactly — do not invent UI
- Satisfy all acceptance criteria from the feature file
- Use only the tech stack defined in the PRD
- Do not implement any other feature
- If anything is unclear before writing code, ask first
````

---

## PROMPT 22 — Implement Frontend for Author Post Deletion & Dashboard UI

**Output Files:**
- `frontend/src/services/postService.js`
- `frontend/src/pages/Dashboard.jsx`
- `frontend/src/App.jsx`
- `frontend/vite.config.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert frontend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  for all coding decisions.

Format: Output production-ready code files under frontend/.
Follow the exact folder structure defined in the frontend persona.
One component per file. No barrel exports unless persona allows it.

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\frontend-persona.md]  — your coding rulebook for this project.
@[features/09-delete-post.md]   — the only feature being built right now.
  Pay special attention to the "UI Component Map" section from project id : projects/13862293598720849297 and Project Name: Lumina Blog Platform 
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES e.g. 01-user-login.md — or write "None"]

Task: Implement the frontend for feature [Author Registration] exactly as defined
in @[features/09-delete-post.md] 
- Follow the Stitch UI Component Map section exactly — do not invent UI
- Satisfy all acceptance criteria from the feature file
- Use only the tech stack defined in the PRD
- Do not implement any other feature
- If anything is unclear before writing code, ask first
```

---

## PROMPT 23 — Implement Backend for Author Registration

**Output Files:**
- `backend/package.json`
- `backend/.env`
- `backend/.env.example`
- `backend/config/db.js`
- `backend/models/User.js`
- `backend/services/authService.js`
- `backend/middlewares/errorMiddleware.js`
- `backend/controllers/authController.js`
- `backend/routes/authRoutes.js`
- `backend/app.js`
- `backend/server.js`
- `backend/tests/setup.js`
- `backend/tests/integration/auth.test.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert backend developer.
Strictly follow @[personas/backend-persona.md]  for all coding decisions.

Format: Output production-ready code files under backend/.
Follow the exact folder structure defined in the backend persona.
One responsibility per file (route / controller / service / model).

Context:
@[docs/save-token.md]  — follow all token-saving rules strictly.
@[docs/project-boundary.md]  — follow all boundary rules strictly.
@[personas/backend-persona.md]  — your coding rulebook for this project.
@[features/01-author-registration.md]  — the only feature being built right now.
@[docs/kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES — or write "None"]

Task: Implement the backend for feature [FEATURE NAME] exactly as defined
in @[features/01-author-registration.md] 
- Build all API endpoints listed in section 4 of the feature file
- Implement all data models from section 5
- Handle all edge cases from section 7
- Do not implement any other feature
- If anything is unclear before writing code, ask first
```

---

## PROMPT 24 — Implement Backend for Author Login / Authentication

**Output Files:**
- `backend/controllers/authController.js`
- `backend/routes/authRoutes.js`
- `backend/tests/integration/auth.test.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert backend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  for all coding decisions.

Format: Output production-ready code files under backend/.
Follow the exact folder structure defined in the backend persona.
One responsibility per file (route / controller / service / model).

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — your coding rulebook for this project.
@[features/02-author-login.md]   — the only feature being built right now.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES — or write "None"]

Task: Implement the backend for feature [Author Login / Authentication] exactly as defined
in @[features/02-author-login.md] 
- Build all API endpoints listed in section 4 of the feature file
- Implement all data models from section 5
- Handle all edge cases from section 7
- If anything is unclear before writing code, ask first
```

---

## PROMPT 25 — Implement Backend for Landing Page & Feed Navigation

**Output Files:**
- `backend/models/Post.js`
- `backend/controllers/postController.js`
- `backend/routes/postRoutes.js`
- `backend/app.js`
- `backend/tests/integration/post.test.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert backend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  for all coding decisions.

Format: Output production-ready code files under backend/.
Follow the exact folder structure defined in the backend persona.
One responsibility per file (route / controller / service / model).

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — your coding rulebook for this project.
@[features/03-landing-page-navigation.md]    — the only feature being built right now.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES — or write "None"]

Task: Implement the backend for feature [ Landing Page & Feed Navigation (Categories & Tags)] exactly as defined
in @[features/03-landing-page-navigation.md]  
- Build all API endpoints listed in section 4 of the feature file
- Implement all data models from section 5
- Handle all edge cases from section 7
- If anything is unclear before writing code, ask first
```

---

## PROMPT 26 — Implement Backend for Article Search

**Output Files:**
- `backend/controllers/postController.js`
- `backend/tests/integration/post.test.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert backend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  for all coding decisions.

Format: Output production-ready code files under backend/.
Follow the exact folder structure defined in the backend persona.
One responsibility per file (route / controller / service / model).

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — your coding rulebook for this project.
@[features/04-article-search.md]  — the only feature being built right now.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES — or write "None"]

Task: Implement the backend for feature [ Article Search] exactly as defined
in @[features/04-article-search.md]   
- Build all API endpoints listed in section 4 of the feature file
- Implement all data models from section 5
- Handle all edge cases from section 7
- If anything is unclear before writing code, ask first
```

---

## PROMPT 27 — Implement Backend for Article Detail View

**Output Files:**
- `backend/controllers/postController.js`
- `backend/routes/postRoutes.js`
- `backend/tests/integration/post.test.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert backend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  for all coding decisions.

Format: Output production-ready code files under backend/.
Follow the exact folder structure defined in the backend persona.
One responsibility per file (route / controller / service / model).

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — your coding rulebook for this project.
@[features/05-article-detail.md]   — the only feature being built right now.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES — or write "None"]

Task: Implement the backend for feature [ Article Detail View] exactly as defined
in @[features/05-article-detail.md]   
- Build all API endpoints listed in section 4 of the feature file
- Implement all data models from section 5
- Handle all edge cases from section 7
- Do not implement any other feature
- If anything is unclear before writing code, ask first
```

---

## PROMPT 28 — Implement Backend for Article Comments

**Output Files:**
- `backend/models/Comment.js`
- `backend/controllers/commentController.js`
- `backend/routes/commentRoutes.js`
- `backend/app.js`
- `backend/tests/integration/comment.test.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert backend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  for all coding decisions.

Format: Output production-ready code files under backend/.
Follow the exact folder structure defined in the backend persona.
One responsibility per file (route / controller / service / model).

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — your coding rulebook for this project.
@[features/06-article-comments.md]    — the only feature being built right now.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES — or write "None"]

Task: Implement the backend for feature [ Reading and Submitting Comments] exactly as defined
in @[features/06-article-comments.md] 
- Build all API endpoints listed in section 4 of the feature file
- Implement all data models from section 5
- Handle all edge cases from section 7
- Do not implement any other feature
- If anything is unclear before writing code, ask first
```

---

## PROMPT 29 — Implement Backend for Post Creation

**Output Files:**
- `backend/middlewares/authMiddleware.js`
- `backend/utils/slugify.js`
- `backend/utils/sanitize.js`
- `backend/services/postService.js`
- `backend/controllers/postController.js`
- `backend/routes/postRoutes.js`
- `backend/tests/integration/post.test.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert backend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  for all coding decisions.

Format: Output production-ready code files under backend/.
Follow the exact folder structure defined in the backend persona.
One responsibility per file (route / controller / service / model).

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — your coding rulebook for this project.
@[features/07-create-post.md]     — the only feature being built right now.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES — or write "None"]

Task: Implement the backend for feature [Author Post Management (Create Post)] exactly as defined
in @[features/07-create-post.md] 
- Build all API endpoints listed in section 4 of the feature file
- Implement all data models from section 5
- Handle all edge cases from section 7
- Do not implement any other feature
- If anything is unclear before writing code, ask first
```

---

## PROMPT 30 — Implement Backend for Post Editing

**Output Files:**
- `backend/controllers/postController.js`
- `backend/routes/postRoutes.js`
- `backend/tests/integration/post.test.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert backend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  for all coding decisions.

Format: Output production-ready code files under backend/.
Follow the exact folder structure defined in the backend persona.
One responsibility per file (route / controller / service / model).

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — your coding rulebook for this project.
@[features/08-edit-post.md]      — the only feature being built right now.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES — or write "None"]

Task: Implement the backend for feature [ Author Post Modification (Edit Post)] exactly as defined
in @[features/08-edit-post.md] 
- Build all API endpoints listed in section 4 of the feature file
- Implement all data models from section 5
- Handle all edge cases from section 7
- Do not implement any other feature
- If anything is unclear before writing code, ask first
```

---

## PROMPT 31 — Implement Backend for Post Deletion

**Output Files:**
- `backend/controllers/postController.js`
- `backend/routes/postRoutes.js`
- `backend/tests/integration/post.test.js`

---

### Prompt Content (Verbatim)

```text
Role: You are an expert backend developer.
Strictly follow @[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  for all coding decisions.

Format: Output production-ready code files under backend/.
Follow the exact folder structure defined in the backend persona.
One responsibility per file (route / controller / service / model).

Context:
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\save-token.md]  — follow all token-saving rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\project-boundary.md]  — follow all boundary rules strictly.
@[d:\vibeCoding2026\09JunePractice\blog-platform\personas\backend-persona.md]  — your coding rulebook for this project.
@[features/09-delete-post.md]       — the only feature being built right now.
@[d:\vibeCoding2026\09JunePractice\blog-platform\docs\kpi.md]  — acceptance criteria to satisfy.

Already completed features (do not modify their code):
[LIST COMPLETED FEATURE FILES — or write "None"]

Task: Implement the backend for feature [Author Post Deletion (Delete Post)] exactly as defined
in @[features/09-delete-post.md] 
- Build all API endpoints listed in section 4 of the feature file
- Implement all data models from section 5
- Handle all edge cases from section 7
- Do not implement any other feature
- If anything is unclear before writing code, ask first
```

---

## PROMPT 32 — Refactor Frontend Article Comments API Integration

**Output Files:**
- `frontend/src/services/postService.js`
- `frontend/src/components/posts/CommentSection.jsx`

---

### Prompt Content (Verbatim)

```text
now completed frontned and backend features 
@[docs/save-token.md] 
@[personas/frontend-persona.md] integrate all api as mentioned in @[features] folder 
take feature wise implementation one by one
```

---

## PROMPT 33 — Refactor Frontend Post Creation API Integration

**Output Files:**
- `frontend/src/services/postService.js`
- `frontend/src/pages/CreatePost.jsx`

---

### Prompt Content (Verbatim)

```text
proceed
```

---

## PROMPT 34 — Refactor Frontend Post Editing API Integration

**Output Files:**
- `frontend/src/services/postService.js`
- `frontend/src/pages/EditPost.jsx`

---

### Prompt Content (Verbatim)

```text
yes proceed
```

---

## PROMPT 35 — Restructure Features Folder Module-Wise

**Output Files:**
- `features/Module-1-Authentication-Onboarding/01-author-registration.md`
- `features/Module-1-Authentication-Onboarding/02-author-login.md`
- `features/Module-2-Public-Reader-Features/03-landing-page-navigation.md`
- `features/Module-2-Public-Reader-Features/04-article-search.md`
- `features/Module-2-Public-Reader-Features/05-article-detail.md`
- `features/Module-3-Article-Comments/06-article-comments.md`
- `features/Module-4-Author-Admin-Dashboard/07-create-post.md`
- `features/Module-4-Author-Admin-Dashboard/08-edit-post.md`
- `features/Module-4-Author-Admin-Dashboard/09-delete-post.md`

---

### Prompt Content (Verbatim)

```text
convert my features folder module wise means module name folder and inside fetaures realated to that module only
```
