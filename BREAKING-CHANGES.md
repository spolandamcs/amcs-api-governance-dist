# Breaking changes

Tags in this repo are cut **only for breaking changes** — see `README.md` for the policy. Each tag below documents what changed and what consumers must do.

A change is "breaking" if it could fail a previously-passing consumer's `spectral lint`:

- A new rule at `warn` or `error` severity that fires on existing specs.
- An existing rule's severity raised from `info` → `warn` (or `warn` → `error`).
- An entry removed from a rule's allow-list (e.g., `singletons`).
- A rule renamed or removed that consumers may reference in their own overrides.

Non-breaking changes ship to `main` directly and are not listed here.

## v0.1.0 — 2026-05-08

Initial drop. No prior baseline; nothing to migrate.
