# Prompt Playbook Library

## 1. Project Kickstart Prompts

### [Kickstart] Project Scaffold
```markdown
Act as a Senior Software Architect. Scaffold a new project named [PROJECT_NAME] using the following tech stack: [TECH_STACK].

Requirements:
1. Design a clean, modular directory structure following modern best practices for [TECH_STACK].
2. List all required configuration files (e.g., eslint, prettier, package.json, dockerfile, tsconfig, etc.) and write the complete, production-ready code/content for the most important configuration files.
3. Provide a clear separation of concerns (e.g., controllers, services, repositories, routes, components, styles).
4. Explain the architectural decisions behind this folder layout.
5. Identify potential scaling bottlenecks or security risks with this layout and suggest mitigations.
6. Suggest improvements for developer experience (DX) such as hot reloading, linting on commit, or debug configurations.
```

### [Kickstart] PRD Generator
```markdown
Act as a Principal Product Engineer. Write a comprehensive, production-grade Product Requirement Document (PRD) for [FEATURE_NAME] in the project [PROJECT_NAME].

Your PRD must include:
1. Executive Summary & Objective: What problem are we solving?
2. User Personas & Use Cases: Who is this for and how will they use it?
3. Detailed Functional Requirements (in a table format, prioritized by MoSCoW method: Must, Should, Could, Won't).
4. Non-Functional Requirements (Performance, Security, Reliability, Scalability).
5. User Flow & Key UI/UX states (success, error, empty, loading).
6. Data Model / Schema changes required.
7. Risks, edge cases (e.g., network failures, concurrent modifications), and mitigation strategies.
8. Suggestions for phase-2 features and metrics to measure success.
Explain the rationale behind your prioritization choices and non-functional requirements.
```

### [Kickstart] Context.md Generator
```markdown
Act as an AI Coding Assistant Expert. Create a production-grade `context.md` (or `.cursorrules`) file for the repository [PROJECT_NAME] built with [TECH_STACK].

The context file must include:
1. Project overview and primary goals.
2. Tech stack specifications, including versions, design system, and key dependencies.
3. Explicit architectural rules, patterns (e.g., functional programming, hooks, service-repository), and code style guidelines.
4. File naming and directory conventions.
5. Specific instructions for code generation (e.g., "always add type safety", "never use default exports").
6. Common commands (build, run, test, lint).
7. Identify potential pitfalls where LLMs typically make mistakes in [TECH_STACK] and specify instructions to avoid them.
Explain why you structured the rules this way for optimal LLM context parsing.
```

### [Kickstart] Architecture Planner
```markdown
Act as a Staff Systems Architect. Design a production-grade, highly available system architecture for [PROJECT_NAME] using [TECH_STACK]. The system must handle [EXPECTED_TRAFFIC] (e.g., 10k daily active users, 1000 requests/sec).

Your plan must cover:
1. High-level architecture diagram (described in Mermaid.js syntax).
2. Data flow and communication protocols (e.g., REST, GraphQL, WebSockets, gRPC).
3. Database strategy (primary databases, caching layers, read replicas, partitioning).
4. Infrastructure components (load balancers, CDN, API gateways, queues, serverless vs. containerized hosting).
5. Detailed explanations of architectural decisions (e.g., why choosing a SQL over NoSQL database for this use case).
6. Identification of single points of failure (SPOFs), scaling bottlenecks, security vulnerabilities, and their mitigations.
7. Cost-optimization suggestions and alternative approaches.
```

### [Kickstart] Feature Roadmap
```markdown
Act as a Lead Product Engineer. Create a detailed technical feature roadmap for implementing [FEATURE_NAME] in [PROJECT_NAME] using [TECH_STACK].

The roadmap must include:
1. Break down of the implementation into distinct logical phases (e.g., Phase 1: Core API & Schema, Phase 2: Core UI & Authentication, Phase 3: Edge Cases & Optimization).
2. For each phase, list the specific tasks, deliverables, and estimated level of effort (e.g., Low, Medium, High).
3. Dependencies between tasks and critical path mapping.
4. Technical risks for each phase (e.g., third-party API limits, migration downtime) and mitigation strategies.
5. Verification steps for each milestone to ensure production readiness.
6. Explain the logic behind the ordering of your phases and how it minimizes time-to-value.
```

## 2. Requirement & Planning Prompts

### [Planning] Product Requirement Document
```markdown
Act as a Senior Product Manager. Generate a detailed Product Requirement Document (PRD) based on this feature request: [FEATURE_REQUEST] for the app [PROJECT_NAME] built on [TECH_STACK].

The PRD must include:
1. Problem statement, value proposition, and success metrics.
2. Detailed user stories and user journeys.
3. Functional and technical requirements.
4. Out of scope items.
5. Security, privacy, and compliance requirements (e.g., GDPR, SOC2).
6. Explanation of how this feature integrates with the existing system architecture.
7. Detailed risk analysis, listing potential edge cases, edge-case failure modes, and fallback strategies.
8. Ideas to improve the user onboarding flow for this feature.
```

### [Planning] User Stories Generator
```markdown
Act as a Scrum Master. Generate a set of production-grade Agile User Stories for the feature [FEATURE_NAME] within the project [PROJECT_NAME] using [TECH_STACK].

Each User Story must follow the standard template: "As a [role], I want to [action], so that [benefit]."
For each story, provide:
1. Clear description and business value.
2. Technical notes and implementation hints for developers.
3. Rough estimation in Story Points (using Fibonacci scale) with rationales.
4. Identify dependencies on other stories or external systems.
5. Risk factors and edge cases (e.g., offline behavior, validation failures).
6. Suggestions for splitting large stories (epics) into smaller, deliverable units.
```

