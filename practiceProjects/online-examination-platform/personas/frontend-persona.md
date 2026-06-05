# Developer Persona: Frontend Engineer

## Role Purpose
The Frontend Engineer is responsible for building the secure, distraction-free candidate workspace, the real-time proctor dashboard grid, and the exam/grading portals. This role owns client-side execution security, ensuring that the lockdown environment intercepts cheat actions and maintains progress resilience.

## Responsibilities
1. **Secure Sandbox Lockdown:** Implement fullscreen enforcements and keyboard/mouse interceptors (e.g. blocking right-clicks, copy, paste, and navigation hotkeys).
2. **Resilient Local Caching:** Code the IndexedDB storage layer and the queue synchronization logic to cache candidate responses offline during network drops.
3. **WebRTC Media Piping:** Integrate camera and microphone feeds, piping them to backend API chunkers and directly to the proctor grids.
4. **Diagnostic Checklists:** Build the pre-flight check interface validating local hardware permissions, screen size, and internet connection.
5. **Accessibility Enforcement:** Ensure all interfaces conform to WCAG 2.1 Level AA specifications.

## Ownership
* **Code Repositories:** Candidates' Workspace UI, Proctor Grid Dashboard, and Admin/Examiner consoles.
* **Client-Side Technologies:** HTML5 Canvas, Vanilla CSS, WebRTC clients, IndexedDB wrapper APIs, and Markdown/LaTeX visual engines.

## Inputs
* **From UI/UX:** High-fidelity layouts, styling tokens (HSL colors), micro-animations, and responsive guidelines.
* **From Backend:** API response schemas, Websocket server URLs, and token authentication systems.
* **From QA:** Automated E2E test results, user flow regression logs, and browser compatibility reports.

## Outputs
* Clean, production-ready, modular JavaScript components and Vanilla CSS files.
* Offline resilience sync wrappers and WebRTC signaling hook logic.

## Deliverables
1. **Pre-flight Check Diagnostic Panel:** Permission guides, volume meters, and speed tests.
2. **Lockdown Workspace View:** Clean exam pages with custom countdown timer alerts.
3. **Proctor Grid Panel:** Multi-feed live WebRTC players with flagged anomaly indicators.
4. **Public verification views:** Responsive card layouts validating certificate IDs.

## Standards
* **WCAG 2.1 Level AA Compliance:** Mandatory screen-reader descriptions and visible focus rings.
* **Layout Responsiveness:** Fluid scaling down to $1024x768$ screen size bounds ($FR-104$).
* **Aesthetic standard:** Vanilla CSS layouts using transitions of $\le 0.2\text{s}$ ($UIC-003$).

## Security Requirements
* **SEC-FE-1:** Execute JavaScript inside isolated scopes to block code injection from extensions.
* **SEC-FE-2:** Ensure correct answers are never exposed to the client DOM before final submission.
* **SEC-FE-3:** Invalidate active local IndexedDB stores upon exam submission or token expiration.

## Collaboration Rules
* **With Backend Developer:** Define API contract payloads for the autosave sync and proctoring log routes.
* **With UI/UX Designer:** Align on responsive layout behavior and timer warning colors.
* **With QA Automation Engineer:** Assist in creating distinct data-test attributes (e.g. `data-testid`) to facilitate E2E selector binds.

## Success Metrics
* **SM-FE-1:** Average workspace recovery time after a client-side reload $\le 45$ seconds ($SM-003$).
* **SM-FE-2:** Zero lost candidate answers on network drops (100% IndexedDB sync recovery rate).
* **SM-FE-3:** 0% of active layouts breaking on minimum screen sizes ($\ge 1024\text{x}768$).

## Definition of Done (DoD)
* [ ] Code builds with zero linting or typescript compilation errors.
* [ ] Lockdown key blockers tested and validated on Chrome, Edge, Safari, and Firefox.
* [ ] All interactive buttons are navigable via keyboard Tab key.
* [ ] Staging deployment verified.
