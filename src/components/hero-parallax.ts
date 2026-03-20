import { LitElement, css, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Layer {
  src: string;
  speed: number; // Parallax speed multiplier
  startPos?: string; // Starting offset px
  stopPos?: string; // Max parallax px
  direction?: 'up' | 'down';
  position?: { x?: string };
  objectFit?: string;
  container?: { maxWidth?: string };
  id?: string;
  alt?: string;
  cssName?: string;
}

@customElement('hero-parallax')
export class HeroParallax extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100vw;
      min-height: 400px;
      height: 650vh;
      overflow: hidden;
      min-width: 800px;
      view-timeline-name: --image-section;
      view-timeline-axis: block;
      max-width: 1880px;
      margin: 0 auto;
    }
    .layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
    }
      &.is-background {
        height: 100% !important;
        img {
        height: 100% !important;
        }
      }

      .background {
        object-fit: cover !important;
        object-position: 50% 50% !important;
      }

      .layer-1 {
        /* width: 92%;
        object-fit: contain !important;
        object-position: 0 20% !important; */
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
    .layer img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 0 0%;
      user-drag: none;
      pointer-events: none;
    }

    .text-parallax-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100vh;
    }

    h2 {
      text-align: center;
      display: flex;
      gap: 20px;
      font-size: 4rem;
      font-weight: normal;
      color: #edebed;
      font-family: cursive;
      z-index: 10;
      position: fixed;
      bottom: 20px;
      right: 80px;
      bottom: 10%;
      right: 10%;
      span {
        animation: text-parallax both;
        animation-timeline: --image-section;
        animation-range: cover;
      }
    }

    @keyframes text-parallax {
      0% {
        opacity: 0;
        transform: translateY(calc(var(--i) * 30%));
      }

      5% {
        opacity: 0;
      }

      30% {
        opacity: 1;
        transform: translateY(0);
      }
      80% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }

    .image-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center 0;
      animation: image-parallax linear both;
      animation-timeline: --image-section;
      animation-range: cover;
    }
  `;

  @property({ type: Array })
  words: string[] = ['Held', 'by', 'the', 'Wind'];

  @property({ type: Array }) layers: Layer[] = [];

  // Helper: Clamp val between min,max
  private clamp(val: number, min = 0, max = 1): number {
    return Math.max(min, Math.min(val, max));
  }

  @state() private layerImgElements: HTMLElement[] = [];
  private rafId: number = 0;
  private ticking = false;

  // Cache DOM elements after first render
  protected override firstUpdated(_changed: PropertyValues) {
    this.layerImgElements = Array.from(this.renderRoot.querySelectorAll('.layer img')) as HTMLElement[];
    console.log(this.layerImgElements);

    this.onScroll(); // update once right after first render
  }

  // Only re-render parallax smoothly via RAF
  private onScroll = () => {
    const rect = this.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView) {
      const relativeScroll = parseInt(`${-rect.top}`); // 0 when element top hits viewport
      console.log({ relativeScroll });

      let counter = 0;
      const spacer = 200;

      this.layers.forEach((layer, idx) => {
        const el = this.layerImgElements[idx];
        if (!el) return;
        const directionMultiplier = layer.direction === 'up' ? -1 : 1;
        const speed = layer.speed ?? 0;

        const startPos = layer.startPos ? parseInt(layer.startPos) : 0;
        const xPos = layer.position?.x ?? 0;

        let desiredMove = directionMultiplier * speed * relativeScroll + startPos;
        const percentOfHeight = 1; // move up to 30% of element's height
        const maxMove = el.offsetHeight * percentOfHeight;

        const moveY = Math.max(Math.min(desiredMove, maxMove), -maxMove);
        const scale = layer.scale ?? 1;
        if (xPos) {
          el.style.transform = `translateY(${moveY}px) translateX(${xPos}%) scale(${scale})`;
        } else {
          el.style.transform = `translateY(${moveY}px) scale(${scale})`;
        }
        // select the parent layer of el
      });
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    this.rafId = requestAnimationFrame(this.onScrollRaf);
    window.addEventListener('scroll', this.onScroll, { passive: true }); // for smarter layouts if needed
  }

  override disconnectedCallback() {
    window.removeEventListener('scroll', this.onScroll);
    cancelAnimationFrame(this.rafId);
    super.disconnectedCallback();
  }

  private onScrollRaf = () => {
    if (!this.ticking) {
      this.rafId = requestAnimationFrame(() => {
        this.onScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  override render() {
    const myLayers = this.layers;

    return html`
      <div>
        <div class="text-parallax-container">
          <h2>${this.words.map((word, index) => html`<span style="--i: ${index * 5 - 10}">${word}</span>`)}</h2>
        </div>
        ${myLayers.map((layer) => {
      const isBackground = layer?.cssName === 'background';
      const containerStyle = layer.container?.maxWidth ? `max-width: ${layer.container.maxWidth}; margin: 0 auto;` : '';

      return html`
            <div class="layer ${isBackground ? 'is-background' : ''}" style="${containerStyle}">
              <img src="${layer.src}" alt="${layer.alt ?? 'Hero Layer'}" draggable="false" id="${layer.id ?? ''}" class="${layer.cssName ?? ''}" />
            </div>
          `;
    })}
      </div>
    `;
  }
}
