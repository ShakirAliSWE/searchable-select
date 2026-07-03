# Contributing

Thanks for considering a contribution!

## Setup

```bash
git clone https://github.com/shakiraliswe/searchable-select.git
cd searchable-select
npm install
```

## Workflow

```bash
npm run dev         # tsup --watch, rebuilds on save
npm run test:watch  # vitest in watch mode
npm run lint
npm run typecheck
```

## Adding a new component

1. Create `src/components/<Name>/` with `<Name>.tsx`, `<Name>.types.ts`,
   `<Name>.test.tsx`, and `index.ts` (mirroring `SearchableSelect/`).
2. Export it from `src/index.ts`.
3. No changes needed to `tsup.config.ts` or the `exports` field in
   `package.json` — the single entry point covers new components
   automatically.

## Submitting changes

1. Fork and branch off `main`.
2. Make your change, with tests.
3. Run `npx changeset` and describe the change (patch/minor/major).
4. Open a PR. CI runs lint, typecheck, tests, build, and a bundle-size check.

## Release process

Releases are automated via [Changesets](https://github.com/changesets/changesets).
Merging a PR with a changeset into `main` triggers a "Version Packages" PR;
merging that PR publishes to npm.
