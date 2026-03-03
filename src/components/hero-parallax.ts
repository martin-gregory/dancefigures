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
type ParallaxLayer = {
  direction?: 'up' | 'down';
  speed?: number;
  startPos?: number; // Will be calculated
  position?: { x?: number };
  scale?: number;
};

@customElement('hero-parallax')
export class HeroParallax extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100vw;
      min-height: 400px;
      /* height: 200vh; */
      height: 600vh;
      height: 650vh;
      overflow: hidden;
      min-width: 2000px;
    }
    .layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      will-change: transform;

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
    /* Animation styles omitted for brevity, add your own if needed */
  `;

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
    this.onScroll(); // update once right after first render
  }

  // Call this once when initializing layers
  // private setLayerStartPositions(layers: ParallaxLayer[], baseSpacing = 200): any[] {
  //   return layers.map((layer, idx) => {
  //     // Background layer: stays at 0
  //     if (idx === 0) return { ...layer, startPos: 0 };

  //     // First parallax layer: stays at 0 (or custom if needed)
  //     if (idx === 1) return { ...layer, startPos: 0 };

  //     // Subsequent layers: offset by baseSpacing each
  //     const prevStart = layers[idx - 1].startPos ?? 0;
  //     return { ...layer, startPos: prevStart + baseSpacing };
  //   });
  // }

  // Only re-render parallax smoothly via RAF
  private onScroll = () => {
    // Get scroll progress in px:
    // const scrollY = window.scrollY || window.pageYOffset;
    const rect = this.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView) {
      const relativeScroll = parseInt(`${-rect.top}`); // 0 when element top hits viewport
      console.log(relativeScroll);
      let counter = 0;
      const spacer = 200;

      this.layers.forEach((layer, idx) => {
        const el = this.layerImgElements[idx];
        if (!el) return;
        const directionMultiplier = layer.direction === 'up' ? -1 : 1;
        const speed = layer.speed ?? 0;

        const startPos = layer.startPos ? parseInt(layer.startPos) : 0;
        const xPos = layer.position?.x ?? 0;

        // Calculate movement
        // let moveY = directionMultiplier * speed * relativeScroll + startPos;
        // // el.style.objectPosition = `${xPos}% ${moveY}%`;
        // el.style.transform = `translateY(${moveY}px)`;
        // el.style.objectPosition = `${xPos}% top`;

        let desiredMove = directionMultiplier * speed * relativeScroll + startPos;
        const percentOfHeight = 1; // move up to 30% of element's height
        const maxMove = el.offsetHeight * percentOfHeight;
        console.log({ maxMove, desiredMove }, el.offsetHeight);

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
    // const myLayers = this.setLayerStartPositions(this.layers, 200);
    const myLayers = this.layers;
    console.log(myLayers);

    return html`
      <div>
        ${myLayers.map((layer) => {
      const containerStyle = layer.container?.maxWidth ? `max-width: ${layer.container.maxWidth}; margin: 0 auto;` : '';

      return html`
            <div class="layer" style="${containerStyle}">
              <img src="${layer.src}" alt="${layer.alt ?? 'Hero Layer'}" draggable="false" id="${layer.id ?? ''}" class="${layer.cssName ?? ''}" />
            </div>
          `;
    })}
      </div>
    `;
  }
}
