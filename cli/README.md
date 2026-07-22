# Platform Scorecard CLI

Assess platform practices from an evidence JSON document. The MVP is deliberately offline and deterministic: useful in a pull request, workshop, or discovery call without cloud credentials.

```bash
node cli/platform-scorecard.mjs assess --input examples/scorecard/account.json
```

Supported categories are Security, Reliability, Cost, Observability, and Developer Experience. Each boolean key maps to published points and a remediation. Use [the example](../examples/scorecard/account.json) as the input schema.

Future collectors should generate this evidence file from AWS and Kubernetes APIs; collectors must be opt-in and use read-only credentials.
