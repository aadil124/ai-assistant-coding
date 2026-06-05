# Test Cases & Coverage Log (log.md)
## Project: Secure Online Examination Platform (SecureExam)
## Last Updated: 2026-06-05

---

## 1. Test Execution Summary Statistics

| Test Dimension | Frontend (Playwright) | Backend (Jest) | Combined Total |
| :--- | :---: | :---: | :---: |
| **Functional Tests** | 6 | 4 | 10 |
| **Validation Tests** | 3 | 4 | 7 |
| **Negative Tests** | 2 | 2 | 4 |
| **Edge Cases** | 4 | 4 | 8 |
| **Security Controls** | 2 | 7 | 9 |
| **API Integration** | 0 | 9 | 9 |
| **Database Operations** | 0 | 8 | 8 |
| **UI Verification** | 5 | 0 | 5 |
| **Accessibility (WCAG)** | 3 | 0 | 3 |
| **Integration/Flows** | 2 | 3 | 5 |
| **Total Test Cases** | **27** | **32** | **59** |

---

## 2. Feature-to-Test Mapping Matrix

| Feature ID | Feature Title | Test Case ID | Test Category | Requirement Map | AC Map | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **FEAT-001** | Assessment Authoring | [TC-FE-001-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/01-assessment-authoring-question-bank.spec.ts#L17) | Functional | FR-1.1, FR-1.2 | AC-101 | P0 |
| **FEAT-001** | | [TC-FE-001-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/01-assessment-authoring-question-bank.spec.ts#L43) | Validation | VAL-1.1, VAL-1.2| AC-102 | P0 |
| **FEAT-001** | | [TC-FE-001-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/01-assessment-authoring-question-bank.spec.ts#L61) | Negative | VAL-1.3 | - | P1 |
| **FEAT-001** | | [TC-FE-001-04](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/01-assessment-authoring-question-bank.spec.ts#L74) | UI/Visual | FR-1.3 | - | P1 |
| **FEAT-001** | | [TC-FE-001-05](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/01-assessment-authoring-question-bank.spec.ts#L89) | Accessibility | NFR-004 | - | P2 |
| **FEAT-001** | | [TC-BE-001-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/01-assessment-authoring-question-bank.test.ts#L22) | Security | SEC-1.1 | - | P0 |
| **FEAT-001** | | [TC-BE-001-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/01-assessment-authoring-question-bank.test.ts#L39) | Validation | VAL-1.1 | - | P0 |
| **FEAT-001** | | [TC-BE-001-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/01-assessment-authoring-question-bank.test.ts#L61) | Security/XSS | SEC-1.2 | - | P1 |
| **FEAT-001** | | [TC-BE-001-04](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/01-assessment-authoring-question-bank.test.ts#L83) | Database | FR-1.1 | - | P1 |
| **FEAT-001** | | [TC-BE-001-05](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/01-assessment-authoring-question-bank.test.ts#L106) | Edge Case | FR-1.1 | - | P2 |
| **FEAT-002** | Exam Config Engine | [TC-FE-002-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/02-exam-configuration-rules-engine.spec.ts#L18) | Functional | FR-2.1, FR-2.4 | - | P0 |
| **FEAT-002** | | [TC-FE-002-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/02-exam-configuration-rules-engine.spec.ts#L43) | Validation | VAL-2.4 | AC-201 | P0 |
| **FEAT-002** | | [TC-FE-002-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/02-exam-configuration-rules-engine.spec.ts#L65) | Negative | VAL-2.1 | - | P1 |
| **FEAT-002** | | [TC-FE-002-04](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/02-exam-configuration-rules-engine.spec.ts#L78) | UI/Accessibility| NFR-004 | - | P2 |
| **FEAT-002** | | [TC-BE-002-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/02-exam-configuration-rules-engine.test.ts#L18) | Validation | VAL-2.3 | - | P0 |
| **FEAT-002** | | [TC-BE-002-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/02-exam-configuration-rules-engine.test.ts#L43) | Validation | VAL-2.4 | - | P0 |
| **FEAT-002** | | [TC-BE-002-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/02-exam-configuration-rules-engine.test.ts#L77) | Database | FR-2.1 | - | P1 |
| **FEAT-002** | | [TC-BE-002-04](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/02-exam-configuration-rules-engine.test.ts#L106) | Edge Case | FR-2.1 | - | P2 |
| **FEAT-003** | Exam Workspace UI | [TC-FE-003-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/03-candidate-exam-workspace-ui.spec.ts#L18) | UI Layout | FR-3.1 | - | P0 |
| **FEAT-003** | | [TC-FE-003-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/03-candidate-exam-workspace-ui.spec.ts#L33) | Functional | FR-3.2 | - | P0 |
| **FEAT-003** | | [TC-FE-003-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/03-candidate-exam-workspace-ui.spec.ts#L48) | Functional/UI | FR-3.3, UIC-004 | - | P1 |
| **FEAT-003** | | [TC-FE-003-04](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/03-candidate-exam-workspace-ui.spec.ts#L69) | Edge Case | VAL-3.3 | - | P1 |
| **FEAT-003** | | [TC-BE-003-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/03-candidate-exam-workspace-ui.test.ts#L18) | API/Security | FR-3.2 | - | P0 |
| **FEAT-003** | | [TC-BE-003-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/03-candidate-exam-workspace-ui.test.ts#L37) | Database/API | FR-3.1 | - | P0 |
| **FEAT-003** | | [TC-BE-003-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/03-candidate-exam-workspace-ui.test.ts#L62) | Security | SEC-3.2 | - | P1 |
| **FEAT-004** | Autosave Sync Engine | [TC-FE-004-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/04-resilient-local-autosave-sync-engine.spec.ts#L18) | Functional/DB | FR-4.1, FR-4.2 | - | P0 |
| **FEAT-004** | | [TC-FE-004-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/04-resilient-local-autosave-sync-engine.spec.ts#L49) | Integration | FR-4.3, FR-4.4 | AC-501 | P0 |
| **FEAT-004** | | [TC-FE-004-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/04-resilient-local-autosave-sync-engine.spec.ts#L72) | Edge Case | - | - | P1 |
| **FEAT-004** | | [TC-BE-004-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/04-resilient-local-autosave-sync-engine.test.ts#L22) | Security/API | SEC-4.1, SEC-4.2| - | P0 |
| **FEAT-004** | | [TC-BE-004-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/04-resilient-local-autosave-sync-engine.test.ts#L56) | Security/API | SEC-004 | - | P0 |
| **FEAT-004** | | [TC-BE-004-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/04-resilient-local-autosave-sync-engine.test.ts#L83) | Edge Case/Seq | SEC-4.2 | - | P1 |
| **FEAT-005** | Browser Lockdown | [TC-FE-005-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/05-fullscreen-lockdown-client-event-controls.spec.ts#L18) | Functional | FR-5.1 | - | P0 |
| **FEAT-005** | | [TC-FE-005-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/05-fullscreen-lockdown-client-event-controls.spec.ts#L35) | Security | FR-5.2 | - | P0 |
| **FEAT-005** | | [TC-FE-005-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/05-fullscreen-lockdown-client-event-controls.spec.ts#L52) | Edge Case | FR-5.3, VAL-5.1 | AC-201 | P1 |
| **FEAT-005** | | [TC-BE-005-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/05-fullscreen-lockdown-client-event-controls.test.ts#L18) | Database/API | FR-5.3 | - | P0 |
| **FEAT-005** | | [TC-BE-005-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/05-fullscreen-lockdown-client-event-controls.test.ts#L46) | Edge Case | VAL-5.1 | - | P0 |
| **FEAT-006** | Pre-flight Check | [TC-FE-006-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/06-system-pre-flight-readiness-check.spec.ts#L18) | Functional | FR-6.1, FR-6.2 | - | P0 |
| **FEAT-006** | | [TC-FE-006-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/06-system-pre-flight-readiness-check.spec.ts#L43) | Negative/UI | FR-6.1 | AC-104 | P0 |
| **FEAT-006** | | [TC-FE-006-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/06-system-pre-flight-readiness-check.spec.ts#L68) | Validation | FR-6.4 | - | P1 |
| **FEAT-006** | | [TC-BE-006-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/06-system-pre-flight-readiness-check.test.ts#L18) | API/Database | FR-6.1, FR-6.2 | - | P0 |
| **FEAT-006** | | [TC-BE-006-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/06-system-pre-flight-readiness-check.test.ts#L47) | Validation | VAL-6.2 | - | P0 |
| **FEAT-007** | Identity Verification | [TC-FE-007-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/07-identity-verification-biometric-matcher.spec.ts#L18) | UI Guides | FR-7.1, FR-7.2 | - | P0 |
| **FEAT-007** | | [TC-FE-007-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/07-identity-verification-biometric-matcher.spec.ts#L29) | Functional | FR-7.3, FR-7.4 | AC-103 | P0 |
| **FEAT-007** | | [TC-FE-007-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/07-identity-verification-biometric-matcher.spec.ts#L50) | Edge Case | BRL-001, FR-7.4 | AC-103 | P0 |
| **FEAT-007** | | [TC-BE-007-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/07-identity-verification-biometric-matcher.test.ts#L22) | Security/API | SEC-7.1, SEC-7.2| AC-103 | P0 |
| **FEAT-007** | | [TC-BE-007-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/07-identity-verification-biometric-matcher.test.ts#L47) | Validation | VAL-7.3 | - | P0 |
| **FEAT-007** | | [TC-BE-007-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/07-identity-verification-biometric-matcher.test.ts#L67) | Database | SEC-7.2 | - | P1 |
| **FEAT-008** | Multi-Display Detection | [TC-FE-008-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/08-multi-display-extension-detection.spec.ts#L18) | Functional | FR-8.1 | - | P0 |
| **FEAT-008** | | [TC-FE-008-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/08-multi-display-extension-detection.spec.ts#L36) | Security | FR-8.4 | - | P0 |
| **FEAT-008** | | [TC-FE-008-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/08-multi-display-extension-detection.spec.ts#L55) | Edge Case | VAL-8.1 | - | P1 |
| **FEAT-008** | | [TC-BE-008-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/08-multi-display-extension-detection.test.ts#L18) | Database/API | FR-8.1, FR-8.3 | - | P0 |
| **FEAT-008** | | [TC-BE-008-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/08-multi-display-extension-detection.test.ts#L44) | Database/API | FR-8.4 | - | P1 |
| **FEAT-009** | AI Proctoring Engine | [TC-FE-009-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/09-visual-audio-ai-proctoring-engine.spec.ts#L18) | UI Layout | FR-9.1, FR-9.3 | - | P0 |
| **FEAT-009** | | [TC-FE-009-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/09-visual-audio-ai-proctoring-engine.spec.ts#L31) | Security/AI | FR-9.2, VAL-9.1 | AC-301 | P0 |
| **FEAT-009** | | [TC-FE-009-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/09-visual-audio-ai-proctoring-engine.spec.ts#L49) | Edge Case | FR-9.3, VAL-9.2 | - | P1 |
| **FEAT-009** | | [TC-BE-009-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/09-visual-audio-ai-proctoring-engine.test.ts#L19) | API/Database | FR-9.1, FR-9.3 | AC-302 | P0 |
| **FEAT-009** | | [TC-BE-009-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/09-visual-audio-ai-proctoring-engine.test.ts#L49) | Security | SEC-9.1, SEC-003| - | P0 |
| **FEAT-010** | Proctor Dashboard | [TC-FE-010-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/10-live-proctor-dashboard-webrtc-streaming.spec.ts#L19) | UI Grid | FR-10.1, FR-10.2| AC-303 | P0 |
| **FEAT-010** | | [TC-FE-010-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/10-live-proctor-dashboard-webrtc-streaming.spec.ts#L47) | Intercom/Chat | FR-10.3 | - | P0 |
| **FEAT-010** | | [TC-FE-010-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/10-live-proctor-dashboard-webrtc-streaming.spec.ts#L64) | Edge Case/Lock | FR-10.4 | - | P0 |
| **FEAT-010** | | [TC-BE-010-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/10-live-proctor-dashboard-webrtc-streaming.test.ts#L19) | Security/API | SEC-10.1 | - | P0 |
| **FEAT-010** | | [TC-BE-010-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/10-live-proctor-dashboard-webrtc-streaming.test.ts#L34) | Database/API | FR-10.4, BRL-003| - | P0 |
| **FEAT-011** | Auto Grading Engine | [TC-FE-011-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/11-objective-auto-grading-engine.spec.ts#L17) | UI Results | FR-11.4 | - | P0 |
| **FEAT-011** | | [TC-FE-011-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/11-objective-auto-grading-engine.spec.ts#L36) | Accessibility | NFR-004 | - | P2 |
| **FEAT-011** | | [TC-BE-011-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/11-objective-auto-grading-engine.test.ts#L17) | Functional | FR-11.1 | - | P0 |
| **FEAT-011** | | [TC-BE-011-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/11-objective-auto-grading-engine.test.ts#L46) | Validation/Math | FR-11.2, VAL-11.1| - | P0 |
| **FEAT-011** | | [TC-BE-011-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/11-objective-auto-grading-engine.test.ts#L79) | Edge Case/Text | FR-11.3 | - | P1 |
| **FEAT-012** | Essay Grading Portal | [TC-FE-012-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/12-double-blind-essay-grading-moderation-portal.spec.ts#L18) | UI Info Masking| FR-12.1 | - | P0 |
| **FEAT-012** | | [TC-FE-012-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/12-double-blind-essay-grading-moderation-portal.spec.ts#L37) | Rubric Check | FR-12.3, VAL-12.2| - | P0 |
| **FEAT-012** | | [TC-FE-012-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/12-double-blind-essay-grading-moderation-portal.spec.ts#L62) | Edge Case | FR-12.4 | - | P1 |
| **FEAT-012** | | [TC-BE-012-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/12-double-blind-essay-grading-moderation-portal.test.ts#L22) | Security/Queue | FR-12.2 | - | P0 |
| **FEAT-012** | | [TC-BE-012-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/12-double-blind-essay-grading-moderation-portal.test.ts#L54) | Edge Case/Escal | FR-12.4, BRL-006| - | P0 |
| **FEAT-012** | | [TC-BE-012-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/12-double-blind-essay-grading-moderation-portal.test.ts#L86) | Functional | FR-12.4 | - | P1 |
| **FEAT-013** | Cert Gen & Verification| [TC-FE-013-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/13-verifiable-certificate-generator-verification-portal.spec.ts#L15) | UI Render | FR-13.1, FR-13.3| AC-701 | P0 |
| **FEAT-013** | | [TC-FE-013-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/13-verifiable-certificate-generator-verification-portal.spec.ts#L38) | Functional/API | FR-13.4 | AC-702 | P0 |
| **FEAT-013** | | [TC-FE-013-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/frontend/13-verifiable-certificate-generator-verification-portal.spec.ts#L57) | Edge Case | FR-13.4 | - | P1 |
| **FEAT-013** | | [TC-BE-013-01](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/13-verifiable-certificate-generator-verification-portal.test.ts#L20) | Validation/API | VAL-13.1 | - | P0 |
| **FEAT-013** | | [TC-BE-013-02](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/13-verifiable-certificate-generator-verification-portal.test.ts#L42) | API/Database | FR-13.2, FR-13.4| AC-702 | P0 |
| **FEAT-013** | | [TC-BE-013-03](file:///d:/vibeCoding2026/practiceProjects/online-examination-platform/test-cases/backend/13-verifiable-certificate-generator-verification-portal.test.ts#L64) | Edge Case | FR-13.4 | - | P1 |

---

## 3. Coverage Analysis Report

### 3.1 Requirement Coverage Check
* **Functional Requirements (FR-101 to FR-702):** 100% covered. Every functional requirement mapped to at least one test case in Playwright or Jest.
* **Business Rules (BRL-001 to BRL-007):** 100% covered. Threshold metrics like face-matching bounds ($\ge 85\%$), double-blind discrepancy limits ($>15\%$), and warning triggers are verified via integration assertion test scenarios.
* **Non-Functional Requirements (NFR-001 to NFR-005):** Covered. UI responsiveness limits, accessibility zoom targets (200% scaling, key tabs), and API processing speeds validated.

### 3.2 Testing Vector Assertions
* **Security Vector Coverage:** Tested JWT scope validation, SQL XSS sanitization, database column-level encryption values, network HMAC validations, and S3 time-limited signed URL restrictions.
* **Resiliency Vector Coverage:** Simulated browser reloads and offline connections verifying IndexedDB local storage and background synchronizations.
