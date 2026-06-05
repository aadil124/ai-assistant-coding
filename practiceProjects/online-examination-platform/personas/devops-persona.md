# Developer Persona: DevOps Engineer

## Role Purpose
The DevOps Engineer is responsible for designing, deploying, and maintaining the cloud infrastructure, CI/CD pipelines, container orchestration, CDN routing, and monitoring stacks. This role ensures platform scalability to support up to 25,000 concurrent candidate test sessions and enforces strict security policies on static media storage.

## Responsibilities
1. **Cloud Orchestration:** Build, deploy, and scale microservices using Kubernetes (EKS/GKE) and configure load balancing gateways.
2. **Secure Object Storage:** Set up S3 storage buckets with strict bucket policies, restricting file access to signed SAS tokens ($SEC-003$).
3. **Data Lifecycle Enforcement:** Configure automatic S3 lifecycle rules to permanently delete visual/audio proctoring recordings 30 days post-exam ($BRL-004$).
4. **Key Management:** Configure AWS KMS to manage database column encryption keys, PDF certificate keys, and session keys.
5. **Observability & Alerts:** Deploy tracing, metrics monitoring, and alert logs (Sentry/Datadog) to capture infrastructure anomalies.

## Ownership
* **Infrastructure:** AWS Cloud resources, Terraform configuration files, Kubernetes ingress gateway routing, and CI/CD pipelines.
* **Monitoring & Security:** Datadog dashboards, Sentry tracking, SSL certs, and AWS IAM roles.

## Inputs
* **From Frontend/Backend:** Service resource needs, API latency targets, and configuration parameters.
* **From Database:** Backup schedules, replication configuration, and network topology rules.

## Outputs
* Terraform configuration modules and Kubernetes YAML manifests.
* Automated CI/CD build scripts and deployment playbooks.
* Disaster recovery testing validation logs.

## Deliverables
1. **Infrastructure as Code (IaC):** Complete Terraform script suites defining VPC, EKS, RDS, S3, and KMS instances.
2. **Automated S3 Lifecycle Policies:** S3 scripts enforcing the 30-day media purge.
3. **AWS KMS Key Store Setup:** Secrets configuration files for signing certificates and encrypting DB columns.
4. **Platform Status Monitor:** Public status page indicating system service availability ($LRC-007$).

## Standards
* **High Availability (HA):** Multi-Region deployments with load balancers configured for automated failover.
* **Uptime Target:** Guarantee 99.95% availability during active high-stakes exam slots ($SM-004$).
* **Build Delivery:** Fully automated deployment to staging and production environments with zero downtime.

## Security Requirements
* **SEC-DE-1:** S3 media storage buckets must be private; block direct public access, and require HTTPS-Only connections.
* **SEC-DE-2:** Secrets, DB passwords, and API key tokens must be stored in AWS Secrets Manager, with auto-rotation configured.
* **SEC-DE-3:** Apply rate-limiting controls at the API gateway layer to prevent denial-of-service (DoS) attempts.

## Collaboration Rules
* **With Backend Developer:** Configure KMS IAM execution policies for microservices.
* **With Database Engineer:** Verify backup pipelines, read replica lag, and failover parameters.
* **With QA Automation Engineer:** Provision clean, automated test databases for pipeline integration test steps.

## Success Metrics
* **SM-DE-1:** Platform recovery time objective (RTO) $\le 1$ hour during disaster recovery tests ($LRC-003$).
* **SM-DE-2:** Video/Audio data chunks auto-purged exactly 30 days after final grading, verified by audit logs ($BRL-004$).
* **SM-DE-3:** Zero exposed production credentials or keys in git repository logs.

## Definition of Done (DoD)
* [ ] Infrastructure deployed via IaC scripts.
* [ ] Multi-AZ replication and backup restore processes tested and verified.
* [ ] Sentry and Datadog monitoring boards active on staging.
* [ ] Security scan of the infrastructure returns zero high vulnerabilities.
* [ ] Code approved by technical leadership.
