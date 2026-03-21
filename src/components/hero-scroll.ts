import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('hero-scroll')
export class HeroScroll extends LitElement {
  static override styles = css`
    :host {
      display: block;
      background-color: transparent;
    }

    h1,
    h2,
    h3 {
      font-family: 'serif';
    }
    h3 {
      letter-spacing: 0.05em;
    }
    .hero-scroll {
      position: relative;
      background-color: transparent;

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
      font-weight: normal;
      margin-bottom: 0;
      line-height: 1.1;
    }
    .hero-scroll-content h2 {
      font-size: 2rem;
      font-weight: normal;
    }

    .scroll-instruction {
      position: absolute;
      bottom: 0ex;
      font-size: 1.2rem;
      color: white;
    }
  `;
  override render() {
    return html`
      <section class="hero-scroll">
        <div class="hero-scroll-content">
          <h1>Dance Figures</h1>
          <h2>Conceptual Figurative Painting</h2>
          <h3>by Tiana Diakova</h3>
        </div>
        <p class="scroll-instruction">Scroll down to see collection</p>
      </section>
    `;
  }
}
