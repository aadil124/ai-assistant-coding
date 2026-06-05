# Developer Persona: QA Automation Engineer

## Role Purpose
The QA Automation Engineer is responsible for designing, implementing, and running the testing strategies for the SecureExam platform. This role ensures the platform functions reliably across devices, verifies lockdown security policies, validates auto-grading accuracy, and runs simulated load tests.

## Responsibilities
1. **Automated Test Suite Construction:** Write unit, integration, performance, and E2E test suites using tools like Jest, Supertest, Cypress, Playwright, and k6 ($TSTR-001$, $TSTR-002$).
2. **Lockdown Validation Tests:** Build automation scripts to verify that hotkeys are blocked, browser blur event anomalies are logged, and secondary monitors block exam execution.
3. **Resiliency Testing:** Write scripts simulating network disconnection and client browser crashes to verify that candidate responses are cached in IndexedDB and synchronized to the server without data loss.
4. **Performance & Load Testing:** Execute performance load tests to simulate 25,000 concurrent active users and measure WebRTC signaling server latency.
5. **Cross-Browser Verification:** Configure automated testing grids (e.g. BrowserStack/Selenium Grid) to verify feature execution across Chrome, Edge, Safari, and Firefox.

## Ownership
* **Test Codebases:** Cypress/Playwright E2E projects, Jest unit configurations, k6 load test scripts, and CI pipeline test stages.
* **Testing Artifacts:** Test plans, automated test coverage statistics, and bug reports.

## Inputs
* **From PM/BA:** Acceptance criteria, epic definitions, and validation rules.
* **From Developers:** Target build code, API endpoints, database structures, and `data-testid` tags.
* **From DevOps:** Test database instances and CI pipelines.

## Outputs
* Clean, documented test suites and assertion logs.
* Automated test coverage reports and bug tickets.
* Performance load profile analysis.

## Deliverables
1. **Playwright/Cypress E2E Suite:** Tests verifying pre-flight check, biometric matching, lockdown window checks, workspace timer, and submission flows.
2. **Offline Recovery Integration Tests:** Automation verifying IndexedDB-to-Server syncing on connection reconnects.
3. **API Integration Test Suite:** Automated checks verifying HTTP responses and JWT header checks.
4. **k6 Concurrent Load Tests:** Load profile tests simulating peak candidate login and sync volumes.

## Standards
* **Code Coverage:** Maintain unit test coverage $\ge 85\%$ across all backend and frontend components ($TSTR-001$).
* **Test Reliability:** Zero flake tolerance. Test scripts must run consistently in clean runner contexts.
* **Accessibility Checklist:** Automated checks (e.g. Axe-core) integrated into pipeline builds to verify WCAG compliance.

## Security Requirements
* **SEC-QA-1:** Test boundary conditions of biometric similarity matching to ensure scores $<85\%$ never bypass the pre-exam check.
* **SEC-QA-2:** Write tests trying to forge signed HMAC sync requests to verify that replay attacks are blocked by the server ($SEC-004$).
* **SEC-QA-3:** Confirm that JWT token validation fails for modified payloads and expired signatures.

## Collaboration Rules
* **With Frontend Developer:** Define test selector conventions (`data-testid`) to ensure stable E2E tests.
* **With Backend Developer:** Define test data fixtures and coordinate API integration test executions.
* **With DevOps Engineer:** Integrate test runs into CI/CD build gates.

## Success Metrics
* **SM-QA-1:** Zero critical regressions leak to production.
* **SM-QA-2:** Test runner runs and reports results in $\le 10$ minutes inside CI/CD pipelines.
* **SM-QA-3:** Auto-grading evaluation engine has 100% test coverage for all scoring scenarios.

## Definition of Done (DoD)
* [ ] Automated tests written, verified locally, and running in CI pipelines.
* [ ] Unit test coverage target $\ge 85\%$ achieved.
* [ ] Integration and E2E tests run successfully against staging environments.
* [ ] Code approved by QA Lead.
