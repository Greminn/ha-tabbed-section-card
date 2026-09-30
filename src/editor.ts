import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { keyed } from 'lit/directives/keyed.js'

import { tabId, tabLabel } from './tabs'
import { HomeAssistant, LovelaceCardConfig, TabbedSectionCardConfig, TabConfig } from './types'

const CLIPBOARD_KEY = 'dashboardCardClipboard'
const GRID_SECTION = { type: 'grid' }

const writeClipboard = (card: LovelaceCardConfig) => {
  try {
    sessionStorage.setItem(CLIPBOARD_KEY, JSON.stringify(card))
  } catch {
    /* clipboard is a nicety */
  }
}

const LABELS: Record<string, string> = {
  default_tab: 'Default tab',
  idle_return: 'Return to default tab after (seconds, 0 = never)',
  color: 'Selected tab colour',
  tab_display: 'Tab display',
  align: 'Tab alignment',
  name: 'Name',
  icon: 'Icon',
  id: 'ID (optional — used by default tab and switch-tab actions)'
}

@customElement('tabbed-section-card-editor')
export class TabbedSectionCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant
  @property({ attribute: false }) public lovelace?: any

  @state() private _config?: TabbedSectionCardConfig
  @state() private _tab = 0
  @state() private _card = 0
  @state() private _GUImode = true
  @state() private _guiModeAvailable = true
  @state() private _depsReady = false

  @query('hui-card-element-editor') private _cardEditorEl?: any

  private _keys = new Map<string, string>()

  connectedCallback(): void {
    super.connectedCallback()
    this._loadDeps()
  }

  /** The stack card's editor imports every editor component we reuse, so load it to register them. */
  private async _loadDeps() {
    try {
      const helpers = await (window as any).loadCardHelpers()
      const stack = await helpers.createCardElement({ type: 'vertical-stack', cards: [] })
      await stack.constructor.getConfigElement()
      await Promise.all(
        ['hui-card-element-editor', 'hui-card-picker', 'ha-tab-group', 'ha-form'].map((t) => customElements.whenDefined(t))
      )
    } finally {
      this._depsReady = true
    }
  }

  public setConfig(config: TabbedSectionCardConfig): void {
    this._config = config
    if (this._tab >= (config.tabs?.length ?? 0)) this._tab = Math.max(0, (config.tabs?.length ?? 1) - 1)
  }

  private get _tabs(): TabConfig[] {
    return this._config?.tabs ?? []
  }

  private _emit(config: TabbedSectionCardConfig) {
    this._config = config
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }))
  }

  private _setTabs(tabs: TabConfig[]) {
    this._keys.clear()
    this._emit({ ...this._config!, tabs })
  }

  private _updateTab(index: number, patch: Partial<TabConfig>) {
    const tabs = [...this._tabs]
    tabs[index] = { ...tabs[index], ...patch }
    this._emit({ ...this._config!, tabs })
  }

  private _key(kind: string, ...parts: number[]) {
    const key = `${kind}-${parts.join('-')}`
    if (!this._keys.has(key)) this._keys.set(key, Math.random().toString())
    return this._keys.get(key)!
  }

  private _label = (schema: { name: string }) => LABELS[schema.name] ?? schema.name

  // ---- general options ------------------------------------------------

  private _generalSchema() {
    return [
      {
        name: 'default_tab',
        selector: {
          select: {
            mode: 'dropdown',
            options: this._tabs.map((t, i) => ({ value: tabId(t, i), label: tabLabel(t, i) }))
          }
        }
      },
      {
        name: 'idle_return',
        selector: { number: { min: 0, max: 3600, step: 5, mode: 'box', unit_of_measurement: 's' } }
      },
      { name: 'color', selector: { ui_color: {} } },
      {
        type: 'grid',
        name: '',
        schema: [
          {
            name: 'tab_display',
            selector: {
              select: {
                mode: 'dropdown',
                options: [
                  { value: 'both', label: 'Icon and label' },
                  { value: 'icon', label: 'Icon only' },
                  { value: 'label', label: 'Label only' }
                ]
              }
            }
          },
          {
            name: 'align',
            selector: {
              select: {
                mode: 'dropdown',
                options: [
                  { value: 'justify', label: 'Fill width' },
                  { value: 'start', label: 'Start' },
                  { value: 'center', label: 'Centre' },
                  { value: 'end', label: 'End' }
                ]
              }
            }
          }
        ]
      }
    ]
  }

  private _generalChanged(ev: CustomEvent) {
    ev.stopPropagation()
    const value = { ...ev.detail.value }
    for (const k of Object.keys(value)) if (value[k] === undefined || value[k] === '') delete value[k]
    this._emit({ ...this._config!, ...value })
  }

  // ---- tabs -----------------------------------------------------------

  private _selectTab(ev: CustomEvent) {
    ev.stopPropagation()
    const i = parseInt(ev.detail.name, 10)
    if (Number.isNaN(i) || i === this._tab) return
    this._tab = i
    this._card = 0
    this._GUImode = true
    this._guiModeAvailable = true
  }

  private _addTab() {
    const tabs = [...this._tabs, { name: `Tab ${this._tabs.length + 1}`, cards: [] }]
    this._setTabs(tabs)
    this._tab = tabs.length - 1
    this._card = 0
  }

  private _deleteTab() {
    if (this._tabs.length <= 1) return
    const tabs = [...this._tabs]
    tabs.splice(this._tab, 1)
    this._tab = Math.max(0, this._tab - 1)
    this._card = 0
    this._setTabs(tabs)
  }

  private _moveTab(dir: number) {
    const tabs = [...this._tabs]
    const target = this._tab + dir
    const [tab] = tabs.splice(this._tab, 1)
    tabs.splice(target, 0, tab)
    this._tab = target
    this._setTabs(tabs)
  }

  private _duplicateTab() {
    const tabs = [...this._tabs]
    const copy = JSON.parse(JSON.stringify(tabs[this._tab])) as TabConfig
    copy.name = `${tabLabel(copy, this._tab)} copy`
    delete copy.id
    tabs.splice(this._tab + 1, 0, copy)
    this._tab += 1
    this._setTabs(tabs)
  }

  private _tabFormChanged(ev: CustomEvent) {
    ev.stopPropagation()
    const value = { ...ev.detail.value }
    for (const k of Object.keys(value)) if (value[k] === undefined || value[k] === '') delete value[k]
    const tabs = [...this._tabs]
    tabs[this._tab] = { ...value, cards: tabs[this._tab].cards }
    this._emit({ ...this._config!, tabs })
  }

  // ---- cards in the selected tab --------------------------------------

  private get _cards(): LovelaceCardConfig[] {
    return this._tabs[this._tab]?.cards ?? []
  }

  private _setCards(cards: LovelaceCardConfig[]) {
    this._updateTab(this._tab, { cards })
  }

  private _selectCard(ev: CustomEvent) {
    ev.stopPropagation()
    this._GUImode = true
    this._guiModeAvailable = true
    this._card = parseInt(ev.detail.name, 10)
  }

  private _cardChanged(ev: CustomEvent) {
    ev.stopPropagation()
    const cards = [...this._cards]
    cards[this._card] = ev.detail.config
    this._guiModeAvailable = ev.detail.guiModeAvailable
    this._setCardsKeepKeys(cards)
  }

  /** Editing a card must not remount its editor (that would drop focus), so keep the keys. */
  private _setCardsKeepKeys(cards: LovelaceCardConfig[]) {
    const keys = new Map(this._keys)
    this._setCards(cards)
    this._keys = keys
  }

  private _cardPicked(ev: CustomEvent) {
    ev.stopPropagation()
    this._setCards([...this._cards, ev.detail.config])
  }

  private _deleteCard() {
    const cards = [...this._cards]
    cards.splice(this._card, 1)
    this._card = Math.max(0, this._card - 1)
    this._setCards(cards)
  }

  private _copyCard() {
    writeClipboard(JSON.parse(JSON.stringify(this._cards[this._card])))
  }

  private _cutCard() {
    this._copyCard()
    this._deleteCard()
  }

  private _moveCard(dir: number) {
    const cards = [...this._cards]
    const target = this._card + dir
    const [card] = cards.splice(this._card, 1)
    cards.splice(target, 0, card)
    this._card = target
    this._setCards(cards)
  }

  private _guiModeChanged(ev: CustomEvent) {
    ev.stopPropagation()
    this._GUImode = ev.detail.guiMode
    this._guiModeAvailable = ev.detail.guiModeAvailable
  }

  // ---- render ---------------------------------------------------------

  protected render() {
    if (!this.hass || !this._config) return nothing
    if (!this._depsReady) return html`<p class="hint">Loading editor…</p>`

    const tabs = this._tabs
    const tab = tabs[this._tab]
    const cards = this._cards
    const guiMode = !this._cardEditorEl || this._GUImode

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._generalSchema()}
        .computeLabel=${this._label}
        @value-changed=${this._generalChanged}
      ></ha-form>

      <h3>Tabs</h3>
      <div class="toolbar">
        <ha-tab-group @wa-tab-show=${this._selectTab}>
          ${tabs.map(
            (t, i) => html`<ha-tab-group-tab slot="nav" .panel=${i} .active=${i === this._tab}>
              ${tabLabel(t, i)}
            </ha-tab-group-tab>`
          )}
        </ha-tab-group>
        <ha-icon-button label="Add tab" @click=${this._addTab}><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>
      </div>

      <div class="panel">
        <div class="options">
          <ha-icon-button label="Move tab earlier" .disabled=${this._tab === 0} @click=${() => this._moveTab(-1)}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            label="Move tab later"
            .disabled=${this._tab === tabs.length - 1}
            @click=${() => this._moveTab(1)}
          >
            <ha-icon icon="mdi:arrow-right"></ha-icon>
          </ha-icon-button>
          <ha-icon-button label="Duplicate tab" @click=${this._duplicateTab}>
            <ha-icon icon="mdi:content-duplicate"></ha-icon>
          </ha-icon-button>
          <ha-icon-button label="Delete tab" .disabled=${tabs.length <= 1} @click=${this._deleteTab}>
            <ha-icon icon="mdi:delete"></ha-icon>
          </ha-icon-button>
        </div>

        ${keyed(
          `tab-${this._tab}`,
          html`<ha-form
            .hass=${this.hass}
            .data=${{ name: tab.name, icon: tab.icon, id: tab.id }}
            .schema=${[
              { type: 'grid', name: '', schema: [{ name: 'name', selector: { text: {} } }, { name: 'icon', selector: { icon: {} } }] },
              { name: 'id', selector: { text: {} } }
            ]}
            .computeLabel=${this._label}
            @value-changed=${this._tabFormChanged}
          ></ha-form>`
        )}

        <h4>Cards in “${tabLabel(tab, this._tab)}”</h4>
        <div class="toolbar">
          <ha-tab-group @wa-tab-show=${this._selectCard}>
            ${cards.map(
              (_c, i) => html`<ha-tab-group-tab slot="nav" .panel=${i} .active=${i === this._card}>
                ${i + 1}
              </ha-tab-group-tab>`
            )}
          </ha-tab-group>
          <ha-icon-button label="Add card" @click=${() => (this._card = cards.length)}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </ha-icon-button>
        </div>

        <div id="editor">
          ${this._card < cards.length
            ? html`
                <div class="options">
                  <ha-icon-button
                    class="gui-mode-button"
                    label=${guiMode ? 'Show code editor' : 'Show visual editor'}
                    .disabled=${!this._guiModeAvailable}
                    @click=${() => this._cardEditorEl?.toggleMode()}
                  >
                    <ha-icon icon=${guiMode ? 'mdi:code-braces' : 'mdi:list-box-outline'}></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button label="Move card earlier" .disabled=${this._card === 0} @click=${() => this._moveCard(-1)}>
                    <ha-icon icon="mdi:arrow-left"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button
                    label="Move card later"
                    .disabled=${this._card === cards.length - 1}
                    @click=${() => this._moveCard(1)}
                  >
                    <ha-icon icon="mdi:arrow-right"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button label="Copy card" @click=${this._copyCard}><ha-icon icon="mdi:content-copy"></ha-icon></ha-icon-button>
                  <ha-icon-button label="Cut card" @click=${this._cutCard}><ha-icon icon="mdi:content-cut"></ha-icon></ha-icon-button>
                  <ha-icon-button label="Delete card" @click=${this._deleteCard}><ha-icon icon="mdi:delete"></ha-icon></ha-icon-button>
                </div>
                ${keyed(
                  this._key('card', this._tab, this._card, cards.length),
                  html`<hui-card-element-editor
                    .hass=${this.hass}
                    .lovelace=${this.lovelace}
                    .value=${cards[this._card]}
                    .sectionConfig=${GRID_SECTION}
                    show-visibility-tab
                    @config-changed=${this._cardChanged}
                    @GUImode-changed=${this._guiModeChanged}
                  ></hui-card-element-editor>`
                )}
              `
            : html`<hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._cardPicked}
              ></hui-card-picker>`}
        </div>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
    }
    h3,
    h4 {
      margin: 16px 0 8px;
      font-weight: 500;
    }
    .hint {
      color: var(--secondary-text-color);
    }
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ha-tab-group {
      flex-grow: 1;
      min-width: 0;
      --ha-tab-track-color: var(--card-background-color);
    }
    .options {
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }
    .gui-mode-button {
      margin-right: auto;
      margin-inline-end: auto;
    }
    .panel {
      border: 1px solid var(--divider-color);
      padding: 12px;
      margin-top: 4px;
    }
    #editor {
      border: 1px solid var(--divider-color);
      padding: 12px;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'tabbed-section-card-editor': TabbedSectionCardEditor
  }
}