### [Planning] Acceptance Criteria
```markdown
Act as a Lead QA Engineer. Write comprehensive, production-grade Acceptance Criteria for [FEATURE_NAME] in [PROJECT_NAME].

Requirements:
1. Use the BDD (Behavior-Driven Development) Given-When-Then format.
2. Cover all happy paths, sad paths (e.g., invalid inputs, authorization errors), and extreme edge cases (e.g., rapid double-clicks, session expiration).
3. Define clear UI states (loading, disabled, empty, validation errors).
4. Explain the rationale behind the selected edge cases and error bounds.
5. Highlight potential security vulnerabilities (e.g., input injection, IDOR) that must be prevented.
6. Suggest automated testing strategies (unit, integration, E2E) for these criteria.
```

### [Planning] Sprint Planning
```markdown
Act as an Engineering Manager. Plan a 2-week sprint for a team of [TEAM_SIZE] developers to deliver [MILESTONE_GOAL] for [PROJECT_NAME] using [TECH_STACK].

Provide:
1. Sprint Goal and definition of done (DoD).
2. Task allocation breakdown with tasks categorized by frontend, backend, devops, and QA.
3. Velocity assumptions and capacity planning.
4. Dependency matrix showing which tasks block others.
5. Potential sprint risks (e.g., scope creep, external dependencies) and proactive mitigation plans.
6. Explain the reasoning behind your task grouping and sequencing.
7. Recommend team-wide processes (e.g., daily standup focus, code review SLA) to ensure success.
```

### [Planning] MVP Planning
```markdown
Act as a Product Engineer. Define the MVP (Minimum Viable Product) scope for [PROJECT_NAME] using [TECH_STACK]. The overall vision is [FULL_VISION].

Your MVP plan must:
1. List the absolute minimum features required to launch and gather feedback, separated from the post-MVP backlog.
2. Justify why each MVP feature is critical and why each backlog feature is deferred.
3. Provide a simplified database schema and architectural plan suited for quick delivery but designed to scale later.
4. List technical compromises/debts being made in the MVP and how they will be resolved.
5. Identify critical risks that could delay the MVP launch and how to prevent them.
6. Suggest metrics and analytics events to track to validate the product hypotheses.
```

## 3. Feature Development Prompts

### [Dev] Build Feature
```markdown
Act as a Staff Software Engineer. Write clean, production-ready, and well-documented code to implement [FEATURE_NAME] in the project [PROJECT_NAME] using [TECH_STACK].

Code Requirements:
1. Write complete, copy-paste ready code files for the model, database schema/migration, API routes, controller logic, and frontend component. Avoid using placeholders or ellipses (`// ...`).
2. Ensure strict error handling, validation, logging, and typing (e.g., TypeScript or strong types if applicable).
3. Implement proper security measures (e.g., authorization checks, SQL injection prevention, CSRF mitigation).
4. Explain the key architectural and design pattern choices made in the code.
5. Identify edge cases (e.g., database transaction failures, concurrent requests, race conditions) and explain how the code handles them.
6. Suggest performance optimizations (e.g., database indexing, caching) and general improvements.
```

### [Dev] API Development
```markdown
Act as a Senior Backend Engineer. Create a production-grade, secure, and optimized API endpoint for [API_NAME] in [PROJECT_NAME] using [TECH_STACK].

The implementation must include:
1. Input validation schema and request body parsing.
2. Controller logic with proper status codes (e.g., 200, 201, 400, 401, 403, 404, 429, 500).
3. Authentication and authorization check middleware.
4. Rate limiting and CORS configuration.
5. Complete database query logic (using ORM or raw SQL) handling transactions if needed.
6. Detailed explanation of your response structure, error payloads, and choice of status codes.
7. Analysis of potential security threats (e.g., replay attacks, parameter pollution) and performance concerns (e.g., database connection pool exhaustion), along with mitigations.
8. Suggest improvements like API versioning or caching strategies.
```

### [Dev] Database Design
```markdown
Act as a Lead Database Architect. Design a highly optimized database schema for [FEATURE_NAME] in the project [PROJECT_NAME] using [DATABASE_TYPE] (e.g., PostgreSQL, MongoDB).

The deliverable must contain:
1. Complete SQL DDL or NoSQL schemas with correct data types, constraints (e.g., NOT NULL, UNIQUE, FOREIGN KEY, CHECK), and cascade rules.
2. Concrete indexes (e.g., B-Tree, GIN, composite indexes) optimized for read/write queries.
3. A database migration script (up and down migrations) that is safe to run in production.
4. Diagram of tables and relationships (using Mermaid.js syntax).
5. Explain the rationale for database type selection, schema normalization level, and indexing choices.
6. Identify potential scaling bottlenecks (e.g., write locks, table scans, high cardinality indexes) and suggest mitigation plans (e.g., partitioning, sharding, replication).
```

### [Dev] Authentication Flow
```markdown
Act as a Principal Security Engineer. Implement a secure, production-ready authentication and authorization flow for [PROJECT_NAME] using [TECH_STACK] and [AUTH_METHOD] (e.g., JWT, Sessions, OAuth2, Auth0).

Your implementation must include:
1. Signup, login, password hashing (e.g., bcrypt/argon2), and email verification.
2. Token generation, rotation, expiration, and secure cookie/storage handling (e.g., HttpOnly, SameSite, Secure).
3. Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC) middleware.
4. Password reset (with secure short-lived tokens) and multi-factor authentication (MFA) hooks.
5. Explain the security architecture decisions (e.g., token lifetime, storage choices) and potential attack vectors (e.g., CSRF, XSS, brute-force).
6. Identify edge cases like simultaneous logins, token revocation, or user account lockout, and detail how to handle them.
7. Suggest UX enhancements (e.g., magic links, social login buttons).
```

### [Dev] Dashboard Creation
```markdown
Act as a Lead Frontend Engineer. Build a high-performance, responsive analytics dashboard component for [PROJECT_NAME] using [TECH_STACK].

