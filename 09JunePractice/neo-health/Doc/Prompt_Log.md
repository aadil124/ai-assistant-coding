# Prompt Log

## Neo-Health — Neo-Health Application Suite

---

## PROMPT 1 — Initialize Prompt Logger

**Output File:** `Doc/Prompt_Log.md`

---

### Prompt Content (Verbatim)

````text
I am starting the Neo-Health project. 

Please initialize the prompt logger for this project by reading and following the global instructions located at `C:\Users\md.adil\.gemini\config\skills\prompt_logger.md`
 
Establish the Role:

- Act as the AI Prompt Auditor & SDLC Log Custodian.

- Create the `Doc/Prompt_Log.md` file in the workspace root.

- Initialize it for the project: "{{Project Name}}" — "[Insert Project Description]".

- Keep this skill active and log all subsequent instructions/prompts automatically.
 
 
write this prompt for window
````

---

## PROMPT 2 — Generate PRD for Neo-Health

**Output File:** `docs/prd.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior product manager.

Context: I am starting a new software project. I will describe the idea to you below. 
Tech stack: - Frontend:
  - React 19
  - Vite 7
  - Bootstrap 5

- Backend:
  - Node.js 22 LTS
  - Express.js 5

- Database:
  - MongoDB Atlas (Cloud)
  - Mongoose 8

- Deployment:
  - Frontend: Vercel
  - Backend: Render
  - Database: MongoDB Atlas (Cloud)

Format: Create a file at docs/prd.md. Use exactly these 8 sections with H2 headings, no extra sections:
1. Problem Statement
2. Solution Overview
3. User Flow
4. API Design
5. Edge Cases
6. KPIs (Success Metrics / Acceptance Criteria)
7. Limitations
8. Tech Stack

Task: Generate the PRD for the following idea: 
Create a healthcare platform connecting patients with doctors for appointments, consultations, and medical records management.
Core Features
Doctor Profiles
Appointment Booking
Video Consultations
Medical Records
Prescription Management
Notifications
Payments
Patient Dashboard
Reviews
Admin Portal
 
Be precise and concise. No filler.
````

---

## PROMPT 3 — Create Project Boundary Guardrails

**Output File:** `docs/project-boundary.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior engineering lead setting project guardrails.
Context: I am using an AI coding assistant (Antigravity) to build this project. I need a boundary file that the AI must follow at all times.
Format: Create docs/project-boundary.md with exactly these 4 rules as a numbered list, no additions:
1. Do not commit code yourself.
2. Do not run any commands without asking me first.
3. Do not write code unless you have the full picture. If you have questions, ask first. Let's not waste tokens building something we do not want.
4. Only create maintainable, modular code.
Task: Generate this file now.
````

---

## PROMPT 4 — Create Token Saving Instructions

**Output File:** `docs/save-token.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior AI prompt engineer.

Context: I am building a project using an AI coding assistant across many sessions. I want a reusable token-saving instruction file I will paste at the start of every prompt session.

Format: Create docs/save-token.md. Include instructions for: staying in scope, referencing only relevant files, not repeating context already in referenced docs, giving short answers unless code is needed, asking clarifying questions before writing code, confirming understanding before acting.

Task: Write this file in a concise, instruction-list style. Keep it under 20 lines. No filler.
````

---

## PROMPT 5 — Create KPI Acceptance Criteria File

**Output File:** `docs/kpi.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior QA architect and product analyst.
Context: Reference @[docs/prd.md]  as the single source of truth.
Format: Create docs/kpi.md. Structure it as: Module → Features → Acceptance Criteria per feature. Use H2 for modules, H3 for features, bullet points for criteria. Cover every feature in the PRD. No feature may be skipped.
Task: Generate the complete KPI file from the PRD. Each acceptance criterion must be testable and measurable.
````

---

## PROMPT 6 — Create Project Scope File

