# CLAUDE.md

## What this is
`custom:tabbed-section-card` — tab bar whose tabs are each a real sections-view section. TypeScript + Lit, bundled
with Rollup (same toolchain as other Lit + Rollup HA cards). Distributed via HACS (custom repository) and GitHub releases; MIT.

## Commands
`npm run build` → `dist/tabbed-section-card.js` · `npm run lint` (`--max-warnings 0`) · `npm start` dev server :5000.
No test suite; verify in a real HA.

## Source
- `src/tabbed-section-card.ts` — the card. Renders one `hui-section` per tab (created lazily on first visit, then
  kept alive/hidden). The `{type:'grid', cards}` section config is cached per tab in a WeakMap because `hui-section`
  rebuilds all its cards whenever `config` changes identity. Also: `idle_return`, and tab switching via the
  `ll-custom` window event (`fire-dom-event` action with a `tabbed_section_card: {tab}` key).
- `src/editor.ts` — modelled on HA's `hui-stack-card-editor`: `ha-tab-group` for tabs, a second one for cards, and
  `hui-card-element-editor` (with `.sectionConfig={type:'grid'}` + `show-visibility-tab` to get the Layout and
  Visibility tabs) / `hui-card-picker`. Editor deps are lazy-registered by loading the stack card's editor.
- `src/tabs.ts` — tab id/slug/lookup helpers. `src/types.ts`, `src/styles.ts`.

## Why the editor is inline (don't "fix" this)
In-place editing on the dashboard doesn't work: `hui-card-edit-mode` overlays the whole card on hover, and HA reuses
a single `hui-dialog-edit-card`, so opening it from inside this card's own editor dialog would clobber it.

## Internal HA APIs relied on
`hui-section`, `hui-card-element-editor`, `hui-card-picker`, `ha-tab-group(-tab)`, `window.loadCardHelpers`.
Re-check these after HA frontend upgrades (source: home-assistant/frontend, `src/panels/lovelace/`).

## Test environment
No test suite. Build, copy `dist/tabbed-section-card.js` to `config/www/` of a Home Assistant with a sections-view
dashboard, add the resource `/local/tabbed-section-card.js?v=N`, and bump `N` after each rebuild. Keep personal
example configs (real entity IDs) out of git: `examples/local-*` is git-ignored.
