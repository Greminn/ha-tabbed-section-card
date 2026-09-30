import { TabConfig } from './types'

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** The id other things (default_tab, switch-tab actions) use to refer to a tab. */
export const tabId = (tab: TabConfig, index: number): string =>
  (tab.id && slug(tab.id)) || (tab.name && slug(tab.name)) || `tab-${index + 1}`

export const tabLabel = (tab: TabConfig, index: number): string => tab.name || `Tab ${index + 1}`

/** Resolve an id, name or zero-based index to a tab index, or -1. */
export function findTab(tabs: TabConfig[], ref: unknown): number {
  if (ref === undefined || ref === null || ref === '') return -1
  if (typeof ref === 'number') return ref >= 0 && ref < tabs.length ? ref : -1
  const s = slug(String(ref))
  const found = tabs.findIndex((t, i) => tabId(t, i) === s)
  if (found >= 0) return found
  if (/^\d+$/.test(s) && Number(s) < tabs.length) return Number(s)
  return -1
}

/** HA colour name (e.g. `grey`, `blue`), CSS colour or var() -> a CSS value. Undefined keeps the default. */
export function cssColor(color?: string): string | undefined {
  if (!color) return undefined
  return /^[a-z]+$/i.test(color) ? `var(--${color.toLowerCase()}-color)` : color
}
