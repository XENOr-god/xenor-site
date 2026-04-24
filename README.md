# xenor-site

`xenor-site` is the canonical public surface for the XENOr stack. This repository provides the main public entry point, repository map, architecture overview, official links, and a lightweight simulation surface for explaining how the XENOr ecosystem fits together.

The site is built with Next.js, TypeScript, and CSS, and is intended to serve as the primary starting point for developers, contributors, and visitors who want to understand the XENOr project.

## Overview

XENOr is organized as a multi-repository stack. This repository focuses on the public-facing website and documentation layer, while the execution, simulation, and engine responsibilities are handled by dedicated repositories.

`xenor-site` helps visitors understand:

* What XENOr is
* How the XENOr repositories relate to each other
* Where to find the core systems, simulation layer, and deterministic engine
* How public contract, market, and presence data are surfaced
* How the deterministic simulation demo connects to the broader stack

## Repository Status

This repository is an active public surface for the XENOr stack. The application is currently evolving and should be treated as a live website project rather than a stable SDK or versioned package.

## Tech Stack

* Next.js
* TypeScript
* CSS
* Node.js
* Git submodules
* Vercel deployment target

## Repository Structure

```txt
.
├── app/                    # Main Next.js application routes and logic
├── docs/                   # Project documentation
├── public/                 # Static public assets
├── xenor-native/           # Pinned native submodule
├── .github/workflows/      # GitHub Actions workflows
├── Makefile                # Development and integration commands
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Project scripts and dependencies
└── README.md               # Project overview
```

## Relationship to the XENOr Stack

The XENOr stack is divided into several repositories with different responsibilities:

| Repository     | Purpose                                                                   |
| -------------- | ------------------------------------------------------------------------- |
| `xenor-site`   | Public website, repository map, official links, and documentation surface |
| `xenor-core`   | Deterministic execution and core systems layer                            |
| `xenor-sim`    | Scenario and validation layer                                             |
| `xenor-engine` | Deterministic engine, replay, and snapshot substrate                      |
| `xenor-sale`   | Archived historical sale prototype                                        |

## Local Development

### Requirements

Use a current Node.js toolchain compatible with the Next.js version used by this project.

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Then open:

```txt
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Run Linting

```bash
npm run lint
```

## Working with Submodules

This repository includes a pinned `xenor-native` Git submodule. The submodule allows the public site to reference a reviewed native revision without copying native code directly into the web repository.

Clone the repository with submodules:

```bash
git clone --recurse-submodules https://github.com/XENOr-god/xenor-site.git
```

If the repository was cloned without submodules, initialize them manually:

```bash
git submodule update --init --recursive
```

Useful Makefile commands:

```bash
make submodules-init
make native-smoke
```

## Deterministic Simulation Surface

The `/simulation` route demonstrates an end-to-end deterministic surface for the XENOr stack.

It consumes a generated contract from:

```txt
app/lib/generated/settlement-demo.generated.ts
```

The generated data is produced by the Rust settlement economy slice in `xenor-engine`. The simulation page is intentionally lightweight, but the values and digests are based on real scenario execution, replay verification, snapshot resume, and fixture checks.

To regenerate the deterministic settlement demo contract:

```bash
cargo run --manifest-path ../xenor-engine/rust/Cargo.toml --example settlement_site_demo
```

## Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Then configure the values required for the current deployment.

### Contract and Routing

| Variable                               | Description                                       |
| -------------------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_CONTRACT_ADDRESS`         | Canonical contract address displayed on the site  |
| `NEXT_PUBLIC_CHAIN_ID`                 | Chain ID used by market and explorer routes       |
| `NEXT_PUBLIC_TOKEN_ADDRESS`            | Token address used for token intelligence lookups |
| `NEXT_PUBLIC_PAIR_ADDRESS`             | Pair address for market references                |
| `NEXT_PUBLIC_DEXSCREENER_PAIR_ADDRESS` | Legacy fallback pair alias                        |
| `NEXT_PUBLIC_EXPLORER_URL`             | Explicit explorer URL override                    |
| `NEXT_PUBLIC_DEXSCREENER_URL`          | DexScreener base URL or direct route              |
| `NEXT_PUBLIC_TRADING_URL`              | Direct trading route override                     |

### Presence and Public Channels

| Variable                      | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_GITHUB_ORG`      | GitHub organization or owner used on the Presence page |
| `NEXT_PUBLIC_GITHUB_REPOS`    | Comma-separated list of public repositories            |
| `NEXT_PUBLIC_X_ACCOUNT`       | Canonical X account                                    |
| `NEXT_PUBLIC_DEXSCREENER_API` | DexScreener search endpoint override                   |

### Token Intelligence and Overrides

| Variable                  | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `SOLANA_RPC_URL`          | Optional Solana RPC endpoint for holder and token data |
| `NEXT_PUBLIC_DEV_WALLET`  | Optional wallet used for developer holder calculations |
| `SOLANA_TRACKER_API_KEY`  | Optional Solana Tracker API key                        |
| `SOLANA_TRACKER_API_BASE` | Optional Solana Tracker API base override              |
| `TOKEN_INTEL_OVERRIDE_*`  | Optional manual overrides for token intelligence cards |

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run lint
```

Runs ESLint checks.

```bash
make submodules-init
```

Initializes and synchronizes Git submodules.

```bash
make native-smoke
```

Runs a lightweight deterministic smoke command inside `xenor-native`.

## Repository Boundaries

This repository is focused on the public website and documentation surface.

It is not intended to replace the dedicated repositories responsible for execution, simulation, or engine logic.

Use the following repositories for lower-level responsibilities:

* `xenor-core` for deterministic execution and core systems
* `xenor-sim` for scenario validation
* `xenor-engine` for deterministic engine, replay, and snapshot functionality
* `xenor-sale` only for archived historical sale research

## Deployment

The public site is deployed at:

```txt
https://xenor-site.vercel.app
```

Deployment should be configured with the appropriate public environment variables for contract, explorer, market, and presence data.

## Contributing

No standalone contributing guide is currently published for this repository.

For small fixes, open a pull request with a clear explanation of the change.

For larger changes, architecture questions, or public-surface discussions, open an issue or use GitHub Discussions before implementing major updates.

Recommended contribution flow:

1. Fork the repository
2. Create a feature branch
3. Make the change
4. Run linting and build checks
5. Open a pull request with a concise summary

## License

No standalone license file is currently published in this repository.

Before reusing, distributing, or modifying this project outside the repository, confirm the intended licensing terms with the repository owner.

## Related Links

* Public site: `https://xenor-site.vercel.app`
* Repository: `https://github.com/XENOr-god/xenor-site`
* Native submodule: `https://github.com/XENOr-god/xenor-native`
