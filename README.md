# amcs-api-governance-dist

Distribution repo for the **AMCS REST API Guidelines** Spectral ruleset.

This repo hosts the bundled `amcs-api-guidelines.js`. Consumers fetch it over HTTPS at lint time — mimicking the production CDN/blob pattern the company will eventually use.

## Consume from Spectral

Default — track `main` (rolling):

```
--ruleset https://raw.githubusercontent.com/spolandamcs/amcs-api-governance-dist/main/amcs-api-guidelines.js
```

Stable — pin to a release tag:

```
--ruleset https://raw.githubusercontent.com/spolandamcs/amcs-api-governance-dist/v0.1.0/amcs-api-guidelines.js
```

You can pass that URL directly to `spectral lint --ruleset <url>`, or reference it from a `.spectral.yaml` `extends:` list.

## Versioning policy

We follow a **rolling-`main`** model with **breaking-only tags**:

- `main` is the live ruleset. Non-breaking changes — clarified error messages, new `info`-severity rules, additions to the `singletons` allow-list — land directly on `main` and propagate to every consumer on their next lint.
- **Tags are cut only on breaking changes** — anything that could fail an existing consumer's gate. Concretely: adding a new `warn`/`error`-severity rule, raising an existing rule's severity, removing an allow-list entry, or removing/renaming a rule consumers depend on.
- When a tag is cut, `BREAKING-CHANGES.md` records the reason and the consumer migration path.

The tag is the **opt-in stability hatch**: pin to a tag if you can't take the new gating rule yet, then unpin once you're caught up.

## How "the blob" actually works

`raw.githubusercontent.com` serves the bytes of any file in this repo at any ref (branch, tag, or commit SHA). The URL shape is:

```
https://raw.githubusercontent.com/<owner>/<repo>/<ref>/<path>
```

For this repo:

| Ref type | Example | Behavior |
|---|---|---|
| Branch | `…/main/amcs-api-guidelines.js` | Resolves to whatever `main` points at *now*. Tracks every push. |
| Tag | `…/v0.1.0/amcs-api-guidelines.js` | Resolves to the commit the tag points at. Tags are conventionally immutable. |
| Commit SHA | `…/ad6d331/amcs-api-guidelines.js` | Resolves to the exact bytes at that commit. Fully immutable. |

Spectral fetches the bytes, evaluates the file as an ES module, and applies its exported rules to your spec. No GitHub-specific client, no auth — anonymous HTTPS GET because this repo is public.

## Tagging — what it is, mechanically

A Git tag is a named pointer to a commit. Creating one:

```sh
git tag -a v0.2.0 -m "Adds amcs-uri-no-trailing-slash rule (breaking: previously-passing specs may now fail)"
git push origin v0.2.0
```

Once pushed, the URL `…/v0.2.0/amcs-api-guidelines.js` immediately serves the file as of that commit. Tags are intended to be immutable — once published, consumers expect that URL to keep returning the same bytes forever. If you ever need to "fix" a tagged release, cut a new tag (`v0.2.1`); don't move the old one.

## Cutting a release

1. Land the change on `main` (via PR; the bundled `.js` is generated upstream and dropped into this repo).
2. Decide: is it breaking? Use the criteria above. If yes:
   1. Add an entry to `BREAKING-CHANGES.md` describing what changed and what consumers must do.
   2. `git tag -a vX.Y.0 -m "..."`, `git push origin vX.Y.0`.
   3. Notify consumers (email / channel) so they can pin if they can't take the change immediately.
3. If non-breaking: nothing else to do — consumers on `main` pick it up automatically.

## Source

Built from `https://dev.azure.com/amcsgroup/Platform%20Engineering/_git/ApiGovernance`. See `meta.json` for the exact build provenance. Do not edit `amcs-api-guidelines.js` by hand — it's a bundled output.

## Releases

| Tag | Date | Notes |
|-----|------|-------|
| `v0.1.0` | 2026-05-08 | Initial drop. |
