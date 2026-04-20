import { LitElement, css, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Layer {
  src: string;
  speed: number; // Parallax intensity (e.g., 0.1 to 0.8)
  topPct: number; // Starting Y position as % of container height
  leftPct?: number; // Starting X position as % of container width
  rightPct?: number; // Starting X position as % of container width
  widthPct?: number; // How wide the image is relative to container (e.g., 50)
  zIndex?: number;
  alt?: string;
  scale?: number; // New: scale multiplier (e.g. 1.2 for foreground)
  heightVh?: number; // e.g., 50 means 50% of the screen height
  fetchPriority?: 'high' | 'low' | 'auto'; // Optional fetch priority for the image
  edgeAnchor?: {
    edge: 'left' | 'right';
    offset?: number; // px offset from the edge, defaults to 0
  };
}
@customElement('hero-parallax-panel')
export class HeroParallaxPanel extends LitElement {
  static override styles = css`
    :host {
      --panel-background-position: center 0;
      display: block;
      position: relative;
      width: 100%;
      height: var(--panel-height, 400vh); /* Default to 400vh if not set */
      /* min-height: 800px; */
      overflow: hidden;
      background: var(--panel-background-image) no-repeat var(--panel-background-position);
      background-size: cover;
      view-timeline-name: --image-section;
      view-timeline-axis: block;
    }

    figure {
      margin: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    figure figcaption {
      visibility: hidden;
    }

    .layer-container {
      position: absolute;
      width: 100%;
      /* This ensures the 'top' percentage is relative to the hero height */
      will-change: transform;
      pointer-events: none; /* Stops images from interfering with clicks/scrolling */
      /* Adjust this if you want layers to scale from the top instead of the center */
      transform-origin: 0 center;

      display: flex;
      justify-content: center;

      /* This centers the image horizontally inside the container */
    }

    .layer-container.edge-anchored {
      justify-content: flex-start; /* image hangs from the pinned edge */
      width: auto; /* don't stretch across the full width */
    }

    .layer-container img {
      display: block;
      width: auto; /* Let width follow the height */
      max-width: none; /* Allow it to be wider than the screen if needed */
      user-drag: none;
      /* object-position: 0 0%; */
      /* margin: 0 auto; */
      /* Center horizontally by default */
    }

    /* .layer img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 0 0%;
      user-drag: none;
      pointer-events: none;
    } */

    h2 {
      text-align: center;
      display: flex;
      gap: 20px;
      font-size: 4rem;
      font-weight: normal;
      color: #edebed;
      font-family: 'Gabriola', cursive;
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

    @media (max-width: 768px) {
      h2 {
        font-size: 2rem;
        gap: 8px;
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
  `;

  @property({ type: Array })
  words: string[] = ['Held', 'by', 'the', 'Wind'];

  @property({ type: Array }) layers: Layer[] = [];

  @property({ type: String }) caption: string = '';

  @state() private layerImgElements: HTMLElement[] = [];
  private rafId: number = 0;
  private ticking = false;

  private observer: IntersectionObserver | null = null;
  private isVisible = false;

  // Cache DOM elements after first render
  protected override firstUpdated(_changed: PropertyValues) {
    // Update the selector to match your new render() class name
    this.layerImgElements = Array.from(this.renderRoot.querySelectorAll('.layer-container')) as HTMLElement[];

    this.onScroll();

    this.observer = new IntersectionObserver(
      (entries) => {
        this.isVisible = entries[0].isIntersecting;
        if (this.isVisible) {
          // Kick off the loop again when it scrolls into view
          this.rafId = requestAnimationFrame(this.smoothUpdate);
        }
      },
      { threshold: 0.01 }, // Trigger as soon as 1 pixel is visible
    );
    this.observer.observe(this);
  }

  private getLayerPositionStyle(layer: Layer): string {
    const top = `top: ${layer.topPct}%;`;
    const zIndex = `z-index: ${layer.zIndex ?? 1};`;

    if (layer.edgeAnchor) {
      // Pin to viewport edge using fixed px offset — unaffected by container width
      const offset = layer.edgeAnchor.offset ?? 0;
      const edgeProp = layer.edgeAnchor.edge === 'left' ? `left: ${offset};` : `right: ${offset};`;
      return `${top} ${edgeProp} ${zIndex}`;
    }

    // Fallback to existing % system
    const left = layer.leftPct !== undefined ? `left: ${layer.leftPct}%;` : '';
    const right = layer.rightPct !== undefined ? `right: ${layer.rightPct}%;` : '';
    return `${top} ${left} ${right} ${zIndex}`;
  }

  private targetScroll = 0;
  private currentScroll = 0;
  // private rafId = 0;

  override connectedCallback() {
    super.connectedCallback();
    // Start the animation loop immediately
    this.rafId = requestAnimationFrame(this.smoothUpdate);
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  override disconnectedCallback() {
    window.removeEventListener('scroll', this.onScroll);
    cancelAnimationFrame(this.rafId);
    super.disconnectedCallback();
  }

  // 1. The Scroll listener ONLY updates the target destination
  private onScroll = () => {
    const rect = this.getBoundingClientRect();
    // We store the 'raw' position from the scroll event
    this.targetScroll = -rect.top;
  };

  // 2. The RAF loop constantly "eases" the current position toward the target
  private smoothUpdate = () => {
    const rect = this.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // If not visible, stop the loop and don't request a new frame
    if (!this.isVisible) {
      cancelAnimationFrame(this.rafId);
      return;
    }

    // Check if component is in view to save GPU cycles
    if (rect.top < viewportHeight && rect.bottom > 0) {
      // LERP MATH: Current + (Target - Current) * EaseFactor
      // 0.1 is smooth, 0.05 is "heavy/dreamy", 0.2 is snappy.
      this.currentScroll += (this.targetScroll - this.currentScroll) * 0.1;

      // Use the smoothed 'currentScroll' for the math instead of raw rect.top
      const scrollProgress = this.currentScroll / rect.height;

      this.layers.forEach((layer, idx) => {
        const el = this.layerImgElements[idx];
        if (!el) return;

        const movement = Math.round(scrollProgress * rect.height * layer.speed);
        const scale = layer.scale ?? 1;

        // translate3d is essential for hardware acceleration on PC/Chrome
        el.style.transform = `translate3d(0, ${movement}px, 0) scale(${scale})`;
      });
    }

    // Keep the loop running
    this.rafId = requestAnimationFrame(this.smoothUpdate);
  };

  override render() {
    return html`
      <header class="text-parallax-container">
        <h2>${this.words.map((word, index) => html`<span style="--i: ${index * 5 - 10}">${word}</span>`)}</h2>
      </header>
      <figure>
        ${this.layers.map(
      (layer) => html`
            <div class="layer-container ${layer.edgeAnchor ? 'edge-anchored' : ''}" style="${this.getLayerPositionStyle(layer)}">
              <img
                src="${layer.src}"
                style="height: ${layer.heightVh ?? 50}vh;"
                alt="${layer.alt || ''}"
                fetchpriority="${layer.fetchPriority ?? 'auto'}"
              />
            </div>
          `,
    )}
        ${this.caption ? html`<figcaption>${this.caption}</figcaption>` : ''}
      </figure>
    `;
  }
}
