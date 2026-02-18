import { LitElement, css, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Layer {
  src: string;
  speed: number;       // Parallax speed multiplier
  startPos?: string;   // Starting offset px
  stopPos?: string;    // Max parallax px
  direction?: 'up' | 'down';
  position?: { x?: string };
  objectFit?: string;
  container?: { maxWidth?: string };
  id?: string;
  alt?: string;
}

@customElement('hero-parallax')
export class HeroParallax extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100vw;
      min-height: 400px;
      height: 200vh;
    }
    .layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
    }
    .layer img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 0 30%;
      user-drag: none;
      pointer-events: none;
    }
    /* Animation styles omitted for brevity, add your own if needed */
  `;

  @property({ type: Array }) layers: Layer[] = [];

  @state() private layerImgElements: HTMLElement[] = [];
  private rafId: number = 0;

  // Cache DOM elements after first render
  protected override firstUpdated(_changed: PropertyValues) {
    this.layerImgElements = Array.from(this.renderRoot.querySelectorAll('.layer img')) as HTMLElement[];
    this.onScroll(); // update once right after first render
  }

  // Helper: Clamp val between min,max
  private clamp(val: number, min = 0, max = 1): number {
    return Math.max(min, Math.min(val, max));
  }

  // Only re-render parallax smoothly via RAF
  private onScroll = () => {
    // Get scroll progress in px:
    const scrollY = window.scrollY || window.pageYOffset;

    this.layers.forEach((layer, idx) => {
      const el = this.layerImgElements[idx];
      if (!el) return;
      const directionMultiplier = layer.direction === 'up' ? -1 : 1;
      const speed = layer.speed ?? 0;
      const startPos = layer.startPos ? parseInt(layer.startPos) : 0;
      const stopPos = layer.stopPos ? parseInt(layer.stopPos) : undefined;
      const xPos = layer.position?.x ?? '50%';
      const objectFit = layer.objectFit ?? 'cover';

      // Calculate movement
      let moveY = directionMultiplier * speed * scrollY + startPos;
      if (typeof stopPos === 'number') {
        // If we'd exceed stopPos, clamp it
        if (directionMultiplier > 0) {
          moveY = Math.min(moveY, stopPos);
        } else {
          moveY = Math.max(moveY, stopPos);
        }
      }
      el.style.objectPosition = `${xPos} ${moveY}px`;
      el.style.objectFit = objectFit;
    });

    this.rafId = requestAnimationFrame(this.onScroll); // keep looping
  };

  override connectedCallback() {
    super.connectedCallback();
    this.rafId = requestAnimationFrame(this.onScroll);
    window.addEventListener('resize', this.onScroll, { passive: true }); // for smarter layouts if needed
  }

  override disconnectedCallback() {
    window.removeEventListener('resize', this.onScroll);
    cancelAnimationFrame(this.rafId);
    super.disconnectedCallback();
  }

  override render() {
    return html`
      <div>
        ${this.layers.map((layer) => {
      const containerStyle = layer.container?.maxWidth ? `max-width: ${layer.container.maxWidth}; margin: 0 auto;` : '';
      return html`
            <div class="layer" style="${containerStyle}">
              <img
                src="${layer.src}"
                alt="${layer.alt ?? 'Hero Layer'}"
                draggable="false"
                id="${layer.id ?? ''}" />
            </div>
          `;
    })}
      </div>
    `;
  }
}