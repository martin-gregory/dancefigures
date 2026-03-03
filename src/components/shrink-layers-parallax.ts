import { LitElement, css, html, PropertyValues } from 'lit';
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
@customElement('shrink-layers-parallax')
export class ShrinkLayersParallax extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 500vh; /* Extended height for scroll phases */
      min-height: 400px;
      /* background-color: #d7cac1; */
      background: #e9e3de;
      /* background: linear-gradient(69deg, rgb(233 228 223) 0%, rgba(231, 225, 219, 1) 42%, rgb(183 161 146) 100%); */
      /* background: linear-gradient(69deg, rgb(233, 228, 223) 0%, rgb(231, 225, 219) 62%, rgb(192 180 164) 100%);
background:linear-gradient(69deg, rgb(233, 228, 223) 0%, rgb(217 207 201) 59% 65%, rgb(178 159 134) 100%); */
      background: linear-gradient(305deg, rgb(178 159 134) 0%, rgb(217 207 201) 59% 65%, rgb(233, 228, 223) 100%);
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
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
      transition: transform 0.1s ease-out;
      z-index: 1;
      /* overflow: hidden; */
      border-radius: 3px;
      transform: translateY(-25%) translateX(-6%);
    }

    .layer img {
      width: 100%;
      height: 100%;
      /* object-fit: contain; */
      user-drag: none;
      pointer-events: none;
      /* display: flex; */
      /* transform-origin: 30% 147px; */
      /* border: 25px solid transparent; */
      padding: 60px;
      border: 15px solid transparent;
    }
    .frame {
      position: absolute;
      width: 500px;
      height: 700px;
      width: 990px;
      height: 1390px;
      top: 3%;
      z-index: 0;
      /* left: 0;
      top: 0;
      bottom: 0;
      right: 0; */
      /* padding: 10px; */
      /* border: 25px solid #2c3d58; */
      /* transform: translateY(-25%) translateX(-6%); */
    }
    .background {
      z-index: 0;
      /* Start slightly larger for better parallax effect */
      /* height: 120% !important; */

      /* */
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    .layer {
      /* transform: translateY(-50%) translateX(-25%); */
      .layer-1 {
        /* width: 92%;
        object-fit: contain !important;
        object-position: 0 20% !important; */
        // transform center
        transform-origin: 50% 50%;
        /* border: 25px solid #2c3d58; */
        border: 15px solid #2c3d58;
      }
      .layer-2 {
        /* width: 104%;
        object-fit: contain !important; */
      }
      .layer-3 {
        /* width: 99%;
        object-fit: contain !important;
        object-position: 0 20% !important; */
      }
    }
    .stage-image {
      width: 100%;
      height: 100vh;
      position: absolute;
      object-fit: cover;
      // start off screen
      transform: translateY(100%);
    }
  `;

  @property({ type: Array }) layers: Layer[] = [];
  @property({ type: Number }) scrollInEnd = 100;
  @property({ type: Number }) convergenceStart = 300;
  @property({ type: Number }) convergenceEnd = 1500;
  @property({ type: Number }) scrollOutStart = 3000;
  @property({ type: Number }) finalScale = 0.43;
  @property({ type: String }) stageImage = '/img/livingroom-mockup-cutout.avif';
  @property({ type: String }) stageImageAlt = 'Stage Image';

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
    // const relativeScroll = parseInt(`${-rect.top}`); // 0 when element top hits viewport

    const scrollProgress = this.getScrollProgress();

    // Calculate phase progress
    const scrollInProgress = this.clamp(scrollProgress / this.scrollInEnd);
    const convergenceProgress = this.clamp((scrollProgress - this.convergenceStart) / (this.convergenceEnd - this.convergenceStart));
    const scrollOutProgress = this.clamp((scrollProgress - this.convergenceEnd) / (this.scrollOutStart - this.convergenceEnd));

    // Animate layers
    this.layers.forEach((layer, idx) => {
      const el = this.layerElements[idx];
      const imgEl = this.layerImgElements[idx];
      if (!el || !imgEl) return;

      // Phase 1: Parallax
      if (scrollProgress < this.scrollInEnd) {
        const direction = layer.direction === 'up' ? 1 : -1;
        const parallaxAmount = direction * (layer.speed ?? 0) * scrollInProgress * 100;
        const startPosition = parseInt(layer.startPos ?? '0', 10);
        const xPos = layer.position?.x ?? '50%';
        const moveY = startPosition + parallaxAmount;
        // imgEl.style.objectPosition = `${layer.position?.x ?? '50%'} ${startPosition + parallaxAmount}px`;
        el.style.transform = `translateY(${moveY}px) translateX(${xPos}%) `;
      }

      imgEl.style.objectFit = layer.objectFit ?? 'cover';

      // Phase 2: Convergence and scale
      if (convergenceProgress > 0 && scrollProgress < this.scrollOutStart) {
        const scale = 1 - (1 - this.finalScale) * convergenceProgress;
        imgEl.style.transform = `scale(${scale})`;
        // el.style.transform = `scale(${scale})`;
        // el.style.transformOrigin = '51% 20%';
        // el.style.transformOrigin = '460px 200px';
        el.style.width = `${Math.max(100 * scale, 100)}%`;
        // el.style.left = '20.5%'; // Centering based on max shrink
      } else if (scrollProgress < this.convergenceStart) {
        // Reset transform before convergence
        el.style.transform = '';
        el.style.width = `100%`;
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
      // 120% -> 0% with smoothness
      this.stageImgEl.style.transform = `translateY(${(1 - stageImgProgress) * 120}%)`;
      // Optionally, add easing:
      // const eased = 1 - Math.pow(1 - stageImgProgress, 2); // easeOut
      // this.stageImgEl.style.transform = `translateY(${(1 - eased) * 120}%)`;
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
