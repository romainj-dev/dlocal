# GitHub Actions workflows

## CI: affected lint/test/build
- **Workflow:** `ci.yml`
- **Triggers:**
  - Pull requests (default base)
  - Pushes to `main`
- **Behavior:** Uses `nx affected` to run `lint`, `test`, and `build` for impacted projects.
- **Caching:**
  - Node/pnpm cache via `actions/setup-node`
  - Nx task cache in `.nx/cache`
- **Package manager:** Uses pnpm and expects `pnpm-lock.yaml` to be present. CI installs with `pnpm install --frozen-lockfile`.

## Deploy: shell
- **Workflow:** `deploy-shell.yml`
- **Triggers:**
  - Pushes to `main`
  - Tags matching `shell-v*`
  - Manual `workflow_dispatch`
- **Environment variables (environment-scoped):**
  - `PAYMENTS_REMOTE_URL`
  - `RISK_REMOTE_URL`
  - `MERCHANT_PORTAL_REMOTE_URL`
  - `REPORTING_REMOTE_URL`

## Deploy: MFEs
- **Workflows:**
  - `deploy-mfe-merchant-portal.yml`
  - `deploy-mfe-payments.yml`
  - `deploy-mfe-reporting.yml`
  - `deploy-mfe-risk.yml`
- **Triggers:**
  - Pushes to `main` (limited to the app, shared libs, and workspace config)
  - Tags matching `<app>-v*` (for example: `payments-v1.2.0`)
  - Manual `workflow_dispatch`
- **Environment variables (environment-scoped):**
  - `BFF_URL`

## Gitflow mapping
- **Feature branches** → open PRs into `main`, CI runs with `nx affected`.
- **Main branch** → deploys the shell and any MFEs that changed.
- **Release tags** → deploy a specific app by tagging `shell-v*` or `<app>-v*`.
- **Manual dispatch** → use the workflow input to select `staging` or `production` and pull environment-scoped variables.
