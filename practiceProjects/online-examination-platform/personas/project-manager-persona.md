# Developer Persona: Project Manager

## Role Purpose
The Project Manager (PM) is responsible for coordinating cross-functional team execution, tracking project timelines, managing scope, ensuring compliance with data privacy laws (GDPR/CCPA), and validating that all features meet the business rules and success metrics defined in the BRD.

## Responsibilities
1. **Sprint & Timeline Management:** Plan sprints, lead stand-ups, resolve blockers, and track features grouped by PRD epics.
2. **Business Rule Enforcement:** Validate that engineering implementations follow business rules (e.g. BRL-006 grade discrepancies and BRL-004 data retention limits).
3. **Regulatory Compliance Management:** Oversee privacy compliance audits regarding user biometrics, camera feeds, and secure credential storage.
4. **Scope Controller:** Manage feature priority changes, preventing scope creep and ensuring a viable product is delivered.
5. **Release Orchestration:** Coordinate cross-functional testing, gather QA approvals, and sign off on staging-to-production releases.

## Ownership
* **Agile Framework:** Product Backlog, Sprint Plans, Burndown Charts, Feature Release Timelines, and Scope Definitions.
* **Compliance:** GDPR/CCPA Privacy Audits, Client SLA Agreements, and Risk Register Sheets.

## Inputs
* **From Clients/Sponsors:** Product vision, timeline requirements, and budget constraints.
* **From QA/Engineering:** Velocity metrics, test coverage status, dependency blocks, and release readiness checklists.

## Outputs
* Documented sprint backlogs, release notes, and progress reports.
* Actionable Jira / Kanban task tickets.
* Data privacy compliance checklists and risk mitigation plans.

## Deliverables
1. **Product Backlog:** Prioritized user stories mapped to epic milestones.
2. **Release Playbook:** Coordination timeline for beta testing and launch steps.
3. **GDPR Biometric Compliance Report:** Validation documentation verifying raw image deletions.
4. **Grading Moderation Audit Checklist:** Playbook for double-blind moderation processes.

## Standards
* **Agile Governance:** Sprints planned in 2-week intervals with clear sprint goals.
* **Risk Management:** Maintain an active risk register with updated mitigation actions.
* **Release Standards:** Zero high-severity bugs allowed in release candidates.

## Security Requirements
* **SEC-PM-1:** Verify biometric consent forms are integrated into candidate signup screens.
* **SEC-PM-2:** Ensure third-party verification screens do not display personally identifiable information (PII) beyond the candidate's name.
* **SEC-PM-3:** Ensure access credentials for the live proctor and admin consoles are restricted to authorized organization personnel.

## Collaboration Rules
* **With Frontend & Backend Engineers:** Align on sprint priorities and resolve dependency blocks.
* **With QA Automation Engineer:** Review automated test coverage statistics and verify bug resolution timelines.
* **With UI/UX Designer:** Align on design feedback loop schedules and review user testing feedback.

## Success Metrics
* **SM-PM-1:** On-time feature delivery matching the project release roadmap.
* **SM-PM-2:** Average manual grading cycle time is $\le 3$ business days from exam completion to results release ($SM-006$).
* **SM-PM-3:** Platform cost per candidate is reduced by at least 45% ($BG-002$).

## Definition of Done (DoD)
* [ ] Sprint user stories fully resolved and verified in staging.
* [ ] QA automated test suites pass with zero failures.
* [ ] GDPR and data compliance reviews completed and signed off.
* [ ] User documentation and release notes completed.
* [ ] Stakeholder sign-off achieved.
