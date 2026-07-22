# GitOps starter

This baseline contains one Argo CD `Application` that reconciles a Helm chart. Put this directory in a dedicated configuration repository in production and restrict who can merge to production values.

```bash
kubectl apply -f gitops/argocd/application.yaml
```

Replace `REPLACE_WITH_GIT_URL` and `REPLACE_WITH_REVISION` first. The sample chart runs no privileged containers and includes resource requests, health checks, and a service.

To render the production chart locally:

```bash
helm lint gitops/charts/sample-api
helm template sample-api gitops/charts/sample-api --values gitops/charts/sample-api/values-production.yaml
```
