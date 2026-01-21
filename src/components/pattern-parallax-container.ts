import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('pattern-parallax-container')
export class PatternParallaxContainer extends LitElement {
  static override styles = css`
    :host {
      position: relative;
      height: 100vh;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      view-timeline-name: --pattern-section;
      view-timeline-axis: block;
    }

    .pattern-bg-small {
      position: absolute;
      left: 0;
      top: -200%;
      height: 400%;
      width: 100%;
      /* background-image: url(/assets/test-1.jpg); */
      background-image: url(/assets/test-3.png);
      background-repeat: repeat;
      animation: small-pattern-parallax both;
      animation-timeline: --pattern-section;
      animation-range: cover;
      background-position: center center;
    }

    @keyframes small-pattern-parallax {
      0% {
        opacity: 0;
        transform: translateY(5%);
      }
      100% {
        opacity: 1;
        transform: translateY(-5%);
      }
    }

    .pattern-bg-large {
      position: absolute;
      left: 0;
      top: -100%;
      height: 400%;
      width: 100%;
      background-image: url(/assets/test-4.png);
      background-repeat: repeat;
      animation: big-pattern-parallax both;
      animation-timeline: --pattern-section;
      animation-range: cover;
      background-position: center center;
    }

    @keyframes big-pattern-parallax {
      0% {
        opacity: 0;
        transform: translateY(40%);
      }
      100% {
        opacity: 1;
        transform: translateY(-40%);
      }
    }

    .pattern-parallax-container h2 {
      text-align: center;
      display: flex;
      gap: 10px;
      font-size: 2rem;
      color: white;
      /* text-shadow: 0 0 10px #fff; */

      span {
        animation: pattern-text-parallax both;
        animation-timeline: --pattern-section;
        animation-range: contain cover;
      }
    }

    @keyframes pattern-text-parallax {
      0% {
        opacity: 0;
        transform: translateX(calc(var(--i) * 10%));
      }
      50% {
        opacity: 1;
        transform: translateX(0);
      }
      100% {
        opacity: 0;
      }
    }
  `;
  override render() {
    return html`
      <section class="pattern-parallax-container">
        <div class="pattern-bg-small"></div>
        <div class="pattern-bg-large"></div>
        <h2>
          <span style="--i: -10">Sensations</span>
          <span style="--i: 0">of the</span>
          <span style="--i: 10">Sea</span>
        </h2>
      </section>
    `;
  }
}
