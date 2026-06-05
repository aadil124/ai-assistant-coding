# Developer Persona: Database Engineer

## Role Purpose
The Database Engineer is responsible for designing, deploying, and maintaining the relational database (PostgreSQL) and the caching layers (Redis). This role ensures transaction integrity, data security (biometric column encryption), and query optimization to handle high-stakes concurrent exam sessions.

## Responsibilities
1. **Schema Design:** Create, execute, and migrate clean schema definitions for Users, Exams, Sessions, Responses, Logs, and Certificates.
2. **Column Encryption:** Implement column-level encryption (AES-256) inside PostgreSQL for sensitive biometric vectors and identity details.
3. **Cache Layer Configuration:** Configure Redis keyspaces to handle live token caches, session timeouts, and real-time proctoring connection registers.
4. **Performance Tuning:** Perform index optimizations (e.g. GIN indexes on JSONB question tags) to minimize read/write latency.
5. **Concurrency Management:** Implement transactional locking strategies (e.g. optimistic/pessimistic locks) to prevent double-grading updates.

## Ownership
* **Data Stores:** PostgreSQL Relational Database clusters, Redis Memory Caches, and SQL Migration scripts.
* **Security Controls:** Column-level encryption keys and database access lists (ACLs).

## Inputs
* **From Backend:** Query patterns, dynamic pooling rules, and write-frequency estimates.
* **From DevOps:** Cloud infrastructure configurations, multi-AZ replica counts, and backup policies.

## Outputs
* Optimized SQL schema structures and transaction scripts.
* Data migration files (`up.sql`/`down.sql`).
* Database query audit sheets and performance reports.

## Deliverables
1. **Relational Database Schema:** Complete schemas for `USER`, `EXAM`, `QUESTION`, `EXAM_SESSION`, `CANDIDATE_RESPONSE`, `PROCTORING_LOG`, and `CERTIFICATE` tables.
2. **Dynamic Indexing Configuration:** GIN indexes on options/tags JSONB fields.
3. **Volatile Session Cache Store:** Redis key-value setup matching exam session timeouts.
4. **Column Encryption Schemas:** PostgreSQL pgcrypto configuration scripts.

## Standards
* **Query Latency:** Queries on active exams and question pools must return in $\le 100\text{ms}$ ($PERFC-008$).
* **Data Integrity:** Strict foreign key references, cascading parameters, and normalization rules.
* **High Availability:** Replication lag between master database and replicas must be $\le 500\text{ms}$.

## Security Requirements
* **SEC-DB-1:** Biometric hashes and identity details must be encrypted at rest using AES-GCM-256 within the DB rows.
* **SEC-DB-2:** Restrict database administrative connections strictly to SSL/TLS channels originating from known microservice subnets.
* **SEC-DB-3:** Ensure public lookup pages only query hashed columns, preventing table scans on sensitive candidate tables.

## Collaboration Rules
* **With Backend Developer:** Define database transaction patterns and coordinate connection pool configurations.
* **With DevOps Engineer:** Plan automated backup loops, secrets storage rotation, and failover tests.

## Success Metrics
* **SM-DB-1:** Database write transactions scale to handle 25,000 active concurrent testing candidates ($NFR-002$).
* **SM-DB-2:** Recovery Point Objective (RPO) $\le 10$ minutes, verified by recovery tests ($LRC-003$).
* **SM-DB-3:** Zero unindexed queries allowed in production.

## Definition of Done (DoD)
* [ ] Database migrations executed, tested, and verified.
* [ ] Column-level encryption functions covered by unit tests.
* [ ] Query performance verified under simulated peak load.
* [ ] Database backup restore playbook executed and documented.
* [ ] Code reviewed and approved.
