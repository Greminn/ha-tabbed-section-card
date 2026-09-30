import { css } from 'lit'

export default css`
  :host {
    display: block;
  }

  /* Mirrors HA's tile "toggle" / select features so the bar matches the dashboard theme. */
  .bar {
    --tsc-radius: var(--control-select-border-radius, var(--feature-border-radius, 12px));
    position: relative;
    display: flex;
    height: var(--feature-height, 42px);
    margin-bottom: var(--ha-section-grid-row-gap, 8px);
    border-radius: var(--tsc-radius);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .bar::-webkit-scrollbar {
    display: none;
  }
  .track {
    position: absolute;
    inset: 0;
    border-radius: var(--tsc-radius);
    background: var(--control-select-background, var(--disabled-color));
    opacity: var(--control-select-background-opacity, 0.2);
    pointer-events: none;
  }
  .bar.align-start {
    justify-content: flex-start;
  }
  .bar.align-center {
    justify-content: center;
  }
  .bar.align-end {
    justify-content: flex-end;
  }

  .tab {
    position: relative;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 100%;
    padding: 0 20px;
    border: none;
    border-radius: var(--tsc-radius);
    background: transparent;
    color: var(--primary-text-color);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color 0.2s,
      color 0.2s;
  }
  .align-justify .tab {
    flex: 1 1 0;
  }
  .tab:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }
  .tab[aria-selected='true'] {
    background: var(--tsc-active-color, var(--grey-color, #9e9e9e));
    color: var(--white-color, #fff);
  }
  ha-icon {
    --mdc-icon-size: 22px;
    display: flex;
  }

  .panel[hidden] {
    display: none;
  }

  .message {
    padding: 16px;
    color: var(--secondary-text-color);
    text-align: center;
  }
`
