# Platform engineering interview guide

## Architecture prompts

1. Design a multi-team EKS platform. Where do identity, tenancy, and deployment responsibilities live?
2. A team needs a database. What is self-service, what needs review, and how do you keep the paved path attractive?
3. Explain how you would migrate CI-driven `kubectl apply` to GitOps with a safe rollback plan.

## Incident prompt

An API's p99 latency doubled after a deployment. Walk through: stabilizing traffic, identifying the change, checking saturation and dependencies, rolling back safely, communicating status, and turning the learning into a guardrail.

## What strong answers demonstrate

- Clear tradeoffs instead of tool-name lists.
- Measurable reliability and recovery objectives.
- Empathy for developer workflow alongside security and operations.
- A feedback loop: templates, telemetry, incidents, and product discovery.