**Output File:** `docs/project-scope.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior product manager and business analyst.

Context: Reference @[docs/prd.md]  and @[docs/kpi.md] .

Format: Create docs/project-scope.md with these H2 sections: In Scope, Out of Scope, Assumptions, Dependencies, Known Risks.

Task: Derive the project scope strictly from the PRD and KPI files. Be explicit — anything not in the PRD is out of scope by default.
````

---

## PROMPT 7 — Create Frontend Developer Persona File

**Output File:** `personas/frontend-persona.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a principal frontend engineer.
Context: Reference @[docs/prd.md]  Tech stack is [FRONTEND STACK from PRD].
Format: Create personas/frontend-persona.md. Include: Role summary, tech stack expertise, coding standards, component conventions, state management approach, UI testing approach, communication style for prompts.
Task: Write a persona definition that will be used as a role instruction in every frontend development prompt. Be specific to the tech stack. No generic filler.
````

---

## PROMPT 8 — Create Backend Developer Persona File

**Output File:** `personas/backend-persona.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a principal backend engineer.
Context: Reference @[docs/prd.md]  Tech stack is [BACKEND STACK from PRD].
Format: Create personas/backend-persona.md. Include: Role summary, tech stack expertise, API design standards, database conventions, error handling approach, security practices, backend testing approach.

Task: Write a persona definition for backend development prompts. Specific to the tech stack. No generic filler.
````

---

## PROMPT 9 — Create QA Engineer Persona File

**Output File:** `personas/qa-persona.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior QA engineer specialising in TDD.
Context: Reference @[docs/prd.md]  and @[docs/kpi.md]  Tech stack is [STACK from PRD].
Format: Create personas/qa-persona.md. Include: Role summary, testing philosophy (TDD), tools used, test coverage standards, types of tests (unit/integration/e2e), bug reporting format.

Task: Write a QA persona for test case generation and review prompts. No generic filler.
````

---

## PROMPT 10 — Update KPI Acceptance Criteria File

**Output File:** `docs/kpi.md`

---

### Prompt Content (Verbatim)

````text
i want to update my kpi.md

Role: You are a senior QA architect and product analyst.

Context: Reference @docs/prd.md as the single source of truth. 
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

## PROMPT 11 — Create Master Feature Index Table

**Output File:** None (Stdout Response)

---

### Prompt Content (Verbatim)

````text
Role: You are a project planner.

Context: Reference @docs/kpi.md only.

Format: Give me a table with these columns:
| NN | Feature ID | Feature Name | Module | File Name |

Rules:
- NN is a sequential 2-digit number starting from 01
- Feature ID comes from kpi.md (e.g. 1.1, 1.2, 2.1)
- Feature Name is the exact name from kpi.md
- Module is the parent module name from kpi.md
- File Name follows this pattern: 
  feature-[NN]-[feature-name-kebab-case].md

Task: List every single feature from kpi.md in this table. 
This is my master feature index. Miss nothing.
````

---

## PROMPT 12 — Create Feature Specification File for Registration and Login

