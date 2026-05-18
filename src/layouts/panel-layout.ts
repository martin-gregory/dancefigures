import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles } from '../styles/common-styles';

@customElement('panel-layout')
export class PanelLayout extends LitElement {
  static override styles = [
    commonStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  override render() {
    return html`
      <slot name="hero"></slot>
      <slot name="artwork-in-scene"></slot>
    `;
  }
}
