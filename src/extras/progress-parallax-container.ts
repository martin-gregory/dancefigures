import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('progress-parallax-container')
export class ProgressParallaxContainer extends LitElement {
  static override styles = css`
    :host {
      position: relative;
      height: 50vh;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      view-timeline-name: --progress-section;
      view-timeline-axis: block;
    }

    .progress-container-fill {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      background-image: linear-gradient(to bottom right, #485d71, #5b6c83);
      animation: progress-overlay-animation both;
      animation-timeline: --progress-section;
      animation-range: contain 0 contain 60%;
    }

    .progress-parallax-container h2 {
      color: white;
    }

    @keyframes progress-overlay-animation {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }

    .progress-bar {
      position: absolute;
      top: 10%;
      left: 10%;
      right: 10%;
      height: 20px;
      border-radius: 8px;
      overflow: hidden;
    }

    .progress-bar-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background-color: #535167;
      animation: progress-bar-animation both;
      animation-timeline: --progress-section;
      animation-range: contain 30% contain 80%;
    }

    @keyframes progress-bar-animation {
      0% {
        width: 100%;
      }
      100% {
        width: 0;
      }
    }

    h2 {
      position: relative;
      z-index: 1;
      text-align: center;
      font-size: 2rem;
      /* text-shadow: 0 0 10px #fff; */
      color: white;
    }
  `;
  override render() {
    return html`
      <section class="progress-parallax-container">
        <div class="progress-container-fill"></div>
        <div class="progress-bar">
          <div class="progress-bar-fill"></div>
        </div>
        <h2>The complete work</h2>
      </section>
    `;
  }
}