**Output File:** `features/feature-01-registration-and-login.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior product engineer and technical writer.

Context: Reference these files:
- @docs/prd.md
- @docs/kpi.md (Feature [FEATURE ID e.g. 1.1])
- @personas/frontend-persona.md
- @personas/backend-persona.md
- @personas/qa-persona.md
- @docs/project-boundary.md
- @docs/save-token.md

Format: Create features/feature-[NN]-[feature-name].md 
with these exact sections:

## Feature ID: [NN]
## Feature Name: [Name]
## Module: [Module name]
## Description: [What this feature does]
## User Story
  As a [user type], I want to [action] so that [outcome]
## Acceptance Criteria
  (copy from kpi.md for this feature)
## API Endpoints
  Method | Path | Request | Response
## UI Components
  List each component needed
## State / Data Flow
  How data moves through this feature
## Edge Cases
  (specific to this feature)
## Dependencies
  List other feature numbers this depends on
## Out of Scope for This Feature
  What is explicitly NOT part of this feature

Rules:
- Cover every production-level detail
- Nothing vague or placeholder
- API endpoints must have full request/response shape
- Edge cases must be specific, not generic

Task: Generate the feature file for:
Feature 01: Registration and Login
(This maps to Feature 1.1 in kpi.md)
````

---

## PROMPT 13 — Create Feature Specification Files for Doctor Search, Booking, and Confirmation

**Output Files:**
- `features/feature-02-doctor-search-and-filters.md`
- `features/feature-03-slot-selection-and-payment-checkout.md`
- `features/feature-04-booking-confirmation-and-notifications.md`

---

### Prompt Content (Verbatim)

````text
Task: Generate the feature file for:
Feature 02: Doctor Search and Filters
(This maps to Feature 1.2 in kpi.md)

Task: Generate the feature file for:
Feature 03: Slot Selection and Payment Checkout
(This maps to Feature 1.3 in kpi.md)

Task: Generate the feature file for:
Feature 04: Booking Confirmation and Notifications (This maps to Feature 1.4 in kpi.md)
````

---

## PROMPT 14 — Create Feature Specification Files for Video, Records, and Reviews

**Output Files:**
- `features/feature-05-video-consultation-access.md`
- `features/feature-06-post-consultation-prescription-and-medical-records-access.md`
- `features/feature-07-doctor-reviews-submission.md`

---

### Prompt Content (Verbatim)

````text
Task: Generate the feature file for:
Feature 05: Video Consultation Access
(This maps to Feature 1.5 in kpi.md)

Task: Generate the feature file for:
Feature 06: Post-Consultation Prescription and Medical Records Access (This maps to Feature 1.6 in kpi.md)

Task: Generate the feature file for:
Feature 07: Doctor Reviews Submission (This maps to Feature 1.7 in kpi.md)
````

---

## PROMPT 15 — Create Frontend Test Cases for Registration and Login

**Output File:** `test-cases/frontend-testcases/feature-01-tests.md`

---

### Prompt Content (Verbatim)

````text
Role: @[personas/qa-persona.md] 

Context: Reference these files:
- @features/@[features/feature-01-registration-and-login.md] 
- @docs/kpi.md (Feature 1.1)

Format: Create test-cases/frontend-testcases/
feature-[NN]-tests.md with this structure per test:

### Test [NN]-F-[001]: [Test Name]
- Type: [Unit / Component / Integration / E2E]
- Description: [What is being tested]
- Preconditions: [What must be true before this test]
- Input: [Exact input data]
- Steps: [Step by step actions]
- Expected Output: [Exact expected result]
- Pass Criteria: [How to confirm pass]
- Fail Criteria: [How to confirm fail]
- Maps to AC: [AC number from kpi.md]

Rules:
- Every acceptance criterion from kpi.md must map to 
  at least one test
- Cover happy path, edge cases, and failure states
- Minimum 1 unit test, 1 integration test per feature
- No vague expected outputs

Task: Generate all frontend test cases for:
Feature [01]: Registration and Login
````

---

## PROMPT 16 — Generate Implementation-Ready Feature Specs for Module 1: Patient Flow

**Output Files:**
- `modules/01-patient-flow/01-registration-and-login.md`
- `modules/01-patient-flow/02-doctor-search-and-filters.md`
- `modules/01-patient-flow/03-slot-selection-and-payment-checkout.md`
- `modules/01-patient-flow/04-booking-confirmation-and-notifications.md`
- `modules/01-patient-flow/05-video-consultation-access.md`
- `modules/01-patient-flow/06-post-consultation-prescription-and-medical-records-access.md`
- `modules/01-patient-flow/07-doctor-reviews-submission.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior full-stack tech lead breaking down a
product module into implementation-ready feature files.

Format: Output one markdown file per feature at:
modules/[NN-module-name]/[NN-feature-name].md
Example:
  modules/01-authentication/01-user-login.md
  modules/01-authentication/02-user-register.md
  modules/01-authentication/03-forgot-password.md

Each feature file must include exactly these 10 sections:
1. Feature Overview
2. Acceptance Criteria (from kpi.md)
3. UI/UX Requirements
4. API Endpoints Required
5. Data Models / Schema
6. State Management Notes
7. Edge Cases
8. Dependencies on Other Features
9. Testing Requirements
   (exact test file name with correct extension —
    never .md)
10. Out of Scope for This Feature

Context:
@docs/prd.md — product spec
@docs/kpi.md — acceptance criteria source
@docs/project-scope.md — project boundaries
@personas/frontend-persona.md — frontend tech constraints
@personas/backend-persona.md — backend tech constraints
@docs/save-token.md — follow all token-saving rules

