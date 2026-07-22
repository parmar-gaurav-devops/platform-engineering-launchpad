# Kubernetes production checklist

Use this during design review and before production launch. Mark an item only when there is evidence and an owner.

## Security

- [ ] Namespace boundaries and least-privilege RBAC are documented.
- [ ] Workloads use dedicated service accounts and workload identity.
- [ ] Secrets are externalized, encrypted, and rotation-tested.
- [ ] Admission policies prevent privileged containers and unsigned images.
- [ ] Network policies default to deny where practical.

## Reliability

- [ ] Requests and limits are set from measured workload behavior.
- [ ] Readiness, liveness, and startup probes reflect actual dependencies.
- [ ] Pod disruption budgets and topology spread constraints are reviewed.
- [ ] Backups and restoration have been tested against stated recovery objectives.
- [ ] A rollback path is documented and rehearsed.

## Observability and operations

- [ ] Golden-signal dashboards and actionable alerts have service owners.
- [ ] Logs are structured, queryable, and retained according to policy.
- [ ] Traces cross service boundaries and include deployment version.
- [ ] Runbooks link alerts to diagnostics and mitigations.
- [ ] Audit logs are protected and regularly reviewed.

## Cost and developer experience

- [ ] Resource requests are reviewed monthly for waste and throttling.
- [ ] Namespace labels support ownership and cost allocation.
- [ ] The deployment path is self-service, documented, and GitOps-controlled.
- [ ] A template provides secure defaults for new services.