The code must include:
1. Clean layouts with sidebars, headers, and dynamic widgets (charts, metrics, tables).
2. State management for filters (date ranges, categories, search queries) and pagination.
3. Integration with placeholder API endpoints using loading skeletons, error boundaries, and empty states.
4. Responsive grid layout using modern CSS methods (Flexbox, CSS Grid) that looks perfect on mobile, tablet, and desktop.
5. Explanation of data-fetching libraries and rendering choices (e.g., Server-Side Rendering vs Client-Side Hydration).
6. Identification of performance bottlenecks (e.g., heavy chart re-renders, layout shifts) and optimization techniques (e.g., virtualization, debounce).
7. Accessibility (a11y) improvements (ARIA roles, keyboard navigation).
```

## 4. UI / Design Prompts

### [UI] Build Component
```markdown
Act as a Senior UI/UX Frontend Developer. Create a highly reusable, accessible, and themeable [COMPONENT_NAME] component in [TECH_STACK] using [STYLING_METHOD] (e.g., Tailwind CSS, CSS Modules).

The component code must:
1. Contain complete, self-contained TypeScript/JavaScript code, styles, and typing definitions.
2. Support multiple variants (e.g., sizes, colors, outlines, states like loading/disabled).
3. Adhere to WAI-ARIA guidelines, including proper keyboard navigation, focus trap (if modal), and screen reader attributes.
4. Include interactive hover, focus, active, and transitions/animations.
5. Explain the API design of the component properties and state management strategy.
6. Outline risks like layout shifts (CLS), accessibility failures, or paint bottlenecks, and detail how they are prevented.
7. Suggest unit testing cases using Jest/React Testing Library.
```

### [UI] Convert Design to Code
```markdown
Act as a Creative Frontend Engineer. Convert the following UI design description and specs into pixel-perfect, interactive code using [TECH_STACK] and [CSS_LIBRARY]:

Design Spec: [PASTE_DESIGN_SPEC]

Requirements:
1. Build the complete page or component with precise layouts, paddings, colors, fonts, shadows, and spacing.
2. Ensure interactive states are fully implemented (hover transitions, clicks, inputs, validation visual feedback).
3. Ensure responsiveness across mobile (375px), tablet (768px), and desktop (1440px) screen widths.
4. Explain how you translated structural layouts (e.g., grid vs flexbox) and color/typography tokens.
5. Identify design edge cases (e.g., extremely long text overflowing, images loading slowly, zoom factors) and how they are handled.
6. Suggest micro-interactions or animations to improve the premium feel of the interface.
```

### [UI] Responsive Layout
```markdown
Act as a Staff CSS Architect. Refactor the following non-responsive or poorly responsive code: [PASTE_CODE] into a modern, fluid, responsive layout using [TECH_STACK] and [CSS_METHOD].

Requirements:
1. The layout must handle mobile, tablet, desktop, and ultra-wide screens perfectly.
2. Use modern CSS capabilities like container queries, clamp(), CSS Grid, and custom properties for fluid typography/spacing.
3. Eliminate any layout shifts (CLS) and horizontal scrolling bugs.
4. Explain the responsive design system and breakpoints utilized in the refactored code.
5. Identify potential cross-browser rendering quirks (e.g., Safari iOS 100vh bug, grid inconsistencies) and write fallbacks.
6. Suggest performance improvements regarding layout painting and DOM complexity.
```

### [UI] Improve UX
```markdown
Act as a Senior UX Architect. Analyze the following component/user flow code: [PASTE_CODE] and rewrite it to significantly improve the User Experience (UX), perceived performance, and visual feedback.

