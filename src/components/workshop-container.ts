import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { commonStyles } from '../styles/common-styles';

@customElement('workshop-container')
export class WorkshopContainer extends LitElement {
  static override styles = [
    commonStyles,
    css`
      :host {
        display: block;
        --accent-colour: #6e90c0;
        --held-by-the-sea-bg: #485c71;
        background-color: var(--held-by-the-sea-bg);
      }
    `,
  ];

  override render() {
    return html`
      <workshop-site>
        <site-navigation slot="navigation"></site-navigation>
        <hero-scroll slot="hero-scroll"></hero-scroll>
        <hero-parallax
          slot="hero"
          .layers=${[
        { src: '/assets/test-1.jpg', speed: 0, startPos: '-320' },
        {
          src: '/assets/test-4.png',
          speed: 0.02,
          startPos: '-500',
          stopPos: '200',
        },
      ]}
        >
          <h1>Held by the Wind</h1>
        </hero-parallax>

        <image-parallax-container slot="image-parallax"></image-parallax-container>
  
        <pattern-parallax-container slot="pattern-parallax"></pattern-parallax-container>

        <instagram-gallery id="gallery" slot="gallery"></instagram-gallery>
        <workshops-section id="workshops" slot="workshops"></workshops-section>
      </workshop-site>
    `;
  }
}
