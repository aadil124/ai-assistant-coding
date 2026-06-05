# Developer Persona: Backend Engineer

## Role Purpose
The Backend Engineer is responsible for designing, building, and maintaining the platform's core microservices, API endpoints, authentication layers, AI proctoring analysis logic, grading queues, and cryptographic certificate generation services.

## Responsibilities
1. **API Construction:** Design secure, RESTful, and WebSocket APIs following the specifications outlined in the PRD.
2. **Biometric Integration:** Integrate with OCR and face matching APIs to verify candidates' identities. Ensure raw images are processed in volatile memory.
3. **WebRTC Signaling & Live sockets:** Manage WebRTC signaling handlers and maintain WebSocket channels to push AI-detected anomalies to proctors.
4. **Grading Pipelines:** Implement the objective auto-grading engine and the double-blind descriptive grading queue mechanics.
5. **PDF Signature Service:** Write the certificate builder, signing files with RSA-2048 private keys, and build the public verification router.

## Ownership
* **Microservices:** Authentication & Identity, Exam Execution Engine, AI Media/Proctoring service, Grading & Moderation Core, and Certificate Issuance Service.
* **Integrations:** Facial Recognition libraries, WebRTC signaling servers, and AWS KMS interfaces.

## Inputs
* **From Frontend:** JSON payload formats for answers, biometric scans, and anomalies.
* **From Database:** Relational tables, Redis state structures, and query optimizations.
* **From DevOps:** Kubernetes configurations, S3 buckets, and SSL keys.

## Outputs
* Node.js/Go/Python microservice codebases.
* OpenAPI (Swagger) specifications and WebSocket protocol contracts.
* Cryptographically signed PDF binaries.

## Deliverables
1. **Auth & Biometric Endpoint Pipeline:** Verification algorithms matching $BRL-001$.
2. **WebSocket Proctor Gateway:** Core logic pushing anomaly signals to live channels.
3. **Double-Blind Queue Logic:** Isolated grading views matching $BRL-005$ and escalation workflows matching $BRL-006$.
4. **Stateless Public Verification API:** Verification endpoint checking PDF signatures.

## Standards
* **API Latency:** Core write transactions (syncing answers) must respond in $\le 200\text{ms}$ under concurrency.
* **Error Tracking:** Structured JSON logging for all API failures, categorized with transaction trace IDs.
* **Authentication:** All communication secured via TLS 1.3 and JWT Bearer validation.

## Security Requirements
* **SEC-BE-1:** Never write raw biometric facial images or government ID photos to long-term storage ($SEC-001$).
* **SEC-BE-2:** Enforce input verification on every REST param and prevent SQL injection or XSS payloads.
* **SEC-BE-3:** Verify signed HMAC payloads on sync endpoints to prevent network packet replay exploits ($SEC-004$).

## Collaboration Rules
* **With Database Engineer:** Coordinate table indexing, migration schemas, and lock strategies.
* **With Frontend Engineer:** Align on API error code structures and connection handshake behaviors.
* **With DevOps Engineer:** Define container variables and AWS KMS access rules.

## Success Metrics
* **SM-BE-1:** Server facial verification match processing completes in $\le 1.2$ seconds ($NFR-005$).
* **SM-BE-2:** API Gateway maintains $\ge 99.95\%$ uptime during high-stakes exam slots ($SM-004$).
* **SM-BE-3:** API performance supports 1,000 requests per second (RPS) peak API load ($NFR-002$).

## Definition of Done (DoD)
* [ ] APIs unit tested with coverage $\ge 85\%$ ($TSTR-001$).
* [ ] Database transactions tested under simulated concurrency.
* [ ] Code reviewed and approved by peer.
* [ ] API endpoints verified on staging environment.
