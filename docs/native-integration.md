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

## CI Integration

The `xenor-web` GitHub Actions workflow does four explicit things around the
submodule:

- checks out the repository with `submodules: recursive`
- verifies `git submodule status --recursive`
- runs `cargo test` inside `xenor-native`
- runs a lightweight native CLI smoke command so broken or missing submodule
  checkouts fail clearly

CI treats the submodule as a pinned dependency, not as vendored source.
