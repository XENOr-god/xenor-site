# XENØr Site

Canonical public surface for the XENØr research stack.

This repository contains the public-facing site for XENØr. It keeps
architecture, repository boundaries, contract context, and official presence
aligned through one inspectable surface.

## Focus

- canonical public surface
- architecture and research framing
- repository map and module boundaries
- contract and market-context references
- verified public presence and communication routes

## Design Principles

- one canonical route for public context
- explicit separation between execution, simulation, and public surface
- release language tied to inspectable evidence
- public references that resolve cleanly across routes
- research-first communication instead of hype-first messaging

## Public Routes

- `/` — homepage and top-level public surface
- `/vision` — project thesis and research direction
- `/architecture` — execution, validation, and public surface boundaries
- `/repositories` — public map for `xenor-core`, `xenor-sim`, and `xenor-site`
- `/contract` — canonical contract and launch-context surface
- `/presence` — official channels and public trust boundaries

## Related Repositories

- **xenor-core** — deterministic execution core
- **xenor-sim** — simulation and validation environment
- **xenor-sale** — archived research record kept for reference only

## Local Development

Run the development server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Useful commands:

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run lint` — run ESLint

## Environment

Copy `.env.example` to `.env.local` and set the values that apply to the current
deployment.

Contract and routing:

- `NEXT_PUBLIC_CONTRACT_ADDRESS` — canonical contract address shown on the site
- `NEXT_PUBLIC_CHAIN_ID` — chain id used by market and explorer routes
- `NEXT_PUBLIC_TOKEN_ADDRESS` — token address used for token intel lookups
- `NEXT_PUBLIC_PAIR_ADDRESS` — pair address for market references
- `NEXT_PUBLIC_DEXSCREENER_PAIR_ADDRESS` — legacy fallback pair alias
- `NEXT_PUBLIC_EXPLORER_URL` — explicit explorer URL override
- `NEXT_PUBLIC_DEXSCREENER_URL` — DexScreener base or direct route
- `NEXT_PUBLIC_TRADING_URL` — direct trading route override

Presence and public channels:

- `NEXT_PUBLIC_GITHUB_ORG` — GitHub organization or owner used on Presence
- `NEXT_PUBLIC_GITHUB_REPOS` — comma-separated public repository list
- `NEXT_PUBLIC_X_ACCOUNT` — canonical X account
- `NEXT_PUBLIC_DEXSCREENER_API` — DexScreener search endpoint override

Token intel and overrides:

- `SOLANA_RPC_URL` — optional Solana RPC for holders and Top 10 H reads
- `NEXT_PUBLIC_DEV_WALLET` — optional wallet used for Dev H calculations
- `SOLANA_TRACKER_API_KEY` — optional Solana Tracker API key
- `SOLANA_TRACKER_API_BASE` — optional Solana Tracker API base override
- `TOKEN_INTEL_OVERRIDE_*` — optional manual overrides for token intel cards

The Contract page uses these values to resolve explorer routes, market context,
and token telemetry. The Presence page uses them to render official channels and
public references.

## Status

Active public surface repository for the XENØr stack.
