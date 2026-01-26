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
      /* background-image: url(/img/test-1.jpg); */
      /* background-image: url(/img/test-3.png); */
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
      /* background-image: url(/img/test-4.png); */
      background-repeat: repeat;
      animation: big-pattern-parallax both;
      animation-timeline: --pattern-section;
      animation-range: cover;
      background-position: center center;
    }

    @keyframes big-pattern-parallax {
      0% {
        opacity: 0;
        transform: translateY(10%);
      }
      100% {
        opacity: 1;
        transform: translateY(-10%);
      }
    }

    .pattern-parallax-container h2 {
      text-align: center;
      display: flex;
      gap: 10px;
      font-size: 2rem;
      color: white;
      font-weight: normal;
      /* text-shadow: 0 0 10px #fff; */
      position: absolute;
      right: 170px;

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
      5% {
        opacity: 1;
        transform: translateX(0);
      }
      100% {
        opacity: 0;
      }
    }
  `;

  // style="background-image: url('${this.layers[0]}');"
  @property({ type: Array })
  layers: string[] = ['/img/test-2.jpg'];
  @property({ type: Array })
  words: string[] = ['Sensations', 'of', 'the', 'Sea'];
  override render() {
    console.log('layers', this.layers);
    return html`
      <section class="pattern-parallax-container" >
        <div class="pattern-bg-small" style="background-image: url('${this.layers[0]}');"></div>
        <!-- <div class="pattern-bg-large"></div> -->
        <h2>${this.words.map((word, index) => html`<span style="--i: ${index * 8 - 10}">${word}</span>`)}</h2>
      </section>
    `;
  }
}
