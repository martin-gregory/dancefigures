import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Layer {
  src: string;
  speed: number;
  startPos?: string;
  direction?: string;
  position?: { x?: string };
  objectFit?: string;
  container?: { maxWidth?: string };
  id?: string;
  alt?: string;
  cssName?: string;
}

//NOTE: host height controls the amount of scroll phases, so can be adjusted for longer/shorter animations
@customElement('shrink-painting-panel')
export class ShrinkPaintingPanel extends LitElement {
  static override styles = css`
    :host {
      --frame-width: 88vh;
      --panel-bg-gradient: linear-gradient(305deg, rgb(178 159 134) 0%, rgb(217 207 201) 59% 65%, rgb(233, 228, 223) 100%);
      display: block;
      position: relative;
      width: 100%;
      height: 500vh; /* Extended height for scroll phases */
      min-height: 400px;
      background: #e9e3de;
      background: var(--panel-bg-gradient);
      /* max-width: 1880px;
      margin: 0 auto; */
    }

    .sticky-container {
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
      min-height: 900px;

      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .layer {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
      transition: transform 0.1s ease-out;
      z-index: 1;
      border-radius: 3px;
    }

    .layer img {
      width: 100%;
      height: 100%;
      user-drag: none;
      pointer-events: none;
      padding: 60px;
      border: 15px solid transparent;
      transform-origin: 30% 150px;
      max-width: 1880px;
      margin: 0 auto;
    }
    .frame {
      position: absolute;
      width: var(--frame-width);
      top: 0px;
      z-index: 0;
      aspect-ratio: 1 / 1.4;

      @media (max-width: 768px) {
        width: 80vh;
      }
    }
    .background {
      z-index: 0;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    .layer {
      .background {
        // transform center
        transform-origin: 50% 50%;
        border: 15px solid #2c3d58;
      }
    }
    .stage-image {
      width: 100%;
      height: 100vh;
      min-height: 900px;

      position: absolute;
      object-fit: cover;
      // start off screen
    }
    /* mobile */
    @media (max-width: 768px) {
      .stage-image {
        object-fit: contain;
        object-position: bottom;
      }
      .layer img {
        transform-origin: 40% 150px;
      }
    }
  `;

  @property({ type: Array }) layers: Layer[] = [];
  @property({ type: Number }) scrollInEnd = 100;
  @property({ type: Number }) convergenceStart = 300;
  @property({ type: Number }) convergenceEnd = 1500;
  @property({ type: Number }) scrollOutStart = 3000;
  @property({ type: Number }) finalScale = 0.33;
  @property({ type: String }) stageImage = '/img/interior-held-wind.avif';
  @property({ type: String }) stageImageAlt = 'Stage Image';
  @property({ type: Number }) stageImageEndTranslateYPos = 0;

  // Use state to hold refs for DOM elements
  @state() private layerElements: HTMLElement[] = [];
  @state() private layerImgElements: HTMLElement[] = [];
  @state() private stageImgEl?: HTMLElement;

  private rafId = 0;

  // Convenience: Setup/caching of DOM refs on first update
  protected override firstUpdated(_changedProperties: PropertyValues) {
    this.cacheElements();
    this.scheduleScroll();
  }

  // Convenient cache method
  private cacheElements() {
    this.layerElements = Array.from(this.renderRoot.querySelectorAll('.layer')) as HTMLElement[];
    this.layerImgElements = Array.from(this.renderRoot.querySelectorAll('.layer img')) as HTMLElement[];
    this.stageImgEl = this.renderRoot.querySelector('.sticky-container > .stage-image') as HTMLElement | undefined;
  }

  // Use RAF for smooth animation
  private scheduleScroll = () => {
    this.onScroll();
    this.rafId = requestAnimationFrame(this.scheduleScroll);
  };

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.scheduleScroll();
  }

  override disconnectedCallback() {
    window.removeEventListener('scroll', this.onScroll);
    cancelAnimationFrame(this.rafId);
    super.disconnectedCallback();
  }

  private getScrollProgress(): number {
    const hostRect = this.getBoundingClientRect();
    return -hostRect.top;
  }

  // *** Core Animation Frame Logic ***
  private onScroll = () => {
    // Early exit if DOM not ready

    if (!this.layerElements.length) this.cacheElements();
    if (!this.layerElements.length) return;

    const rect = this.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (!inView) {
      return;
    }

    const scrollProgress = this.getScrollProgress();

    // Calculate phase progress
    const convergenceProgress = this.clamp((scrollProgress - this.convergenceStart) / (this.convergenceEnd - this.convergenceStart));

    const isBeforeConvergence = scrollProgress < this.convergenceStart;

    // Animate layers
    this.layers.forEach((layer, idx) => {
      const el = this.layerElements[idx];
      const imgEl = this.layerImgElements[idx];
      if (!el || !imgEl) return;

      // Phase 1: Parallax

      imgEl.style.objectFit = layer.objectFit ?? 'cover';

      // Phase 2: Convergence and scale
      if (convergenceProgress > 0 && scrollProgress < this.scrollOutStart) {
        const scale = 1 - (1 - this.finalScale) * convergenceProgress;
        const scaleAmount = `scale(${scale})`;
        imgEl.style.transform = `${scaleAmount}`;

        if (scale < 0.66) {
        } else {
          el.style.left = '0';
        }
      }
    });

    // Final stage image slotting in
    // Stage image appears together with layer scaling:
    if (this.stageImgEl) {
      // Animate stage image starting as soon as convergence/scaling starts
      const stageImgStart = this.convergenceStart;
      const stageImgEnd = this.scrollOutStart;

      // Progress 0 to 1 over this interval
      const stageImgProgress = this.clamp((scrollProgress - stageImgStart) / (stageImgEnd - stageImgStart));
      // 100% -> 0% with smoothness
      const finalTranslate = (1 - stageImgProgress) * 100;
      this.stageImgEl.style.transform = `translateY(${finalTranslate < this.stageImageEndTranslateYPos ? this.stageImageEndTranslateYPos : finalTranslate
        }%)`;
      // Optionally, add easing:
      // const eased = 1 - Math.pow(1 - stageImgProgress, 2); // easeOut
    }
  };

  // Utility clamp
  private clamp(val: number, min = 0, max = 1): number {
    return Math.max(min, Math.min(val, max));
  }

  // Render logic
  override render() {
    return html`
      <div class="sticky-container">
        <div class="frame">
          ${this.layers.map((layer) => {
      const containerStyle = layer.container?.maxWidth ? `max-width: ${layer.container.maxWidth}; margin: 0 auto;` : '';
      return html`
              <div class="layer" style="${containerStyle}">
                <img src="${layer.src}" alt="${layer.alt ?? 'Hero Layer'}" draggable="false" id="${layer.id ?? ''}" class="${layer.cssName ?? ''}" />
              </div>
            `;
    })}
        </div>
        <img class="stage-image" src="${this.stageImage}" alt="${this.stageImageAlt}" draggable="false" />
      </div>
    `;
  }
}
