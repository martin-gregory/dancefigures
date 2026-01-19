import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('hero-parallax')
export class HeroParallax extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100vw;
      width: 100%;
      overflow: hidden;
      height: 90vh;
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
    }
    .layer img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position:0 30%;
      user-drag: none;
      pointer-events: none;
    }
  `;

  @property({ type: Array })
  layers: Array<{ src: string; speed: number, startPos?: string, stopPos?: string, direction?: string }> = [
    // Sample config: list your images and their parallax speed factor (higher = moves more)
    // { src: '/assets/9print-1024x1536.jpg', speed: 0.1 },
    // { src: '/assets/held-by-the-wind.jpg', speed: 0.3 },
    { src: '/assets/test-1.jpg', speed: 0, startPos: '-320' },
    { src: '/assets/test-2.png', speed: 0.02, startPos: '-400' },
    { src: '/assets/test-3.png', speed: 0.02, startPos: '-470', direction: 'up' },
    { src: '/assets/test-4.png', speed: 0.07, startPos: '-500', stopPos: '200' },
    // { src: '/assets/layer3.png', speed: 0.6 },
  ];

  private onScroll = () => {
    const scrollY = window.scrollY - 1000;
    // Animate layers
    this.layers.forEach((layer, idx) => {
      const el = this.renderRoot.querySelectorAll('.layer img')[idx] as HTMLElement;
      const base = layer.direction === 'up' ? -layer.speed * scrollY : layer.speed * scrollY;
      // If stopPos is defined, limit the movement
      if (layer.stopPos) {
        const stopValue = parseInt(layer.stopPos);
        if (base + (layer.startPos ? parseInt(layer.startPos) : 0) > stopValue) {
          // Exceeded stop position
          el.style.objectPosition = `50% ${stopValue}px`;
          return;
        }
      }
      if (el) {
        // el.style.transform = `translateY(${scrollY * layer.speed}px)`;
        el.style.objectPosition = `50% ${base + (layer.startPos ? parseInt(layer.startPos) : 0)}px`;
        // el.style.objectPosition = `50% ${scrollY * layer.speed + (layer.startPos ? parseInt(layer.startPos) : 0)}px`;
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
    return html`
      <div>
        ${this.layers.map(
      (layer) => html`
            <div class="layer">
              <img src="${layer.src}" alt="Hero Layer" draggable="false" />
            </div>
          `
    )}
      </div>
      <slot></slot>
    `;
  }
}