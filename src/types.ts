export interface HomeAssistant {
  localize: (key: string, ...args: any[]) => string
  [key: string]: any
}

export interface LovelaceCardConfig {
  type: string
  grid_options?: Record<string, any>
  visibility?: any[]
  [key: string]: any
}

export type TabDisplay = 'both' | 'icon' | 'label'
export type TabAlign = 'start' | 'center' | 'end' | 'justify'

export interface TabConfig {
  /** Label shown on the tab. */
  name?: string
  /** Stable reference for switch-tab actions and `default_tab`. Defaults to a slug of `name`. */
  id?: string
  icon?: string
  /** Cards in this tab, laid out on the sections 12-column grid. */
  cards?: LovelaceCardConfig[]
}

export interface TabbedSectionCardConfig {
  type: string
  tabs: TabConfig[]
  /** Tab id, name or zero-based index shown first (and returned to on idle). */
  default_tab?: string | number
  /** Seconds of no interaction before returning to `default_tab`. 0 / unset disables. */
  idle_return?: number
  /** Colour of the selected tab: an HA colour name (grey, blue, …) or any CSS colour. Default grey. */
  color?: string
  tab_display?: TabDisplay
  align?: TabAlign
}
