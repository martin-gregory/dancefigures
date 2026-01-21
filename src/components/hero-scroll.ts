import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('hero-scroll')
export class HeroScroll extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    .hero-scroll {
      position: relative;
      height: 100vh;
      overflow: hidden;
      view-timeline-name: --hero-section;
      view-timeline-axis: block;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero-scroll-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 2rem;
      color: white;
    }

    .hero-scroll-content h1 {
      font-size: 4rem;
      font-weight: bold;
      margin-bottom:0;
      line-height: 1.1;
    }
    .hero-scroll-content h2 {
      font-size: 2rem;
      font-weight: normal;
    }

    .hero-scroll-content p {
      position: absolute;
      bottom: 0ex;
      font-size: 1.2rem;
    }
  `;
  override render() {
    return html`
      <section class="hero-scroll">
        <div class="hero-scroll-content">
          <h1>Dance Figures </br> Conceptual Figurative Painting</h1>
          <h2>by Tiana Diakova</h2>
          <p>Scroll down to see collection</p>
        </div>
      </section>
    `;
  }
}
