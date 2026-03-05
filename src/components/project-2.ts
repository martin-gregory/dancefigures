import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { commonStyles } from '../styles/common-styles';

@customElement('project-2')
export class Project2 extends LitElement {
  static override styles = [
    commonStyles,
    css`
      :host {
        display: block;
        --accent-colour: #6e90c0;
        --held-by-the-sea-bg: #485c71;
        background-color: var(--held-by-the-sea-bg);
      }

      /* Hero */
      .hero {
        margin-top: 64px;
        height: calc(100vh - 64px);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
      }

      .hero-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
      }

      .hero-content {
        position: relative;
        z-index: 1;
        padding: 20px;
      }

      .hero h1 {
        font-size: clamp(2.5rem, 7vw, 4.5rem);
        margin-bottom: 24px;
        font-weight: bold;
      }

      .hero p {
        font-size: clamp(1.125rem, 2vw, 1.5rem);
        margin-bottom: 32px;
        max-width: 800px;
      }
    `,
  ];

  override render() {
    return html`
      <slot name="hero-2"></slot>
      <slot name="shrink-layers-parallax"></slot>
    `;
  }
}
