# Native Integration

## Purpose

`xenor-web` is the public surface for Xenor. `xenor-native` remains a separate
repository that carries the deterministic native backend. This repository tracks
that backend as a Git submodule so documentation and CI can pin a specific
native revision.

Standalone repository:

- `https://github.com/XENOr-god/xenor-native`

Submodule path in this repository:

- `xenor-native/`

## Clone And Initialize

Clone with submodules:

```bash
git clone --recurse-submodules https://github.com/XENOr-god/xenor-site.git
```

Initialize later if needed:

```bash
git submodule update --init --recursive
```

Practical local helper:

```bash
make submodules-init
```

## Local Development Flow

- run `npm install` or `npm ci` for the site dependencies
- ensure `xenor-native/` is present and initialized
- use `make native-test` or `make native-smoke` when you need to validate the
  pinned native revision from the site repository
- update the submodule only when the standalone native repository has the
  desired commit published and reviewed

## Updating The xenor-native Pointer

When the standalone native repository advances and `xenor-web` should follow:

```bash
git submodule update --remote --recursive xenor-native
git status
git add xenor-native
git commit -m "chore: bump xenor-native submodule"
```

If you want the helper command surface instead:

```bash
make submodules-update
```

Then review the new submodule commit, run the native validation commands again,
and push the pointer update through the normal `xenor-web` workflow.

## Automatic Sync

`xenor-web` can also receive an automatic sync request from `xenor-native`.
When `xenor-native` finishes a successful validation run on `main`, it sends a
`repository_dispatch` event to this repository. The sync workflow then:

- checks out `xenor-web` with submodules
- resolves the target `xenor-native` commit from the dispatch payload or a
  manual override
- updates the `xenor-native/` submodule pointer
- reruns `make lint`, `make native-test`, and `make native-smoke`
- pushes the result to a dedicated automation branch
- opens or refreshes a pull request instead of pushing directly to `main`

The automation is intentionally PR-based. This keeps the update reviewable and
avoids silent bot writes to the default branch.

### Required Secrets And Settings

- `xenor-native` repository secret: `XENOR_SYNC_TOKEN`
- minimum classic PAT scope: `repo`
- minimum fine-grained PAT access: repository access to
  `XENOr-god/xenor-site` with `Contents: write`
- `xenor-web` relies on its built-in `GITHUB_TOKEN` for the automation branch
  push and PR creation

For the PR creation step to succeed, the repository or organization must allow
GitHub Actions to create pull requests in Settings > Actions > General.

## Manual Fallback

If dispatch-based sync is unavailable or needs manual recovery:

1. Run the sync workflow with `workflow_dispatch` and optionally provide a
   target `xenor-native` SHA.
2. Or update locally with `git submodule update --remote --recursive xenor-native`.
3. Run `make lint`, `make native-test`, and `make native-smoke`.
4. Commit the pointer update and open a normal pull request.

## CI Integration

The `xenor-web` GitHub Actions workflow does four explicit things around the
submodule:

- checks out the repository with `submodules: recursive`
- verifies `git submodule status --recursive`
- runs `cargo test` inside `xenor-native`
- runs a lightweight native CLI smoke command so broken or missing submodule
  checkouts fail clearly

The automated sync workflow builds on the same validation surface before it
creates or updates a pull request.

CI treats the submodule as a pinned dependency, not as vendored source.