Your refactored code must incorporate:
1. Micro-animations and transitions to guide user attention and feel snappy.
2. Optimistic UI updates, skeleton screens, clear loading/disabled states, and context-aware error boundaries.
3. Prevention of double-submitting forms and user input validation in real-time.
4. Clear feedback on success, warning, and failure states.
5. Explain the UX principles (e.g., Fitts's Law, Jacob's Law, Hick's Law) applied in your refactoring.
6. Identify accessibility, localization, or usability risks, and explain your solutions.
7. Suggest metrics (e.g., Task Completion Rate, Time on Task) to track to validate UX improvements.
```

### [UI] Accessibility Review
```markdown
Act as a Certified Accessibility Specialist. Audit and rewrite the following code: [PASTE_CODE] to achieve full compliance with WCAG 2.2 AA (and AAA where applicable) guidelines in [TECH_STACK].

Your rewrite must resolve:
1. Missing semantic elements, incorrect ARIA attributes, and lack of screen reader announcements.
2. Missing focus indicators, incorrect tab order, and lack of keyboard navigation controls.
3. Color contrast issues, screen reader-only text, and dynamic updates notification (using `aria-live`).
4. Explain every accessibility issue identified in the original code and how your changes fix it.
5. Identify potential risks of over-engineering ARIA and explain why your semantic approach is safer.
6. Suggest testing methods using screen readers (e.g., VoiceOver, NVDA) or automated tools (e.g., axe-core).
```

## 5. Debugging Prompts

### [Debug] Error Debug
```markdown
Act as a Principal Debugging Engineer. Resolve the following error:

Error Message: [ERROR_MESSAGE]
Error Stack Trace: [STACK_TRACE]
Relevant Code: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Your solution must include:
1. Detailed root cause analysis explaining exactly why and under what conditions this error occurs.
2. Production-grade, refactored code that fixes the bug and prevents similar errors.
3. Defensive coding patterns (e.g., null checks, try-catch blocks, fallback values) to make the code resilient.
4. Explain the trade-offs of your fix compared to alternative quick-fixes.
5. Identify adjacent functions or components that might be impacted by this bug or its fix.
6. Suggest a unit test case that replicates the bug and validates the solution.
```

### [Debug] Logic Bug Hunt
```markdown
Act as a Senior QA Analyst and Staff Engineer. Investigate the logical bug in the following code block:

Expected Behavior: [EXPECTED_BEHAVIOR]
Actual Behavior: [ACTUAL_BEHAVIOR]
Code Block: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Your response must include:
1. Trace of the code execution showing exactly where the logic diverges from the expected behavior.
2. Clean, refactored, and commented code fixing the logical flaw.
3. Identification of edge cases (e.g., boundary inputs, empty arrays, null values, rapid state updates) where this logic could break.
4. Explanation of code readability and design pattern improvements made to prevent future logic bugs.
5. Suggest linting rules or static analysis configurations that could catch this error automatically.
```

### [Debug] Performance Issue
```markdown
Act as a Lead Performance Engineer. Analyze and resolve the performance bottleneck in the following code snippet:

Symptom: [SYMPTOM] (e.g., slow response time, UI freezes, high CPU utilization)
Code Snippet: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Your solution must include:
1. Quantitative profiling hypothesis explaining the complexity (Big O time/space) of the current code.
2. Optimized, production-ready refactored code that resolves the bottleneck.
3. Demonstrations of optimizations (e.g., algorithm replacement, memoization, batching, lazy loading, debouncing).
4. Detailed explanation of the trade-offs of the optimized code (e.g., code readability vs raw performance).
5. Risks associated with the change (e.g., concurrency issues, stale caches, memory consumption changes).
6. Instructions on how to measure and verify the performance improvement in production.
```

### [Debug] API Failure Investigation
```markdown
Act as a Senior DevOps and Backend Engineer. Debug the API failure based on the following integration context:

Endpoint URI: [API_NAME]
Request Details: [REQUEST_DETAILS]
Response/Error: [RESPONSE_ERROR]
Integration Code: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Your response must include:
1. Root cause analysis (e.g., CORS, network timeout, payload format mismatch, authentication expiration, rate limits).
2. Refactored integration code containing robust network resilience patterns (e.g., exponential backoff retries, circuit breakers, timeout limits).
3. Proper error handling, user notifications, and telemetry logging for API failures.
4. Explanation of decisions regarding HTTP clients, headers, and payload serialization.
5. Identification of risks when the third-party API is down completely and how to implement a graceful fallback.
```

### [Debug] Memory Leak Detection
```markdown
Act as an Infrastructure & Core Platform Engineer. Investigate the memory leak described below:

Environment: [TECH_STACK] (e.g., Node.js backend, React frontend)
Leak Symptoms: [MEM_LEAK_SYMPTOMS] (e.g., heap size continuously growing, out-of-memory crashes)
Suspected Code: [PASTE_CODE]

Your solution must include:
1. Identification of the leak source (e.g., unclosed database connections, dangling event listeners, global variables, closure captures).
2. Refactored, leak-free code that properly cleans up resources (using destructors, clean-up hooks, correct scope lifetimes).
3. Explanation of how garbage collection works in [TECH_STACK] and how this code interacts with it.
4. Diagnostic steps using developer tools (e.g., Chrome DevTools Heap Snapshot, Node.js inspector) to verify the leak is resolved.
5. Suggestions for setting up automated regression tests or alerts for memory consumption anomalies.
```

## 6. Refactoring Prompts

### [Refactor] Clean Up Code
```markdown
Act as a Senior Refactoring Advocate. Clean up the following legacy, messy code:

Code Block: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Requirements:
1. Simplify complex structures, eliminate duplication (DRY), reduce cognitive complexity, and improve variable/function naming.
2. Split large functions into single-responsibility, testable units.
3. Retain the exact same external API and functional behavior (no regressions).
4. Add clean, JSDoc/Docstring comments for non-obvious code paths.
5. Explain the refactoring principles (e.g., SOLID, Clean Code guidelines) applied in this rewrite.
6. Identify any latent edge cases or bugs uncovered during refactoring.
7. Provide a testing strategy to verify functional equivalence.
```

### [Refactor] Extract Reusable Logic
```markdown
Act as a Principal Software Engineer. Extract the inline logic from the following component/function:

Target Code: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Requirements:
1. Extract the logic into a reusable hook, helper function, or modular class (e.g., React custom hook, utility class).
2. Write the complete, production-ready code for both the extracted helper and the refactored target code calling it.
3. Provide full type definitions and proper abstraction boundaries.
4. Explain why this extraction method was chosen and how it improves code reusability.
5. Outline risks associated with state sync or performance impacts due to the extraction.
6. Detail unit tests for the extracted helper.
```

### [Refactor] Add Type Safety
```markdown
Act as a Lead TypeScript Engineer. Add strict type safety to the following untyped or poorly-typed code:

Code Block: [PASTE_CODE]
Target Environment: [TECH_STACK]

Your refactoring must:
1. Replace `any` or loose types with precise interfaces, types, generics, and union types.
2. Use TypeScript advanced features (e.g., utility types, type guards, discriminated unions) where appropriate.
3. Ensure compile-time validation is strictly enforced with no compiler warnings.
4. Explain your choices of types, generics, and interface structures.
5. Identify runtime data risks (e.g., API payloads not matching compile-time types) and add validation strategies (e.g., Zod schemas, type assertions).
6. Suggest build and configuration changes (tsconfig.json flags) to enforce type safety.
```

### [Refactor] Improve Folder Structure
```markdown
Act as a Senior Architect. Refactor the folder structure of the following codebase module to improve scalability and maintainability:

Current Layout: [PASTE_FOLDER_LAYOUT]
Tech Stack: [TECH_STACK]

Your plan must include:
1. New folder layout (using clear tree visualization) following modern architecture (e.g., feature-based, monorepo, clean architecture).
2. Relocation guide specifying which files move where, and how import paths must change.
3. Code example of a refactored entry-point file showing clean relative imports.
4. Rationale for this reorganization, detailing how it helps multi-developer teams work in parallel.
5. Risk assessment of breaking import paths, circular dependency issues, and build configuration issues.
6. Suggest tools (e.g., dependency cruisers, ESLint import rules) to prevent import pollution.
```

### [Refactor] Modernize Legacy Code
```markdown
Act as a Staff Software Engineer. Modernize the following legacy code snippet to use modern language features and APIs:

Legacy Code: [PASTE_CODE]
Tech Stack: [TECH_STACK] (e.g., ES5 to ES6+, callbacks to async/await, class components to hooks)

Requirements:
1. Rewrite the code using the latest language standards, syntaxes (e.g., destructuring, spread, modules), and standard libraries.
2. Improve performance, memory footprint, and exception handling during modernization.
3. Ensure complete compatibility with modern runtimes and dependency versions.
4. Explain the advantages of the modernized patterns over the legacy implementation.
5. Identify backward-compatibility risks, deprecation issues, and potential edge-case regressions.
6. Provide a verification plan to guarantee behavior consistency.
```

## 7. Code Review Prompts

### [Review] Security Review
```markdown
Act as a Senior AppSec Engineer. Perform a comprehensive security review on the following codebase:

Code Block: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Your security report must include:
1. Identification of security vulnerabilities matching OWASP Top 10 (e.g., SQL injection, XSS, CSRF, IDOR, sensitive data exposure, broken auth).
2. Severity rating for each vulnerability (Low, Medium, High, Critical) using CVSS criteria.
3. Corrected, secure refactored code that eliminates each vulnerability.
4. Explanations of why the original code was vulnerable and how the secure version mitigates the risk.
5. Recommendations for automated security scanning tools (SAST/DAST) in the CI/CD pipeline.
```

### [Review] Edge Case Hunt
```markdown
Act as a Principal QA Engineer and Edge Case Specialist. Conduct an exhaustive code review of the following code to identify hidden edge cases, logic flaws, and operational risks:

Code Block: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Your review must cover:
1. Edge cases related to data boundaries (e.g., integer overflows, empty inputs, nulls, array index bounds).
2. Concurrency edge cases (e.g., race conditions, thread safety, database locking, state updates out of order).
3. Environmental edge cases (e.g., network failure, timeouts, disk space exhaustion, system clock drift).
4. Rewritten code with robust validations, error checking, and recovery flows to handle all identified edge cases.
5. Detailed explanations of why these edge cases occur and how the fixes resolve them.
6. Test cases (unit/integration) explicitly targetting these edge-case scenarios.
```

### [Review] Write Tests
```markdown
Act as a Senior Software Engineer in Test (SDET). Write a comprehensive, production-grade test suite for the following code:

Source Code: [PASTE_CODE]
Tech Stack & Test Framework: [TECH_STACK] (e.g., Jest, PyTest, Mocha, Go Test)

Your test code must include:
1. Complete test files with imports, setups, mocks (for databases or external APIs), assertions, and teardowns. No placeholders.
2. High test coverage covering happy paths, error states, invalid input validations, and complex edge cases.
3. Clear, descriptive test names explaining what is being tested and the expected outcome.
4. Explanation of your mocking strategy and assertion choices.
5. Identification of parts of the source code that were hard to test and recommendations to make the source code more testable.
```

### [Review] Best Practices Audit
```markdown
Act as an Engineering Lead. Perform a strict, production-grade Best Practices Audit on the following code snippet:

Code Snippet: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Provide:
1. Detailed code review feedback highlighting violations of industry standards (e.g., naming conventions, code duplication, too many parameters, coupling, violation of SOLID).
2. A completely refactored version of the code that implements all best practices.
3. Line-by-line justification of the changes made and how they improve code quality.
4. Risks or effort levels associated with refactoring legacy systems to match these standards.
5. ESLint, Prettier, or static analysis rules to automatically catch these violations.
```

### [Review] Performance Review
```markdown
Act as a Principal Platform Performance Architect. Review the following code for performance bottlenecks:

Code Block: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Your performance review must evaluate:
1. Time and Space complexity (Big O) of algorithms, identifying CPU-bound and memory-bound operations.
2. Database call efficiency (e.g., N+1 query problem, unindexed joins, large payloads).
3. Network and IO blocking (e.g., lack of concurrency, missing connections reuse).
4. A fully optimized, refactored version of the code implementing your performance suggestions.
5. Technical explanation of why the optimized code is faster and how it behaves under load.
6. Suggestions for performance regression tests to run in staging or CI.
```

## 8. Testing & QA Prompts

### [Test] Unit Test Generation
```markdown
Act as a Senior Test Engineer. Generate a comprehensive unit test file for the following class/function:

Target Code: [PASTE_CODE]
Tech Stack & Test Runner: [TECH_STACK] (e.g., Jest, JUnit, PyTest)

The unit test file must:
1. Mock all external dependencies (e.g., file system, database, HTTP clients) to ensure the test is fully isolated.
2. Test boundaries, null values, invalid parameters, and extreme inputs, verifying expected exceptions are thrown.
3. Aim for 100% branch and statement coverage.
4. Explain the test structure and the mock design pattern used.
5. Identify potential risks of fragile tests (e.g., over-mocking implementation details) and how to avoid them.
```

### [Test] Integration Testing
```markdown
Act as a Senior SDET. Create a production-ready integration test suite to verify the interaction between [COMPONENT_A] and [COMPONENT_B] in [PROJECT_NAME] using [TECH_STACK].

Integration Test Requirements:
1. Set up a testing environment state (e.g., test database transactions, in-memory caches).
2. Simulate a complete, multi-step flow of data from Component A to Component B and verify results in the database or response.
3. Handle data cleanup/teardown between tests to prevent test pollution.
4. Include complete imports, setups, and assertions in the code block.
5. Explain your integration testing strategy and how it handles external system dependencies safely.
6. Outline risks like test flakes, slow runs, or environmental changes, and suggest mitigations.
```

### [Test] E2E Testing
```markdown
Act as a Lead E2E Test Architect. Write a production-grade E2E test script using [TESTING_TOOL] (e.g., Playwright, Cypress) for the following user flow:

User Flow Description: [USER_FLOW_DESCRIPTION]
Tech Stack: [TECH_STACK]

Requirements:
1. Generate the complete test code using standard selectors, handling dynamic loading, animations, network waits, and redirects.
2. Test for error screens, successful form submissions, session storage, and cookie updates.
3. Implement page object models (POM) if applicable to ensure test clean-up and reusability.
4. Explain selector choices (e.g., test-ids vs text content) and wait strategies to prevent test flakiness.
5. Analyze potential failure points in E2E runs (e.g., slow third-party elements) and suggest handling.
6. Provide instructions for running tests headlessly and generating visual report artifacts.
```

### [Test] Test Case Creation
```markdown
Act as a Lead QA Analyst. Design a detailed, production-grade manual test suite for [FEATURE_NAME] in [PROJECT_NAME].

The test suite must contain a Markdown table with:
1. Test Case ID, Description, Pre-conditions, Step-by-Step Execution Steps, Expected Result, and Actual Result template.
2. Coverage of happy paths, validation errors, localized formats, permission roles, and edge-cases.
3. Explicit instructions on test data requirements.
4. Rationale for selecting these test cases and priority categorization.
5. Risks of missed regressions and how to automate these tests in subsequent sprints.
```

### [Test] Regression Testing
```markdown
Act as a Staff Quality Engineer. Create a regression testing plan and code suite to prevent future regressions after fixing the following critical bug:

Bug Context: [BUG_CONTEXT]
Fix Implemented: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Your response must include:
1. Analysis of what dependencies, modules, or features are at risk of breaking due to this fix.
2. Automated regression tests that cover the exact bug scenario and its collateral zones.
3. Guidelines for executing these tests automatically before release gates.
4. Explanation of your regression test coverage boundaries.
5. Risks of duplicate tests, test fatigue, and advice on pruning old test suites.
```

## 9. Deployment & DevOps Prompts

### [Deploy] Dockerfile Generator
```markdown
Act as a Senior DevOps Engineer. Create a production-ready, secure, and highly optimized Dockerfile and `.dockerignore` for [PROJECT_NAME] built with [TECH_STACK].

Your Dockerfile must implement:
1. Multi-stage builds to minimize the final image size and reduce attack surface.
2. Running the container as a non-root user for security.
3. Proper caching of dependencies (e.g., package.json copy before code copy) to optimize build times.
4. Correct environment variables, entrypoint/cmd definitions, port exposures, and health checks.
5. Explain the purpose of each build stage and caching optimization.
6. Identify security risks (e.g., secret leakage, outdated base images) and how your setup mitigates them.
7. Suggest improvements like Alpine base images vs distroless images.
```

### [Deploy] CI/CD Pipeline
```markdown
Act as a Lead Site Reliability Engineer. Build a production-grade CI/CD pipeline configuration file (e.g., GitHub Actions, GitLab CI) for [PROJECT_NAME] using [TECH_STACK] and deploying to [CLOUD_PROVIDER].

The pipeline must include steps for:
1. Code linting, formatting, and static analysis (SAST) runs.
2. Running unit, integration, and E2E test suites with artifact reporting.
3. Build compilation and Docker image creation/pushing to a registry (e.g., ECR, GCR).
4. Safe deployment strategies (e.g., rolling update, blue-green, canary) with rollbacks on failure.
5. Proper environment configuration, secret management, and cache key generation.
6. Explain the trigger events, concurrency control, and job dependencies in the pipeline.
7. Identify deployment failure risks and how automatic rollbacks are triggered.
```

### [Deploy] Environment Setup
```markdown
Act as a Principal Infrastructure Engineer. Write a production-grade Infrastructure as Code (IaC) configuration (e.g., Terraform, CloudFormation, Docker Compose) to spin up the infrastructure for [PROJECT_NAME] using [TECH_STACK].

The code must define:
1. Compute services (e.g., ECS, K8s, EC2, Cloud Run).
2. Managed database services (e.g., RDS PostgreSQL, Atlas MongoDB) with replica sets, encryption at rest, and backup configs.
3. Networking components (VPCs, private/public subnets, security groups, route tables, load balancers).
4. IAM roles, policies, and environment secret injection configurations.
5. Explain your infrastructure topology and security choices.
6. Identify scale bounds, high availability (HA) configuration, and disaster recovery (DR) plans.
7. Suggest cost-saving strategies (e.g., auto-scaling policies, spot instances).
```

### [Deploy] Monitoring Setup
```markdown
Act as an SRE and Observability Lead. Set up a comprehensive monitoring and logging configuration for [PROJECT_NAME] using [TECH_STACK] and [MONITORING_TOOL] (e.g., Datadog, Prometheus/Grafana, ELK Stack).

Provide:
1. Configuration code or JSON templates for dashboards tracking Golden Signals (Latency, Traffic, Errors, Saturation).
2. Logging format specifications (e.g., JSON logs) and aggregation rules.
3. Alert threshold rules (e.g., alerting when error rate exceeds 1% over 5 minutes) with severity levels.
4. Custom instrumentation code (e.g., middleware, tracers) to emit key performance metrics.
5. Explain the logic behind your alert thresholds and logging format.
6. Identify noise reduction strategies to prevent alert fatigue.
```

### [Deploy] Production Readiness Review
```markdown
Act as a Principal DevOps Architect. Conduct a comprehensive Production Readiness Review (PRR) checklist for launching [PROJECT_NAME] built with [TECH_STACK] on [CLOUD_PROVIDER].

Your review must generate an action plan covering:
1. Infrastructure & Scaling (load balancing, auto-scaling, replication, CDN).
2. Security & Compliance (encryption in transit/at rest, pen tests, IAM hygiene, vulnerability patches).
3. Reliability & Fallbacks (backups, DR, rate limiting, connection timeouts).
4. Observability (logging, metrics, traces, on-call alert routing).
5. Deployment & Release controls (rollback scripts, feature flags, smoke tests).
6. Explanations of critical checklist items and why they cannot be bypassed.
7. Risks of scaling too fast or facing DDoS attacks, with immediate mitigations.
```

## 10. Documentation Prompts

### [Docs] README Generator
```markdown
Act as a Senior Technical Writer and Product Engineer. Write a comprehensive, production-grade `README.md` for [PROJECT_NAME] built with [TECH_STACK].

The README must include:
1. Clear project description, core features, and system architecture overview.
2. Clear system prerequisites and step-by-step local development setup instructions.
3. Instructions on running development servers, linters, tests, builds, and docker containers.
4. Detailed environment variable reference with descriptions.
5. API endpoints summary or links to API documentation.
6. Deployment guidelines and contribution guidelines.
7. Explain the styling and typography choices in the documentation layout.
8. Identify common developer onboarding issues and add a Troubleshooting section to solve them.
```

### [Docs] API Documentation
```markdown
Act as an API Architect and Technical Writer. Generate a comprehensive API documentation file (in OpenAPI 3.0 YAML or Markdown format) for [API_NAME] in [PROJECT_NAME] using [TECH_STACK].

The documentation must include:
1. Base URL, paths, and HTTP methods.
2. Headers, path parameters, query parameters, and request body schema (with TypeScript types or JSON validation schemas).
3. Complete response payloads for all status codes (e.g., 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 429 Too Many Requests, 500 Server Error).
4. Security schemas (e.g., Bearer Token, OAuth2 scopes).
5. Explain the data types, formats, and design decisions behind the API contract.
6. Identify edge cases (e.g., rate limits, partial updates) and detail how the client should handle them.
```

### [Docs] Technical Documentation
```markdown
Act as a Staff Systems Architect. Write an in-depth system architecture and technical design document (TDD) for [PROJECT_NAME] utilizing [TECH_STACK].

The TDD must contain:
1. System context and high-level architectural diagram (in Mermaid.js syntax).
2. Component descriptions (backend APIs, frontend portals, background queues, cache, DBs).
3. Complete database schema definitions and data relationships description.
4. Key sequence flows (e.g., user signup, asynchronous processing) illustrated with Mermaid.js sequence diagrams.
5. Rationale for primary technical decisions (databases, frameworks, third-party integrations).
6. Security topology, data flow constraints, and performance scale models.
7. Suggest operational guides for disaster recovery and system maintenance.
```

### [Docs] Onboarding Guide
```markdown
Act as an Engineering Lead. Write an onboarding and development setup guide for new developers joining the [PROJECT_NAME] team using [TECH_STACK].

The guide must include:
1. Prerequisites list (installing package managers, DB engines, CLIs, Git credentials).
2. Cloning, local configurations setup, seed data generation, and IDE configurations (e.g., VS Code extension recommendations).
3. Explanation of code layout, key architectural design patterns, and branch naming/pull request conventions.
4. Instructions on how to test, build, lint, and run the app.
5. Explanations of core coding philosophies and developer SLAs.
6. Common pitfalls new developers face when installing dependencies or running the server, and their solutions.
```

### [Docs] Changelog Generator
```markdown
Act as a Product Engineer. Generate a production-grade `CHANGELOG.md` file summarizing the changes in [PROJECT_NAME] for version [VERSION_NUMBER].

Base your changelog on the following git commit messages/PR descriptions:
[GIT_COMMITS_OR_PR_DESCRIPTIONS]

Requirements:
1. Organize changes into standard categories: Added, Changed, Deprecated, Removed, Fixed, Security.
2. Provide clear, user-friendly summaries of the changes rather than raw commit messages.
3. Highlight breaking changes clearly at the top with migration instructions.
4. Reference issue numbers or PR IDs if available.
5. Explain the business value or technical necessity of key changes.
6. Identify any deployment risks associated with upgrading to this version.
```

## 11. AI & Automation Prompts

### [AI] AI Feature Planning
```markdown
Act as a Senior AI Product Engineer. Plan the integration of an AI-powered [AI_FEATURE_NAME] into [PROJECT_NAME] built with [TECH_STACK].

The plan must include:
1. Architecture diagram (Mermaid.js) showing the flow between frontend, backend, AI API gateway, and LLM providers.
2. Detailed prompt design strategy, token optimization plan, and context pruning mechanism.
3. Fallback strategy when LLM APIs are slow, error out, or exceed rate limits.
4. Cost estimation models based on projected token consumption.
5. Explanations of your choices of model (e.g., GPT-4o, Claude 3.5 Sonnet, local Llama) and orchestration frameworks (e.g., LangChain, raw SDKs).
6. Identification of risks related to prompt injection, data leakage, and hallucinations, and how to mitigate them.
```

### [AI] OpenAI Integration
```markdown
Act as a Senior AI Software Engineer. Write complete, production-ready backend code to integrate the OpenAI API in [PROJECT_NAME] using [TECH_STACK].

Requirements:
1. Set up the OpenAI client with correct configurations, API key loading, and connection timeouts.
2. Implement a call to the Chat Completions endpoint using Structured Outputs (JSON Schema/Tool calling) to guarantee the output format.
3. Implement robust error handling (e.g., API errors, network issues, timeout errors) and rate-limit handling (e.g., retry with jitter).
4. Provide the exact typescript/JSON interfaces for input and output schemas.
5. Explain your choice of parameters (e.g., temperature, max_tokens, presence_penalty) and their effects.
6. Analyze data privacy risks (e.g., user data sent to third-party APIs) and how to handle them (e.g., scrubbing PII).
```

### [AI] AI Agent Design
```markdown
Act as a Staff AI Architect. Design a production-grade AI Agent system to perform [AGENT_TASK] for [PROJECT_NAME] using [TECH_STACK].

Your design must include:
1. The agent's core loop (ReAct, Plan-and-Execute, or State Graph) described via Mermaid.js.
2. Detailed specifications for tools (APIs, DB accessors) the agent can execute, including input/output schemas.
3. The agent's system prompt containing instructions, constraints, and error recovery protocols.
4. Memory architecture (short-term state, long-term vector DB retrieval) and state management.
5. Explanations of why you chose this agent architecture and tool boundaries.
6. Identification of agent failure modes (e.g., loops, bad tools execution, context window exhaustion) and mitigations.
7. Verification tests to evaluate agent accuracy and safety before deployment.
```

### [AI] Workflow Automation
```markdown
Act as a Principal Automation Engineer. Create a production-ready automated workflow script/configuration to solve [AUTOMATION_TASK] for [PROJECT_NAME] using [TECH_STACK].

The script must:
1. Automate the multi-step process (e.g., parsing files, calling APIs, sending notifications, executing shell commands).
2. Include robust logging, error handling, rollback steps on failure, and environment configuration.
3. Be written inside a complete, runnable script file.
4. Explain how this script simplifies operational overhead and saves developer hours.
5. Identify security risks (e.g., hardcoded credentials, command injection) and implement strict safeguards.
6. Suggest scheduling configurations (e.g., cron jobs, webhook listeners) to trigger the workflow.
```

### [AI] Prompt Optimization
```markdown
Act as a World-Class Prompt Engineer. Optimize the following prompt to achieve high accuracy, structured output, and minimal token usage:

Original Prompt: [ORIGINAL_PROMPT]
Target Task: [TASK_DESCRIPTION]
Target LLM: [LLM_NAME] (e.g., Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro)

Your optimized output must include:
1. Optimized Prompt utilizing advanced prompt engineering techniques (e.g., XML tags, few-shot examples, chain-of-thought, clear constraints, system vs user separation).
2. Structured output parsing instructions (e.g., JSON schemas).
3. Quantitative breakdown of the optimization techniques applied and why they work.
4. Rationale explaining how the prompt minimizes token usage while preserving output quality.
5. Risk analysis identifying potential failure cases, prompt injections, or edge-case deviations, and how the prompt defends against them.
```

## 12. Performance & Scaling Prompts

### [Performance] Database Optimization
```markdown
Act as a Principal Database Engineer. Diagnose and optimize the following slow database query:

Slow Query: [SLOW_QUERY]
Database Type: [DATABASE_TYPE]
Explain Analyze/Query Plan Output: [EXPLAIN_PLAN_OUTPUT]

Your response must include:
1. Root cause analysis explaining exactly why the query is slow (e.g., seq scan, index scan on wrong columns, lock contention, temporary disk writes).
2. Optimized SQL query or ORM code.
3. Required changes to the schema (e.g., creating indexes, composite indexes, rewriting joins, table partitioning).
4. Explanation of database indexing mechanics (e.g., B-Tree traversal, index selectivity) relevant to this case.
5. Analysis of indexing trade-offs (e.g., write overhead, storage costs).
6. Verification plan to measure and compare performance before and after the change.
```

### [Performance] Frontend Optimization
```markdown
Act as a Senior Frontend Performance Architect. Optimize the web vitals (LCP, FID, CLS, INP) and bundle size of the following frontend application:

Performance Report: [PERFORMANCE_REPORT] (e.g., Lighthouse scores, bundle analyzer output)
Relevant Code/Config: [PASTE_CODE]
Tech Stack: [TECH_STACK]

Your optimization plan must include:
1. Optimized refactoring of configuration (e.g., Webpack/Vite config, bundle splitting rules) and code.
2. Implementation of modern frontend performance techniques (e.g., dynamic imports, image optimization, code virtualization, component memoization).
3. Specific code improvements to eliminate layout shifts and minimize main thread blocking.
4. Technical explanation of how each change impacts browser rendering performance.
5. Risks of optimization regressions (e.g., split chunk bugs, state issues) and how to avoid them.
6. Testing script to measure load times and performance impact in staging.
```

### [Performance] Backend Scaling
```markdown
Act as a Principal Systems Engineer. Design a scaling plan for a backend service handling [API_NAME] which experiences high CPU/RAM load under concurrent traffic [TRAFFIC_SPEC].

Tech Stack: [TECH_STACK]
Current Code: [PASTE_CODE]

Your plan must include:
1. Refactoring of the code to use non-blocking asynchronous operations, worker threads, or connection pooling.
2. Load balancing, horizontal scaling, and container configuration suggestions.
3. Horizontal scaling architecture diagram (Mermaid.js syntax).
4. Detailed analysis of CPU/Memory profiles and why the current implementation bottlenecks.
5. Identification of synchronization hazards (e.g., deadlocks, shared state race conditions) and their solutions.
6. Load testing configuration (e.g., k6 script) to validate the service performance under load.
7. Cost-capacity trade-off analysis.
```

### [Performance] Caching Strategy
```markdown
Act as a Staff Infrastructure Architect. Design a production-grade caching layer for [PROJECT_NAME] using [TECH_STACK] and [CACHING_TOOL] (e.g., Redis, Memcached, CDN).

Your design must include:
1. Cache topology and connection configurations.
2. Caching implementation code (middleware, wrapper decorators) for read-through, write-through, or cache-aside strategies.
3. Concrete Cache Invalidation strategies (e.g., time-to-live (TTL), versioning, pub/sub invalidation, write-through hooks) for dynamic data.
4. Key naming conventions and namespace management.
5. Explanation of cache eviction policies (e.g., LFU, LRU) and connection resilience logic (e.g., fallback to DB on cache fail).
6. Analysis of risks such as cache stampede, cache penetration, stale data presentation, and their mitigations.
```

### [Performance] System Design Review
```markdown
Act as a Staff Systems Architect. Review the following high-level system architecture design for performance and scaling vulnerabilities:

System Design Description: [SYSTEM_DESIGN_DESCRIPTION]
Tech Stack: [TECH_STACK]
Target Scale: [TARGET_SCALE]

Provide:
1. Deep-dive evaluation of systemic bottlenecks, single points of failure (SPOFs), database latency issues, and networking limits.
2. Mermaid.js architecture diagram showing the redesigned, high-performance architecture.
3. Detailed, actionable list of modifications (e.g., message queues introduction, microservice split, database replica setups).
4. Rationale explaining why these architectural adjustments are required to support the target scale.
5. Cost estimation impact of the scaling changes and alternative low-cost plans.
6. Risk analysis of migrating the live production system to this new design.
```
