import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('shrink-layers-parallax')
export class ShrinkLayersParallax extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 300vh; /* Extended height for scroll phases */
      min-height: 400px;
      background-color: #d7cac1;
    }

    .sticky-container {
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .layer {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
      transition: transform 0.1s ease-out;
      z-index: 1;
      transform-origin: center center;
    }

    .layer img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-fit: contain;
      object-position: 0 30%;
      user-drag: none;
      pointer-events: none;
      margin: auto;
      display: flex;
    }
    .stage-image {
      position: absolute;
      transform: translateY(120%); // start off screen
    }
  `;

  @property({ type: Array })
  layers: Array<{
    src: string;
    speed: number;
    startPos?: string;
    direction?: string;
    position?: { x?: string };
    objectFit?: string;
    container?: { maxWidth?: string };
    id?: string;
  }> = [];

  @property({ type: Number })
  scrollInEnd = 100; // When scroll-in phase ends (image in view)

  @property({ type: Number })
  convergenceStart = 100; // When convergence/scale starts

  @property({ type: Number })
  convergenceEnd = 1500; // When convergence/scale completes

  @property({ type: Number })
  scrollOutStart = 4000; // When scroll-out phase begins

  @property({ type: Number })
  finalScale = 0.3; // Final size (30%)

  @property({ type: String })
  stageImage = '/img/livingroom-mockup.avif';

  private onScroll = () => {
    const hostRect = this.getBoundingClientRect();
    const hostTop = hostRect.top;
    const scrollProgress = -hostTop; // How far we've scrolled into the component

    // Phase 1: Scroll in with parallax (0 to scrollInEnd)
    const scrollInProgress = Math.min(Math.max(scrollProgress / this.scrollInEnd, 0), 1);

    // Phase 2: Convergence/scale (convergenceStart to convergenceEnd)
    const convergenceProgress = Math.min(Math.max((scrollProgress - this.convergenceStart) / (this.convergenceEnd - this.convergenceStart), 0), 1);

    const finalStageProgress = Math.min(Math.max((scrollProgress - this.convergenceEnd) / (this.scrollOutStart - this.convergenceEnd), 0), 1);

    const isInConvergencePhase = convergenceProgress > 0 && scrollProgress < this.scrollOutStart;

    console.log({
      scrollProgress,
      scrollInProgress,
      convergenceProgress,
      finalStageProgress
    });


    // calc(100% - 40%)

    const startPhase1 = scrollProgress < this.scrollInEnd;

    // Animate layers
    this.layers.forEach((layer, idx) => {
      const el = this.renderRoot.querySelectorAll('.layer')[idx] as HTMLElement;
      const imgEl = this.renderRoot.querySelectorAll('.layer img')[idx] as HTMLElement;

      if (!el || !imgEl) return;

      const xPos = layer.position?.x ? layer.position.x : '50%';
      const objectFit = layer.objectFit ? layer.objectFit : 'cover';

      // Phase 1: Parallax during scroll-in
      if (startPhase1) {
        const parallaxAmount = layer.direction === 'up' ? layer.speed * scrollInProgress * 100 : -layer.speed * scrollInProgress * 100;

        const startPosition = layer.startPos ? parseInt(layer.startPos) : 0;
        imgEl.style.objectPosition = `${xPos} ${startPosition + parallaxAmount}px`;
      }

      imgEl.style.objectFit = objectFit;

      // Phase 2: Convergence and scale
      if (isInConvergencePhase) {
        // Calculate scale (1 to finalScale)
        const scale = 1 - (1 - this.finalScale) * convergenceProgress;

        // Apply scale transformation (layers stay centered and converge)
        el.style.transform = `scale(${scale})`;
        el.style.transformOrigin = 'center center';

        // scale width from 100% to the equivalent of finalScale while keeping height 100
        const scaledWidth = Math.max(100 * scale, 60);
        el.style.width = `${scaledWidth}%`;

      } else if (scrollProgress < this.convergenceStart) {
        // Before convergence, no scale
        el.style.transform = '';
      }
    });

    // final stage image scroll-out
    const stageImgEl = this.renderRoot.querySelector('.sticky-container > .stage-image') as HTMLElement;

    // scroll stage image up and into place during scroll-out phase
    if (convergenceProgress >= 0.5) {
      const calc = Math.min((scrollProgress - this.convergenceEnd) / (this.scrollOutStart - this.convergenceEnd), 1);
      const scrollOutProgress = Math.min(calc);
      console.log((1 - scrollOutProgress) * 120);


      // stageImgEl.style.transform = `translateY(${(scrollOutProgress / 100) * 100}%)`;
      stageImgEl.style.transform = `translateY(${(1 - scrollOutProgress) * 120}%)`;
    } else {
      stageImgEl.style.transform = `translateY(120%)`;
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    // Initial call to set proper state
    requestAnimationFrame(() => this.onScroll());
  }

  override disconnectedCallback() {
    window.removeEventListener('scroll', this.onScroll);
    super.disconnectedCallback();
  }

  override render() {
    console.log(this);

    return html`
      <div class="sticky-container">
        ${this.layers.map((layer) => {
      const containerStyle = layer.container?.maxWidth ? `max-width: ${layer.container.maxWidth}; margin: 0 auto;` : '';
      return html`
            <div class="layer" style="${containerStyle}">
              <img src="${layer.src}" alt="Hero Layer" draggable="false" id="${layer.id ? layer.id : ''}" />
            </div>
          `;
    })}
        <img class="stage-image" src="${this.stageImage}" alt="Stage Image" draggable="false" />
      </div>
    `;
  }
}
