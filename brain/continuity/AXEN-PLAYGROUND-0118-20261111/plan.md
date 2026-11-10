# Playground dependency delivery — plan v1

Owner request: add nasirBataruna/axen-form-playground to axen-lib, change its dependency to @axenstudio/axen-form@0.1.18, commit and push.

Project: project:axen-lib. Repository: repo:axen-lib-axen-form-playground.
Task: AXEN-PLAYGROUND-0118-20261111.
Execution: execution:4d4dfc02fb79479ca13e72cbcd705591.
Base: b4f03108d2ecf5414e4f7c59e3df020243d9170d, upstream main.

## Direct procedure and evidence

1. Admit clean upstream source and preserve original library workspace. Register the separate repository through native topology assessment/reconciliation. Completed with audit:761222b455914be8b333469784cfb70f.
2. In the isolated task pin package.json to exact 0.1.18, synchronize pnpm and npm locks using their original tools, and update the README version. The old npm lock described an unrelated starter and must be synchronized to the actual manifest.
3. Hydrate frozen dependencies; execute original `tsc -b && vite build` through the repository native playground-build profile. Build fixture invokes the unchanged original script and checks the installed version. Preserve failures and diagnose before changed-source validation.
4. Commit only the manifest, both locks, README, native validation manifest/runner and this continuity record. Submit, integrate through original policy gates, then non-force push upstream main. Verify exact remote HEAD. If remote diverges, stop and reconcile; never force-push or replay an uncertain push.

Existing Owner instruction covers registration, dependency change, verification, commit/push and routine repairs. Native source/integration/credential gates remain applicable. No runtime or production deployment is requested. No unrelated library implementation changes or peer delegation.

## Precision checks

Structure/modularity: existing React/Vite app and public package identity retained.
Scope: seven declared source paths; parent libraries unchanged.
Generic/profile/scale: N/A for a dependency-only app update; native build profile uses original app entrypoint.
Recovery: changed source invalidates source-bound build evidence; helper readback failures do not justify replaying effects.
Closure: frozen install/build PASS, exact source receipt, attached repository and verified upstream commit required. Solo self-review only.
