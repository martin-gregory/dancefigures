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
      width: 100%;
      height: 100%;
      will-change: transform;
      transition: transform 0.1s ease-out;
      min-height:2560px;
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
  scrollInEnd = 800; // When scroll-in phase ends (image in view)

  @property({ type: Number })
  convergenceStart = 800; // When convergence/scale starts

  @property({ type: Number })
  convergenceEnd = 2000; // When convergence/scale completes

  @property({ type: Number })
  scrollOutStart = 2000; // When scroll-out phase begins

  @property({ type: Number })
  finalScale = 0.3; // Final size (30%)

  private onScroll = () => {
    const hostRect = this.getBoundingClientRect();
    const hostTop = hostRect.top;
    const scrollProgress = -hostTop; // How far we've scrolled into the component

    // Phase 1: Scroll in with parallax (0 to scrollInEnd)
    const scrollInProgress = Math.min(Math.max(scrollProgress / this.scrollInEnd, 0), 1);

    // Phase 2: Convergence/scale (convergenceStart to convergenceEnd)
    const convergenceProgress = Math.min(
      Math.max((scrollProgress - this.convergenceStart) / (this.convergenceEnd - this.convergenceStart), 0),
      1
    );

    // Animate layers
    this.layers.forEach((layer, idx) => {
      const el = this.renderRoot.querySelectorAll('.layer')[idx] as HTMLElement;
      const imgEl = this.renderRoot.querySelectorAll('.layer img')[idx] as HTMLElement;

      if (!el || !imgEl) return;

      const xPos = layer.position?.x ? layer.position.x : '50%';
      const objectFit = layer.objectFit ? layer.objectFit : 'cover';

      // Phase 1: Parallax during scroll-in
      if (scrollProgress < this.scrollInEnd) {
        const parallaxAmount = layer.direction === 'up'
          ? layer.speed * scrollInProgress * 100
          : -layer.speed * scrollInProgress * 100;

        const startPosition = layer.startPos ? parseInt(layer.startPos) : 0;
        imgEl.style.objectPosition = `${xPos} ${startPosition + parallaxAmount}px`;
      }

      imgEl.style.objectFit = objectFit;

      // Phase 2: Convergence and scale
      if (convergenceProgress > 0 && scrollProgress < this.scrollOutStart) {
        // Calculate scale (1 to finalScale)
        const scale = 1 - (1 - this.finalScale) * convergenceProgress;

        // Apply scale transformation (layers stay centered and converge)
        el.style.transform = `scale(${scale})`;
        el.style.transformOrigin = 'center center';
      } else if (scrollProgress < this.convergenceStart) {
        // Before convergence, no scale
        el.style.transform = '';
      }
    });
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
      const containerStyle = layer.container?.maxWidth
        ? `max-width: ${layer.container.maxWidth}; margin: 0 auto;`
        : '';
      return html`
            <div class="layer" style="${containerStyle}">
              <img 
                src="${layer.src}" 
                alt="Hero Layer" 
                draggable="false" 
                id="${layer.id ? layer.id : ''}" 
              />
            </div>
          `;
    })}
      </div>
    `;
  }
}