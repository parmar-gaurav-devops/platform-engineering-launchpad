# Terraform patterns

The pattern is intentionally small: each domain owns a state boundary and exports only stable, documented outputs. Avoid a single root module that creates every platform layer.

```text
environments/prod/network       # VPC and endpoints
environments/prod/cluster       # EKS and node provisioning
environments/prod/observability # managed signal backends
modules/tags                    # organization labels and validation
```

## Conventions

- Pin provider and module versions.
- Store remote state with encryption, locking, and restricted access.
- Run `fmt`, `validate`, linting, security scans, and plan in pull requests.
- Use environment-specific variables, not copied root modules.
- Treat outputs as an API; avoid exposing secret values.

See `examples/` before adapting patterns to a real account.
