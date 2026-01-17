# dLocal Microfrontend Platform

## Architecture

```mermaid
graph TD
  Shell[Shell (Next.js host)]
  Payments[Payments MFE]
  Risk[Risk MFE]
  Merchant[Merchant Portal MFE]
  Reporting[Reporting MFE]
  BFF[BFF (Node/Express API)]
  Libs[Shared Libs (ui, auth, types)]

  Shell --> Payments
  Shell --> Risk
  Shell --> Merchant
  Shell --> Reporting

  Shell --> Libs
  Payments --> Libs
  Risk --> Libs
  Merchant --> Libs
  Reporting --> Libs

  Shell --> BFF
  Payments --> BFF
  Risk --> BFF
  Merchant --> BFF
  Reporting --> BFF
```

## Hybrid Composition Strategy (Build-Time + Runtime)

This platform blends **build-time composition** with **runtime composition**:

- **Build-time composition** happens via shared Nx libraries (`libs/ui`, `libs/auth`, `libs/types`) that are compiled into each app. This keeps core UI and domain contracts consistent across the shell and MFEs.
- **Runtime composition** is powered by **Module Federation**. The shell loads each MFE from its `remoteEntry.js` at runtime, allowing independent deployment and local development while keeping a cohesive UX.

The shell resolves remote URLs via environment variables (e.g. `NEXT_PUBLIC_PAYMENTS_REMOTE_URL`) and loads MFE entry points dynamically with Next.js `dynamic()` imports.

## Running Locally

Install dependencies:

```bash
pnpm install
```

Common Nx commands:

```bash
# Build all apps/libs
pnpm nx run-many --target=build

# Lint all apps/libs
pnpm nx run-many --target=lint
```

### Run Individual Apps

```bash
# Shell (host)
pnpm nx run shell:dev

# MFEs
pnpm nx run payments:dev
pnpm nx run risk:dev
pnpm nx run merchant-portal:dev
pnpm nx run reporting:dev

# BFF API
pnpm nx run bff:serve
```

## Run Shell + MFEs Together (Dev Mode)

Start MFEs, then the shell:

```bash
pnpm nx run-many --target=dev --projects=payments,risk,merchant-portal,reporting --parallel
pnpm nx run shell:dev
```

If the shell needs to call the API layer, run the BFF in a separate terminal:

```bash
pnpm nx run bff:serve
```

> Tip: update `NEXT_PUBLIC_*_REMOTE_URL` variables to point the shell at non-default MFE URLs when needed.

## CI/CD Overview

Typical pipeline stages for this monorepo:

1. **Install** dependencies (`pnpm install`).
2. **Lint/Test** all relevant projects with Nx (`nx run-many --target=lint/test`).
3. **Build** apps (`nx run-many --target=build`).
4. **Publish artifacts** per app (shell, each MFE, and BFF).
5. **Deploy** shell + MFEs independently to their respective environments, with BFF deployed alongside or as a separate service.

## Gitflow Branch Strategy

We follow a Gitflow-inspired workflow:

- `main` contains production-ready releases.
- `develop` aggregates ongoing feature work.
- `feature/*` branches are created from `develop` and merged back via PRs.
- `release/*` branches are cut from `develop` for stabilization, then merged into `main` and `develop`.
- `hotfix/*` branches are cut from `main` for urgent fixes and merged back into both `main` and `develop`.

## Adding a New MFE and Integrating with the Shell

1. **Generate the app** (Next.js MFE):
   ```bash
   pnpm nx g @nx/next:app my-mfe
   ```

2. **Enable Module Federation** in the new MFE’s `next.config.js`:
   - Add `NextFederationPlugin` with a unique `name`.
   - Expose a `RemoteEntry` component.

3. **Expose a Remote Entry**:
   - Create `apps/my-mfe/src/app/RemoteEntry.tsx` and export the root UI.
   - Configure `exposes` in the federation plugin:
     ```js
     exposes: {
       './RemoteEntry': './src/app/RemoteEntry'
     }
     ```

4. **Register the remote in the shell**:
   - Add a new env var in `apps/shell/next.config.js` (e.g. `NEXT_PUBLIC_MY_MFE_REMOTE_URL`).
   - Add the remote mapping in `remotes`:
     ```js
     myMfe: `myMfe@${myMfeRemoteUrl}/_next/static/chunks/remoteEntry.js`
     ```

5. **Add typings for the remote**:
   - Update `apps/shell/src/remotes.d.ts`:
     ```ts
     declare module 'myMfe/RemoteEntry' {
       const RemoteEntry: React.ComponentType;
       export default RemoteEntry;
     }
     ```

6. **Render the new MFE in the shell UI**:
   - Add a dynamic import in `apps/shell/src/app/MfeWorkspace.tsx` (or your routing layer):
     ```ts
     const MyMfeRemote = dynamic(() => import('myMfe/RemoteEntry'), { ssr: false });
     ```

7. **Run in dev**:
   - Start the new MFE dev server, then the shell (or use `nx run-many`).

