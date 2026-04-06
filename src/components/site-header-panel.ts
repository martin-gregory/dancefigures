import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('site-header-panel')
export class SiteHeaderPanel extends LitElement {
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
    .site-header-panel {
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

    .site-header-panel-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 2rem;
      color: white;
    }

    .site-header-panel-content h1 {
      font-size: 4rem;
      font-weight: normal;
      margin-bottom: 0;
      line-height: 1.1;
      span {
        font-size: 2rem;
      }
    }
    .site-header-panel-content h2 {
      font-size: 2rem;
      font-weight: normal;
    }

    .site-header-panel-content {
      @media (max-width: 768px) {
        h1 {
          font-size: 2.5rem;
          span {
            font-size: 1.2rem;
          }
        }
        h2 {
          font-size: 1.2rem;
        }
        h3 {
          font-size: 1rem;
        }
      }
    }

    .scroll-instruction {
      position: absolute;
      bottom: 0ex;
      font-size: 1.2rem;
      color: white;
    }
    @media (max-width: 768px) {
      .scroll-instruction {
        font-size: 1rem;
      }
    }
  `;
  override render() {
    return html`
      <section class="site-header-panel">
        <div class="site-header-panel-content">
          <h1>
            Dance Figures <br />
            <span>Conceptual Figurative Paintings</span>
          </h1>
          <h2>"Inner Landscapes"</h2>
          <h3>by Tiana Diakova</h3>
        </div>
        <p class="scroll-instruction">Scroll down to see collection</p>
      </section>
    `;
  }
}
