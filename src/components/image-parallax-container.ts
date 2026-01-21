import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('image-parallax-container')
export class ImageParallaxContainer extends LitElement {
  static override styles = css`
    :host {
      position: relative;
      height: 80vh;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      view-timeline-name: --image-section;
      view-timeline-axis: block;
    }
    /* 
    .image-parallax-container {
      position: relative;
      height: 50vh;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      view-timeline-name: --image-section;
      view-timeline-axis: block;
    } */

    .image-bg {
      position: absolute;
      inset: 0;
      background-image: url('/assets/test-1.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center 0;
      animation: image-parallax linear both;
      animation-timeline: --image-section;
      animation-range: cover;
    }

    @keyframes image-parallax {
      from {
        background-position: center 100%;
      }
      to {
        background-position: center 0;
      }
    }

    .image-parallax-container h2 {
      text-align: center;
      display: flex;
      gap: 20px;
      font-size: 4rem;
      font-weight: normal;
      color: #edebed;
      font-family: cursive;
      /* text-shadow: 0 0 10px #fff; */

      span {
        animation: text-parallax both;
        animation-timeline: --image-section;
        animation-range: cover;
      }
    }

    @keyframes text-parallax {
      0% {
        opacity: 0;
      }
      30% {
        opacity: 0;
        transform: translateY(calc(var(--i) * 30%));
      }
      50% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
      }
    }
  `;
  override render() {
    return html`
      <section class="image-parallax-container">
        <div class="image-bg"></div>
        <h2>
          <span style="--i: -10">Held</span>
          <span style="--i: -5">by</span>
          <span style="--i: 0">the</span>
          <span style="--i: 5">Wind</span>
        </h2>
      </section>
    `;
  }
}
