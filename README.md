# amcs-api-governance-dist

Distribution repo for the AMCS REST API Guidelines Spectral ruleset.

This repo hosts the bundled `amcs-api-guidelines.js` so it can be consumed by Spectral via a stable HTTPS URL — mimicking the production CDN/blob pattern the company will eventually use.

## Consume from Spectral

In your `.spectral.yaml`:

```yaml
extends:
  - https://raw.githubusercontent.com/spolandamcs/amcs-api-governance-dist/v0.1.0/amcs-api-guidelines.js
```

Always pin to a tag, not a branch — tag URLs are immutable in practice.

## Source

Built from `https://dev.azure.com/amcsgroup/Platform%20Engineering/_git/ApiGovernance`. See `meta.json` for the exact build provenance. Do not edit the `.js` file directly — it's a bundled output.

## Releases

| Tag | Notes |
|-----|-------|
| `v0.1.0` | Initial drop — bundled at 2026-05-08 from the upstream ApiGovernance repo. |
