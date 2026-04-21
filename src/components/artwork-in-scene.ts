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
@customElement('artwork-in-scene')
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
      pointer-events: none;
      position: absolute;
      object-fit: cover;
    }
    /* mobile */
    @media (max-width: 768px) {
      .stage-image {
        object-fit: cover;
        object-position: bottom;
        height: 80vh;
        bottom: 0;
        min-height: 825px;
      }
      .layer img {
        /* transform-origin: 40% 150px; */
        transform-origin: calc(50% - 115px) 150px;
      }
    }

    .plaque {
      position: absolute;
      left: 65%;
      border: 1px solid transparent;
      top: 30vh;
      opacity: 0;
      z-index: 2;

      padding: 10px;
      border-radius: 2px;
      text-align: center;

      a {
        display: block;
        color: #6a4756;
        text-decoration: none;
        margin-top: 0px;
        text-align: center;
        font-size: 18px;

        span {
          text-decoration: underline;
        }

        .external-link-svg {
          width: 18px;
          height: 18px;
          vertical-align: middle;
          margin-left: 0px;
          path {
            fill: #6a4756;
          }
        }
        &:hover {
          a {
            color: #2c3d58;
          }
          .external-link-svg {
            path {
              fill: #2c3d58;
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      .plaque {
        /* display: none; */
        left: 50%;
        transform: translateX(-50%);
        top: 53vh;
        top: 8vh;
        padding: 0px;
        div {
          display: none;
        }
        a.order-print-link {
          display: none;
        }
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
  @property({ type: String }) plaqueText = '';
  @property({ type: Number }) stageImageEndTranslateYPos = 0;

  // Use state to hold refs for DOM elements
  @state() private layerElements: HTMLElement[] = [];
  @state() private layerImgElements: HTMLElement[] = [];
  @state() private plaqueEl?: HTMLElement;
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
    this.plaqueEl = this.renderRoot.querySelector('.plaque') as HTMLElement | undefined;
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

    // const isBeforeConvergence = scrollProgress < this.convergenceStart;

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

      // fade in plaque starting at 100% convergence
      if (this.plaqueEl) {
        if (convergenceProgress >= 1) {
          this.plaqueEl.style.opacity = `${(scrollProgress - this.convergenceEnd) / (this.scrollOutStart - this.convergenceEnd)}`;
        } else {
          this.plaqueEl.style.opacity = '0';
        }
      }
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
                <img
                  src="${layer.src}"
                  alt="${layer.alt ?? 'Hero Layer'}"
                  draggable="false"
                  id="${layer.id ?? ''}"
                  class="${layer.cssName ?? ''}"
                  title="${layer.alt ?? ''}"
                />
                <div class="plaque">
                  <a
                    href="https://diakova-art.com/category/inner-landscapes/"
                    target="_blank"
                    title="'${this.plaqueText}' - See more paintings at diakova-art.com"
                    rel="noopener noreferrer"
                  >
                    <div>"${this.plaqueText}"</div>
                    <div>100 cm x 70 cm</div>
                    diakova-art.com
                    <svg class="external-link-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path
                        d="M480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96zM368 360C368 373.3 378.7 384 392 384C405.3 384 416 373.3 416 360L416 248C416 234.7 405.3 224 392 224L280 224C266.7 224 256 234.7 256 248C256 261.3 266.7 272 280 272L334.1 272L231.1 375C221.7 384.4 221.7 399.6 231.1 408.9C240.5 418.2 255.7 418.3 265 408.9L368 305.9L368 360z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://diakova-art.com/order-prints/"
                    target="_blank"
                    title="Order Print of '${this.plaqueText}'"
                    class="order-print-link"
                    rel="noopener noreferrer"
                  >
                    <span>Order a Print</span>
                    <svg class="external-link-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path
                        d="M480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96zM368 360C368 373.3 378.7 384 392 384C405.3 384 416 373.3 416 360L416 248C416 234.7 405.3 224 392 224L280 224C266.7 224 256 234.7 256 248C256 261.3 266.7 272 280 272L334.1 272L231.1 375C221.7 384.4 221.7 399.6 231.1 408.9C240.5 418.2 255.7 418.3 265 408.9L368 305.9L368 360z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            `;
    })}
        </div>
        <img class="stage-image" src="${this.stageImage}" alt="${this.stageImageAlt}" draggable="false" />
      </div>
    `;
  }
}
