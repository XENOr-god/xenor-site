# xenor-site

`xenor-site` is the canonical public surface for the XENOr stack. It is where
newcomers should start, and it is responsible for keeping the public overview,
repository map, architecture framing, and official links aligned in one place.

## Status

Active public surface repository. The site is live and useful today, but this
repository is still an actively evolving application rather than a versioned
package or SDK.

## Why This Repo Exists

This repository exists so the XENOr stack has one deliberate public entry point.
It should explain the stack cleanly, reduce ambiguity between `xenor-core`,
`xenor-sim`, and `xenor-engine`, and give visitors a trustworthy route into the
rest of the repositories.

## Relationship to the XENOr Stack

- `xenor-site` is the first repo most visitors should open
- `xenor-core` is the deterministic execution/core systems layer
- `xenor-sim` is the scenario and validation layer
- `xenor-engine` is the deterministic engine and replay/snapshot substrate
- `xenor-sale` is archived historical research and not the active launch path

## Quick Start / Local Development

Runtime: a current Node.js toolchain compatible with Next.js 16.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Useful commands:

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run lint` — run ESLint
- `make submodules-init` — initialize and sync git submodules
- `make native-smoke` — run a lightweight deterministic smoke command inside
  `xenor-native`

## xenor-native Submodule

This GitHub repo is `xenor-site`, while the local Next.js workspace and package
are still named `xenor-web`. The repository also carries a pinned
`xenor-native` Git submodule so the public site can reference a reviewed native
revision instead of copying native code into the web repo.

- GitHub: `https://github.com/XENOr-god/xenor-native`
- local path: `xenor-native/`

Clone with submodules from the start:

```bash
git clone --recurse-submodules https://github.com/XENOr-god/xenor-site.git
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
```

Integration details live in
[`docs/native-integration.md`](docs/native-integration.md).

## Repository Boundaries / Non-goals

- This is not the authoritative execution/core systems repo. Use `xenor-core`
  for that.
- This is not the main scenario-validation repo. Use `xenor-sim` for that.
- This is not the deterministic engine substrate. Use `xenor-engine` for that.
- This is not current sale or launch infrastructure. `xenor-sale` is
  historical only.

## Environment

Copy `.env.example` to `.env.local` and set the values that apply to the
current deployment.

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

## Related Repositories

- [`xenor-core`](https://github.com/XENOr-god/xenor-core) — deterministic
  execution/core systems layer
- [`xenor-sim`](https://github.com/XENOr-god/xenor-sim) — scenario and
  validation layer
- [`xenor-engine`](https://github.com/XENOr-god/xenor-engine) — deterministic
  engine and replay/snapshot substrate
- [`xenor-sale`](https://github.com/XENOr-god/xenor-sale) — archived
  historical sale prototype

## Contributing

No standalone contributing guide is currently published in this repository.
Use issues or pull requests for concrete fixes, and use GitHub Discussions for
broader site or public-surface questions.

## License

No standalone license file is currently published in this repository.
