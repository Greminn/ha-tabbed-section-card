# Changelog

## 0.1.1

- Add README screenshot (HACS image check).
- Rebuild `dist/`; no functional changes.

## 0.1.0

- First release.
- Tab bar where each tab is a full sections-view section (12-column grid, `grid_options`, per-card `visibility`).
- Tab bar styled after HA tile features (`--control-select-*`, `--feature-height`, `--feature-border-radius`);
  selected-tab `color` option (default grey).
- `default_tab` and `idle_return` (return to the default tab after N seconds without interaction).
- Switch tabs from any card via a `fire-dom-event` action (`tabbed_section_card: { tab }`).
- Visual editor: add / reorder / duplicate / delete tabs, and add / edit / reorder / copy / cut cards using HA's
  native card editor (Config, Visibility and Layout tabs).
