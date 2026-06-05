# Business Requirements Document (BRD)
## Project: Secure Online Examination Platform (SecureExam)
## Document Version: 1.0.0
## Date: 2026-06-05

---

## 1. Problem Statement

Traditional high-stakes examinations rely on physical test centers, which pose significant logistical, administrative, and financial burdens on educational institutions and professional certification bodies. Transitioning exams to the digital realm introduces a major vulnerability: **academic dishonesty and lack of trust**. Without physical oversight, candidates can access external resources, collaborate with peers, use unauthorized software, or engage in impersonation. 

Furthermore, existing online testing tools lack automated, scalable proctoring solutions, comprehensive grading pipelines, and tamper-proof digital certification. To maintain the credibility of certifications and academic credentials, organizations require a unified, secure, scalable, and highly reliable online examination platform that prevents cheating, validates candidate identities, automatically grades assessments, and issues verifiable credentials.

---

## 2. Business Goals

The primary business objectives of the SecureExam platform are:
* **BG-001: Credibility Preservation:** Establish an online environment that guarantees exam integrity comparable to or exceeding in-person test centers.
* **BG-002: Operational Cost Reduction:** Reduce the cost per test candidate by at least 45% compared to physical test venue hiring, invigilator salaries, and paper logistics.
* **BG-003: Global Scalability:** Enable organizations to scale testing capacity from hundreds to tens of thousands of concurrent global candidates without hardware bottlenecks.
* **BG-004: Time-to-Result Optimization:** Accelerate grading turnaround times by utilizing an auto-grading engine for objective questions and a collaborative evaluation portal for descriptive answers.
* **BG-005: Tamper-Proof Certification:** Provide instant, verifiable, and cryptographic credentials to successful candidates, eliminating certificate fraud.

---

## 3. Stakeholders

| Stakeholder Role | Description | Key Interests |
| :--- | :--- | :--- |
| **Exam Sponsor / Client** | Universities, corporations, certification bodies (e.g., Pearson, AWS). | Credibility of exams, branding, cost efficiency, detailed reporting. |
| **Candidates (Test Takers)** | Students, job applicants, and professionals seeking credentials. | Intuitive interface, clear guidelines, network disconnect recovery, fast grading. |
| **Proctors (Invigilators)** | Humans supervising the exams live or reviewing flagged recordings. | Easy-to-use monitoring dashboards, real-time alert filters, chat with candidates. |
| **Examiners (Authors/Graders)** | Subject matter experts who create content and grade descriptive items. | Rich question bank editors, grading rubrics, blind-grading features. |
| **System Administrators** | IT staff managing platform operations, security, and updates. | RBAC (Role-Based Access Control), system health metrics, audit logs, integration APIs. |

---

## 4. User Personas

### Persona 1: Sarah Jenkins (The Candidate)
* **Demographics:** 24 years old, Master's student, working part-time.
* **Tech-Savviness:** Moderate. Uses standard web apps, but gets anxious about technical glitches.
* **Goals:** Complete her final certification exam from home without internet disruptions invalidating her progress.
* **Pain Points:** Fear of false-positive cheating flags due to minor movements; anxiety over browser crashes causing data loss.

### Persona 2: Dr. Marcus Vance (The Examiner / Course Creator)
* **Demographics:** 52 years old, University Professor, Subject Matter Expert.
* **Tech-Savviness:** Low to Moderate. Prefers straightforward administrative workflows.
* **Goals:** Efficiently author complex chemistry questions (with formulas) and grade 200+ essay answers using a structured rubric.
* **Pain Points:** Copy-paste plagiarism in essay submissions; tedious manual grading workflows for large cohorts.

### Persona 3: David Chen (The Live Proctor)
* **Demographics:** 29 years old, Contract Invigilator.
* **Tech-Savviness:** High. Comfortable managing multi-monitor setups.
* **Goals:** Monitor up to 30 active candidates concurrently and intervene immediately if suspicious behavior is flagged.
* **Pain Points:** Alarm fatigue from false-positive AI flags; difficulty tracking which student triggered an alert in high-density views.

---

## 5. Scope of the System

### 5.1 In-Scope (Phase 1)
* **Multi-Factor Authentication & Identity Verification:** SSO, facial biometrics registration, government ID document scanning and matching.
* **AI-Assisted Automated Proctoring:** Live webcam monitoring (face detection, gaze tracking, multiple faces check), audio anomaly detection, and screen recording.
* **Secure Browser Lockdown System:** Prevention of window switching, copy-paste block, shortcut blocking, and multiple monitor detection.
* **Question Bank & Exam Builder:** Support for Multiple Choice Questions (MCQ), Multi-Select Questions, Essay answers, drag-and-drop, and math/science syntax.
* **Resilient Exam Delivery Engine:** Real-time answer auto-saving, offline-resiliency (local storage backup with encryption), and automated progress recovery.
* **Grading & Evaluation Pipeline:** Instant auto-grading for objective questions; blind grading, rubric-based evaluation, and double-marking workflow for essays.
* **Verifiable Digital Credentials:** PDF certificates containing cryptographically signed metadata and a public verification QR/URL.

### 5.2 Out-of-Scope
* **Physical Hardware Proctoring Integrations:** Fingerprint readers, retinal scanners, or external physical hardware locks.
* **Full-fledged LMS Features:** Course video streaming, discussion boards, assignment submission pipelines unrelated to exams.
* **Offline-Only Desktop Apps:** In Phase 1, lockdown proctoring will be web-based (using browser APIs, Chrome extensions, or secure browser configurations) rather than standalone native OS applications (macOS/Windows executables).