Current Batch — Module: Patient Flow
Folder: modules/01-patient-flow/

Features in this batch:
- 01-registration-and-login
- 02-doctor-search-and-filters
- 03-slot-selection-and-payment-checkout
- 04-booking-confirmation-and-notifications
- 05-video-consultation-access
- 06-post-consultation-prescription-and-medical-records-access
- 07-doctor-reviews-submission

Already completed modules/features (do not repeat or contradict):
None
````

---

## PROMPT 17 — Generate Implementation-Ready Feature Specs for Module 2: Doctor Flow

**Output Files:**
- `modules/02-doctor-flow/01-doctor-registration-verification-and-profile-setup.md`
- `modules/02-doctor-flow/02-schedule-availability-and-consultation-fees-configuration.md`
- `modules/02-doctor-flow/03-dashboard-and-upcoming-appointments-management.md`
- `modules/02-doctor-flow/04-video-consultation-host-session.md`
- `modules/02-doctor-flow/05-digital-prescription-generation-and-medical-record-uploads.md`
- `modules/02-doctor-flow/06-review-management-and-earnings-tracking.md`

---

### Prompt Content (Verbatim)

````text
give me for module 2
````

---

## PROMPT 18 — Generate Implementation-Ready Feature Specs for Module 3: Admin Flow

**Output Files:**
- `modules/03-admin-flow/01-admin-authentication-and-dashboard-access.md`
- `modules/03-admin-flow/02-doctor-credentials-verification-approve-reject.md`
- `modules/03-admin-flow/03-platform-oversight-and-activity-monitoring.md`
- `modules/03-admin-flow/04-refund-handling-and-policy-violation-management.md`

---

### Prompt Content (Verbatim)

````text
now module 3
````

---

## PROMPT 19 — Generate API Schema and Design Document

**Output File:** `docs/api-schema-and-design.md`

---

### Prompt Content (Verbatim)

````text
Role: You are a senior backend architect and API design specialist
creating a comprehensive API schema and design document that will
serve as the single source of truth for all backend and frontend
development in this project.

Format: Output a single markdown file at
docs/api-schema-and-design.md with these sections:

1. Overview (base URL, versioning, auth mechanism, response format)
2. Authentication & Authorization
   - Auth flow description
   - Token structure
   - Protected vs public routes
3. Database Schema
   - All tables/collections with every field,
     data type, constraints, and relationships
4. API Endpoints (for every module):
   ### Module Name
   #### Endpoint: METHOD /path
   - Description
   - Auth required: Yes/No
   - Request Headers
   - Request Body (with field names, types, required/optional)
   - Success Response (status code + body structure)
   - Error Responses (all possible status codes + messages)
   - Business Rules / Validation Rules
5. Shared/Common Schemas (reusable response objects)
6. Error Code Reference Table
7. Rate Limiting & Security Notes

Context:
@docs/kpi.md — all modules and features
@docs/prd.md — product spec and API design section
@personas/backend-persona.md — backend tech constraints
@modules/ — all generated module/feature files

Task: Generate docs/api-schema-and-design.md covering every
module and every endpoint. Every field must be documented.
Every error case must have a status code and message.
This document will be used directly by both backend and
frontend developers — make it complete and unambiguous.
````

---

## PROMPT 20 — Fetch Stitch MCP Projects List

**Output File:** None (Stdout Response)

---

### Prompt Content (Verbatim)

````text
I have connected my stitch mcp server 
fetch my all projects list here
````

---

## PROMPT 21 — Fetch Screens List for Neo Health Platform

**Output File:** None (Stdout Response)

---

### Prompt Content (Verbatim)

````text
for Neo Health Platform and project path : projects/1300401718963667279
fetch my all screens list here 
````

---

## PROMPT 22 — Create Frontend Public Screens Setup Plan

**Output File:** None (Staging Plan)

---

### Prompt Content (Verbatim)

````text
@[personas/frontend-persona.md] start making screen for 
Public Screens
Landing Page
About Us
Contact Us
FAQ
Login
Register
Forgot Password
Reset Password
404/Error Page
@[docs/save-token.md] 
````













