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
  `;

  @property({ type: Array })
  layers: Array<{
    src: string;
    speed: number;
    startPos?: string;
    stopPos?: string;
    direction?: string;
    position?: { x?: string };
    objectFit?: string;
    container?: { maxWidth?: string };
  }> = [];

  private onScroll = () => {
    const scrollY = window.scrollY - 1000;

    // Animate layers
    this.layers.forEach((layer, idx) => {
      const el = this.renderRoot.querySelectorAll('.layer img')[idx] as HTMLElement;
      const base = layer.direction === 'up' ? -layer.speed * scrollY : layer.speed * scrollY;
      const xPos = layer.position?.x ? layer.position.x : '50%';
      const objectFit = layer.objectFit ? layer.objectFit : 'cover';
      // If stopPos is defined, limit the movement
      if (layer.stopPos) {
        const stopValue = parseInt(layer.stopPos);
        if (base + (layer.startPos ? parseInt(layer.startPos) : 0) > stopValue) {
          // Exceeded stop position
          el.style.objectPosition = `${xPos} ${stopValue}px`;
          el.style.objectFit = objectFit;
          return;
        }
      }
      if (el) {
        // el.style.transform = `translateY(${scrollY * layer.speed}px)`;
        el.style.objectPosition = `${xPos} ${base + (layer.startPos ? parseInt(layer.startPos) : 0)}px`;
        el.style.objectFit = objectFit;

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
    console.log(this);

    return html`
      <div>
        ${this.layers.map(
      (layer) => {
        const containerStyle = layer.container?.maxWidth ? `max-width: ${layer.container.maxWidth}; margin: 0 auto;` : '';
        return html`
            <div class="layer" style="${containerStyle}">
              <img src="${layer.src}" alt="Hero Layer" draggable="false" />
            </div>
          `},
    )}
      </div>
    `;
  }
}
