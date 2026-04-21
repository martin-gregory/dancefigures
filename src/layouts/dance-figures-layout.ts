import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { commonStyles } from '../styles/common-styles';

@customElement('dance-figures-layout')
export class DanceFiguresLayout extends LitElement {
  static override styles = [
    commonStyles,
    css`
      :host {
        display: block;
        --accent-colour: #b88393;
        --held-by-the-sea-bg: #98717a;
        background-color: var(--held-by-the-sea-bg);
      }

      /* Hero */
      .hero {
        margin-top: 64px;
        height: calc(100vh - 64px);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
      }

      .hero-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
      }

      .hero-content {
        position: relative;
        z-index: 1;
        padding: 20px;
      }

      .hero h1 {
        font-size: clamp(2.5rem, 7vw, 4.5rem);
        margin-bottom: 24px;
        font-weight: bold;
      }

      .hero p {
        font-size: clamp(1.125rem, 2vw, 1.5rem);
        margin-bottom: 32px;
        max-width: 800px;
      }

      .btn {
        display: inline-block;
        background: var(--accent-colour);
        color: white;
        padding: 16px 32px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        font-size: 18px;
        transition: all 0.3s;
      }

      .btn:hover {
        background: #b45309;
        transform: scale(1.05);
      }

      /* Section */
      section {
        padding: 0;
      }

      .section-title {
        font-size: clamp(2rem, 4vw, 2.5rem);
        font-weight: bold;
        color: #1f2937;
        text-align: center;
        margin-bottom: 48px;
      }

      /* Footer */
      footer {
        background: #1f2937;
        color: white;
        padding: 32px 20px;
        text-align: center;
      }

      footer p {
        margin-bottom: 16px;
      }

      .footer-links {
        display: flex;
        justify-content: center;
        gap: 24px;
      }

      .site-footer a,
      .footer-links a {
        color: white;
        text-decoration: none;
        transition: color 0.3s;

        &.collaboration-link {
          color: #ce9d3d;
        }
      }
      .site-footer a:hover,
      .footer-links a:hover {
        color: #fbbf24;
      }

      .spacer {
        height: 100vh;
        /* background-color: #000; */
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      .spacer h2 {
        font-size: 4rem;
      }

      .spacer p {
        font-size: 1.2rem;
      }

      /* Responsive */
      @media (min-width: 768px) {
        .about-grid {
          grid-template-columns: 1fr 1fr;
        }

        .contact-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
    `,
  ];

  static readonly pages = ['held-by-the-wind', 'moved-by-the-tide', 'song-of-the-swaying-dunes-i', 'song-of-the-swaying-dunes-ii'];

  override firstUpdated() {
    const path = window.location.pathname.replace(/\//g, ''); // Removes slashes to get just the string

    // If the current URL path matches one of your painting IDs
    if (DanceFiguresLayout.pages.includes(path)) {

      this.handleScrollTo(
        new CustomEvent('scroll-to', {
          detail: { id: path },
        }) as CustomEvent,
      );
    }
  }

  private updateMetadata(id: string) {
    const titles: Record<string, { t: string, d: string }> = {
      'held-by-the-wind': {
        t: 'Held by the Wind | Dance Figures',
        d: "Explore 'Held by the Wind', a conceptual painting by Tiana Diakova. Part of the Dance Figures collection exploring dance and movement."
      },
      'moved-by-the-tide': {
        t: 'Moved by the Tide | Dance Figures',
        d: "Experience 'Moved by the Tide', an abstract exploration of flow and the human form by Tiana Diakova."
      },
      'song-of-the-swaying-dunes-i': {
        t: 'The Song of the Swaying Dunes I | Dance Figures',
        d: "Part I of the 'Song of the Swaying Dunes' series by Tiana Diakova. A movement-inspired conceptual painting."
      },
      'song-of-the-swaying-dunes-ii': {
        t: 'The Song of the Swaying Dunes II | Dance Figures',
        d: "Part II of the 'Song of the Swaying Dunes' series by Tiana Diakova. An immersive exploration of movement and form."
      }
    };

    const data = titles[id];

    if (data) {
      // 1. Update Title
      document.title = data.t;

      // 2. Update Meta Description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', data.d);
      }

      // 3. Update URL (Quietly)
      window.history.replaceState({}, '', `/${id}`);
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll-to', this.handleScrollTo.bind(this));
    this.addEventListener('update-route', (e: any) => {
      const id = e.detail.id;
      this.updateMetadata(id); // Use the mapping function we wrote earlier
    });
  }
  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll-to', this.handleScrollTo.bind(this));
  }

  private handleScrollTo(e: CustomEvent) {
    if (e.detail.id) {
      const el = this?.shadowRoot?.getElementById(e.detail.id);
      if (el) {
        // Wait for the next paint cycle
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: 'instant', block: 'start' });
          });
        });
      }
    }
  }

  override render() {
    return html`
      <!-- Navigation -->
      <header>
        <slot name="navigation"></slot>
      </header>

      <main>
        <div id="top"></div>
        <slot name="site-header"></slot>

        <section id="held-by-the-wind" aria-labelledby="title-1">
          <h1 class="sr-only" id="project-1-title">Held by the Wind</h1>
          <slot name="artwork-held-by-the-wind"></slot>
        </section>

        <section id="moved-by-the-tide" aria-labelledby="title-2">
          <h1 class="sr-only" id="project-2-title">Moved by the Tide</h1>
          <slot name="artwork-moved-by-the-tide"></slot>
        </section>

        <section id="song-of-the-swaying-dunes-i" aria-labelledby="title-3">
          <h1 class="sr-only" id="project-3-title">The Song of the Swaying Dunes I</h1>
          <slot name="artwork-dunes-part-1"></slot>
        </section>

        <section id="song-of-the-swaying-dunes-ii" aria-labelledby="title-4">
          <h1 class="sr-only" id="project-4-title">The Song of the Swaying Dunes II</h1>
          <slot name="artwork-dunes-part-2"></slot>
        </section>
      </main>

      <!-- Footer -->
      <footer class="site-footer">
        <p>© 2026 Diakova Art</p>
        <p>
          Share my passion for dance and movement?<br />
          <a class="collaboration-link" href="mailto:diakovatv@gmail.com" title="Contact Tiana Diakova via email">I'm interested in collaboration</a>
        </p>
        <div class="footer-links">
          <a
            href="https://www.instagram.com/diakova_art/"
            target="_blank"
            rel="noopener noreferrer"
            title="See more works by Tiana Diakova on Instagram"
            >Instagram</a
          >
          <a href="https://www.diakova-art.com/" target="_blank" rel="noopener noreferrer" title="Visit Tiana Diakova's full collection"
            >diakova-art.com</a
          >
        </div>
      </footer>
    `;
  }
}
