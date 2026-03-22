import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { commonStyles } from '../styles/common-styles';

@customElement('workshop-site')
export class WorkshopSite extends LitElement {
  @property({ type: Boolean })
  private isMenuOpen = false;

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
        padding: 80px 20px;
      }

      .section-title {
        font-size: clamp(2rem, 4vw, 2.5rem);
        font-weight: bold;
        color: #1f2937;
        text-align: center;
        margin-bottom: 48px;
      }

      /* About */
      .about-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 48px;
        max-width: 1200px;
        margin: 0 auto;
        align-items: center;
      }

      .about-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      .about-text p {
        color: #4b5563;
        margin-bottom: 16px;
        line-height: 1.8;
      }

      /* Contact */
      .contact-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
        max-width: 1000px;
        margin: 0 auto;
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .contact-item {
        display: flex;
        gap: 12px;
      }

      .contact-item h3 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
      }

      .contact-item p {
        color: #6b7280;
      }

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .contact-form input,
      .contact-form textarea {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 16px;
        font-family: inherit;
      }

      .contact-form input:focus,
      .contact-form textarea:focus {
        outline: none;
        border-color: var(--accent-colour);
        box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
      }

      .contact-form button {
        background: var(--accent-colour);
        color: white;
        border: none;
        padding: 12px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
      }

      .contact-form button:hover {
        background: #b45309;
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

      .footer-links a {
        color: white;
        text-decoration: none;
        transition: color 0.3s;
      }

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

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll-to', this.handleScrollTo.bind(this));
  }
  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll-to', this.handleScrollTo.bind(this));
  }

  private handleSubmit() {
    alert("Message sent! We'll get back to you soon.");
  }

  private handleScrollTo(e: CustomEvent) {
    if (e.detail.id) {
      const el = this?.shadowRoot?.getElementById(e.detail.id)
      el?.scrollIntoView({ behavior: 'instant' });
    }
  }

  override render() {
    return html`
      <!-- Navigation -->
      <slot name="navigation"></slot>

      <div id="top"></div>
      <slot name="site-header"></slot>
      <div id="held-wind"></div>

      <slot name="project-1"></slot>
      <div id="moved-tides"></div>
      <slot name="project-2"></slot>
      <div id="dunes-part-1"></div>
      <slot name="project-3"></slot>

        <!-- Footer -->
        <!--  <footer>
          <p>© 2026 Diakova Art</p>
          <div class="footer-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Pinterest</a>
          </div>
        </footer> -->
    `;
  }
}
