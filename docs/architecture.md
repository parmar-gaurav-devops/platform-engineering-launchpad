# Reference architecture

## Goals

- Give product teams a paved path from pull request to production.
- Keep infrastructure changes reviewable, reproducible, and observable.
- Separate platform ownership from application ownership without hiding operational responsibility.

## Layers

1. **Foundation:** Terraform creates account guardrails, network boundaries, EKS, identity, and remote state.
2. **Delivery:** GitHub Actions builds, tests, signs, and publishes immutable application artifacts.
3. **Reconciliation:** Argo CD pulls reviewed desired state from Git and applies it to EKS.
4. **Runtime:** workloads use workload identity, network policies, resource limits, and progressive delivery.
5. **Signals:** OpenTelemetry captures metrics, logs, and traces; dashboards and alerts map to service ownership.

## Design decisions and tradeoffs

| Decision | Why | Tradeoff |
| --- | --- | --- |
| GitOps pull model | Cluster credentials do not live in CI | Reconciliation adds a control-plane dependency |
| Terraform by bounded domain | Smaller plans and clearer ownership | Requires a documented dependency contract |
| Managed AWS services first | Reduces platform operational load | Can increase cloud coupling |
| OpenTelemetry at application boundaries | Avoids vendor-specific instrumentation | Needs consistent semantic conventions |

## Production boundaries

This is a blueprint, not a drop-in production deployment. Before using it, establish ownership, threat modeling, data classification, recovery objectives, and budget limits for your organization.