---

## 6. Business Requirements (BR)

| Req ID | Business Requirement Description | Priority | Target Stakeholder |
| :--- | :--- | :--- | :--- |
| **BR-001** | The system must verify the candidate's identity prior to exam access to prevent impersonation. | Critical | Candidate, Admin |
| **BR-002** | The system must prevent unauthorized aid access during the exam through active client-side restrictions. | Critical | Exam Sponsor |
| **BR-003** | The system must monitor candidates in real-time and log behavioral anomalies for audit purposes. | Critical | Proctor, Sponsor |
| **BR-004** | The system must guarantee zero data loss of candidate answers, even in the event of local power or network failure. | Critical | Candidate |
| **BR-005** | The system must support diverse question types (objective and descriptive) and provide a question banking pool. | High | Examiner |
| **BR-006** | The system must support collaborative and multi-tiered grading structures for descriptive answers. | High | Examiner |
| **BR-007** | The system must issue cryptographic, tamper-proof certificates that can be verified publicly without login. | High | Candidate, Sponsor |
| **BR-008** | The system must be compliant with international data privacy laws (e.g., GDPR, CCPA) regarding biometric storage. | Critical | Admin, Sponsor |
| **BR-009** | The system must provide analytical reporting on exam performance, pass rates, and cheating incident rates. | Medium | Exam Sponsor |

---

## 7. Business Rules (BRL)

| Rule ID | Business Rule | Description | Target Req |
| :--- | :--- | :--- | :--- |
| **BRL-001** | **Identity Matching Threshold** | A candidate's live face scan must match their registered profile picture/ID card scan by a confidence score of $\ge 85\%$ to start the exam. | BR-001 |
| **BRL-002** | **Exam Window Hard Close** | When an exam's allotted duration expires, the system must automatically submit all saved answers, blocking further edits. | BR-004 |
| **BRL-003** | **Proctor Violation Escalation** | If three critical AI proctoring anomalies (e.g., face absent, secondary device detected) occur within a 5-minute window, the live proctor is immediately alerted. | BR-003 |
| **BRL-004** | **Data Retention Limit** | Candidate video/audio proctoring recordings must be hard-deleted exactly 30 days after the exam results are finalized, unless flagged for active investigation. | BR-008 |
| **BRL-005** | **Double-Blind Grading Rule** | For descriptive answers requiring double-blind grading, the scores given by Grader A and Grader B must not be visible to each other until both submit. | BR-006 |
| **BRL-006** | **Discrepancy Threshold** | If the difference in grades between two independent graders for a single essay is $> 15\%$ of the total marks, the exam must be routed to a Senior Moderator. | BR-006 |
| **BRL-007** | **Certificate Authenticity** | Certificates must contain a hash value signed by the platform’s private key (using SHA-256 with RSA/ECDSA) to ensure non-repudiation. | BR-007 |

---

## 8. Risks and Assumptions

### 8.1 Risks & Mitigation Strategies
* **Risk 1: False Positives in AI Proctoring (e.g., candidate looking away due to a tick or reading questions aloud).**
  * *Mitigation:* AI flags do not automatically terminate exams. They flag segments in the timeline for manual human review by a proctor who holds final veto authority.
* **Risk 2: Intermittent Network Outages.**
  * *Mitigation:* Implement client-side local caching of answers using encrypted IndexedDB. Synchronize with the cloud periodically (every 10 seconds) when the internet is active.
* **Risk 3: Leakage of Sensitive Biometric Data.**
  * *Mitigation:* Do not store raw biometric facial images permanently if possible. Convert them to vector embeddings. Encrypt all media files at rest using AES-256 and restrict access via time-limited SAS tokens.
* **Risk 4: Bypassing browser-based restrictions (using virtual machines or external video capture cards).**
  * *Mitigation:* Implement browser canvas fingerprinting, WebRTC screen capture constraints, and behavior pattern analysis (e.g., sudden cursor jumps).

### 8.2 Project Assumptions
* **Assumption 1:** Candidates have access to a computer with a functional webcam, microphone, and a stable browser (Chrome, Safari, Edge, Firefox).
* **Assumption 2:** Organizations using the platform have assigned roles (Examiner, Proctor, Administrator) with designated trainers.
* **Assumption 3:** Average network bandwidth for candidates will be at least 1.5 Mbps upload/download to stream low-resolution video (360p) for proctoring analysis.

---

## 9. Success Metrics (SM)

| Metric ID | Metric Definition | Baseline | Target (Phase 1) | Measurement Window |
| :--- | :--- | :--- | :--- | :--- |
| **SM-001** | **Proctoring Precision Rate** | N/A | $\ge 92\%$ of flagged anomalies verified as actual policy violations. | Quarterly |
| **SM-002** | **Exam Data Preservation Rate** | 99.5% | 100.0% (Zero lost answers/exams due to technical failure). | Per Exam Cycle |
| **SM-003** | **Average Session Recovery Time** | 5 mins | $< 45$ seconds for candidate to resume exam after browser crash. | Monthly |
| **SM-004** | **Platform Uptime** | 99.0% | 99.95% availability during designated high-stakes exam windows. | Monthly |
| **SM-005** | **Net Promoter Score (NPS) - Candidates** | +10 | +40 or higher (gauging ease of use and reduced stress). | Annually |
| **SM-006** | **Manual Grading Cycle Time** | 10 days | $\le 3$ business days from exam completion to moderator sign-off. | Per Exam Cycle |
