# Refactor Summary

This iteration streamlines the project to focus solely on the weekly report workflow and prepares the codebase for a simplified web-only interface.

## Key Changes

- Removed the changelog feature and related components.
- Simplified application state to track only weekly report data.
- Updated styles to use scoped Less files without Tampermonkey-specific handling.
- Ensured build scripts output both userscript and web bundles without missing assets.

## Next Steps

- Continue migrating remaining components to the Zustand store.
- Replace any leftover Tampermonkey abstractions with standard web APIs.
- Iterate on UI layout for the standalone web interface.
