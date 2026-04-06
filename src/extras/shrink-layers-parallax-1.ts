import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('artwork-in-scene')
export class ShrinkLayersParallax extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100vw;
      width: 100%;
      /* overflow: hidden; */
      height: 200vh;
      min-height: 400px;
      /* max-height: 900px; */
    }
    .layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      will-change: transform;
      transition: transform 0.1s ease-out;
    }
    .layer img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-fit: contain;
      object-position: 0 30%;
      user-drag: none;
      pointer-events: none;
    }

    @keyframes rotate {
      from {
        transform: rotate(5deg) translateX(0px);
      }
      to {
        transform: rotate(0deg) translateX(0px);
      }
    }

    @keyframes launch {
      from {
        transform: translate(-10px, -10px);
      }
      to {
        transform: translate(0px, 0px);
      }
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
  convergenceStart = 6500; // Scroll position where convergence starts

  @property({ type: Number })
  convergenceEnd = 12000; // Scroll position where convergence completes

  @property({ type: Number })
  finalScale = 0.3; // Final size (30%)

  private onScroll = () => {
    const scrollY = window.scrollY - 1000;
    const actualScrollY = window.scrollY;
    console.log({ scrollY });


    // Calculate convergence progress (0 to 1)
    const convergenceProgress = Math.min(
      Math.max((actualScrollY - this.convergenceStart) / (this.convergenceEnd - this.convergenceStart), 0),
      1
    );
    console.log({ convergenceProgress });

    // Animate layers
    this.layers.forEach((layer, idx) => {
      const el = this.renderRoot.querySelectorAll('.layer')[idx] as HTMLElement;
      const imgEl = this.renderRoot.querySelectorAll('.layer img')[idx] as HTMLElement;

      if (!el || !imgEl) return;

      const base = layer.direction === 'up' ? -layer.speed * scrollY : layer.speed * scrollY;
      const xPos = layer.position?.x ? layer.position.x : '50%';
      const objectFit = layer.objectFit ? layer.objectFit : 'cover';

      // Apply parallax to image
      imgEl.style.objectPosition = `${xPos} ${base + (layer.startPos ? parseInt(layer.startPos) : 0)}px`;
      imgEl.style.objectFit = objectFit;

      // Apply convergence and scale transformation to layer container
      if (convergenceProgress > 0) {
        // Calculate scale (1 to finalScale)
        const scale = 1 - (1 - this.finalScale) * convergenceProgress;

        // Calculate translation to center all layers
        // Layers converge to the center of the viewport
        const translateX = 0;
        const translateY = 0;

        // Apply combined transformation
        el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        el.style.transformOrigin = 'center center';
      } else {
        el.style.transform = '';
      }
    });
  };

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  override disconnectedCallback() {
    window.removeEventListener('scroll', this.onScroll);
    super.disconnectedCallback();
  }

  override render() {
    console.log(this);

    return html`
      <div>
        ${this.layers.map((layer) => {
      const containerStyle = layer.container?.maxWidth ? `max-width: ${layer.container.maxWidth}; margin: 0 auto;` : '';
      return html`
            <div class="layer" style="${containerStyle}" >
              <img src="${layer.src}" alt="Hero Layer" draggable="false" id="${layer.id ? layer.id : ''}" />
            </div>
          `;
    })}
      </div>
    `;
  }
}