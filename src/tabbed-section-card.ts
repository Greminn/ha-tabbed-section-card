import { LitElement, html, nothing, PropertyValues, TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import styles from './styles'
import { cssColor, findTab, tabId, tabLabel } from './tabs'
import { HomeAssistant, TabbedSectionCardConfig, TabConfig } from './types'
import './editor'

const CARD_VERSION = '0.1.1'

console.info(
  `%c TABBED-SECTION-CARD %c v${CARD_VERSION} `,
  'color: white; background: #3f8fd2; font-weight: 700;',
  'color: #3f8fd2; background: white; font-weight: 700;'
)

const w = window as any
w.customCards = w.customCards || []
w.customCards.push({
  type: 'tabbed-section-card',
  name: 'Tabbed Section Card',
  description: 'A tab bar where every tab is a full sections-view section.',
  preview: false
})

const ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart']

@customElement('tabbed-section-card')
export class TabbedSectionCard extends LitElement {
  static styles = styles

  @property({ attribute: false }) public hass?: HomeAssistant
  /** Set by hui-card when the card is shown in an editor preview. */
  @property({ type: Boolean }) public editMode = false

  @state() private _config?: TabbedSectionCardConfig
  @state() private _active = 0
  @state() private _visited = new Set<number>()
  @state() private _sectionMissing = false

  private _idleTimer?: number
  // hui-section re-initialises its cards whenever `config` changes identity, so keep one per tab.
  private _sections = new WeakMap<TabConfig, { type: string; cards: any[] }>()

  static getConfigElement() {
    return document.createElement('tabbed-section-card-editor')
  }

  static getStubConfig() {
    return {
      type: 'custom:tabbed-section-card',
      tabs: [
        { name: 'Home', icon: 'mdi:home', cards: [] },
        { name: 'More', icon: 'mdi:dots-horizontal', cards: [] }
      ]
    }
  }

  public setConfig(config: TabbedSectionCardConfig): void {
    if (!config || !Array.isArray(config.tabs) || config.tabs.length === 0) {
      throw new Error('tabbed-section-card: define at least one entry in `tabs`')
    }
    const firstLoad = !this._config
    this._config = config
    if (firstLoad || this._active >= config.tabs.length) {
      this._select(this._defaultIndex(), false)
    }
    this._armIdle()
  }

  public getCardSize(): number {
    return 8
  }

  public getGridOptions() {
    return { columns: 12, rows: 'auto', min_columns: 6 }
  }

  connectedCallback(): void {
    super.connectedCallback()
    window.addEventListener('ll-custom', this._onCustomAction)
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, this._armIdle, { passive: true, capture: true }))
    this._armIdle()
    if (!customElements.get('hui-section')) {
      // hui-section ships with the sections view; if it never appears this isn't a sections dashboard.
      window.setTimeout(() => {
        if (!customElements.get('hui-section')) this._sectionMissing = true
      }, 5000)
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    window.removeEventListener('ll-custom', this._onCustomAction)
    ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, this._armIdle, { capture: true } as any))
    window.clearTimeout(this._idleTimer)
  }

  private _defaultIndex(): number {
    const tabs = this._config?.tabs ?? []
    const i = findTab(tabs, this._config?.default_tab)
    return i >= 0 ? i : 0
  }

  private _select(index: number, arm = true): void {
    this._active = index
    if (!this._visited.has(index)) this._visited = new Set(this._visited).add(index)
    // Charts / maps that were laid out while hidden need a nudge to size themselves.
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
    if (arm) this._armIdle()
  }

  private _armIdle = (): void => {
    window.clearTimeout(this._idleTimer)
    const seconds = Number(this._config?.idle_return)
    if (!seconds || seconds <= 0 || this._active === this._defaultIndex()) return
    this._idleTimer = window.setTimeout(() => this._select(this._defaultIndex(), false), seconds * 1000)
  }

  /**
   * Switch tab from any card via a `fire-dom-event` action:
   *   tap_action: { action: fire-dom-event, tabbed_section_card: { tab: vacuum } }
   */
  private _onCustomAction = (ev: Event): void => {
    const target = (ev as CustomEvent).detail?.tabbed_section_card
    if (!target || !this._config) return
    const i = findTab(this._config.tabs, target.tab)
    if (i >= 0) this._select(i)
  }

  private _sectionConfig(tab: TabConfig) {
    let section = this._sections.get(tab)
    if (!section) {
      section = { type: 'grid', cards: tab.cards ?? [] }
      this._sections.set(tab, section)
    }
    return section
  }

  protected render(): TemplateResult | typeof nothing {
    const config = this._config
    if (!config) return nothing
    const display = config.tab_display ?? 'both'

    return html`
      <div
        class="bar align-${config.align ?? 'justify'}"
        role="tablist"
        style=${styleMap({ '--tsc-active-color': cssColor(config.color) })}
      >
        <div class="track"></div>
        ${config.tabs.map((tab, i) => {
          const label = tabLabel(tab, i)
          const showIcon = display !== 'label' && tab.icon
          return html`
            <button
              class="tab"
              role="tab"
              id="tab-${tabId(tab, i)}"
              aria-selected=${i === this._active ? 'true' : 'false'}
              aria-label=${label}
              @click=${() => this._select(i)}
            >
              ${showIcon ? html`<ha-icon .icon=${tab.icon}></ha-icon>` : nothing}
              ${display !== 'icon' || !tab.icon ? html`<span>${label}</span>` : nothing}
            </button>
          `
        })}
      </div>
      ${this._sectionMissing
        ? html`<div class="message">
            Tabbed Section Card needs a <b>sections</b> view — the section element isn't available here.
          </div>`
        : config.tabs.map((tab, i) =>
            this._visited.has(i)
              ? html`
                  <div class="panel" role="tabpanel" aria-labelledby="tab-${tabId(tab, i)}" ?hidden=${i !== this._active}>
                    <hui-section
                      .hass=${this.hass}
                      .config=${this._sectionConfig(tab)}
                      .preview=${this.editMode}
                      .index=${0}
                      .viewIndex=${0}
                    ></hui-section>
                  </div>
                `
              : nothing
          )}
    `
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('_config')) this._armIdle()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tabbed-section-card': TabbedSectionCard
  }
}
