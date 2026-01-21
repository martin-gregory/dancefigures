import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('site-navigation')
export class SiteNavigation extends LitElement {
  @property({ type: Boolean })
  private isMenuOpen = false;

  static override styles = css`
    :host {
      display: block;
      --accent-colour: #6e90c0;
    }
    /* Navigation */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
    }

    .logo {
      font-size: 28px;
      color: var(--accent-colour);
      font-family: 'helvetica serif';
    }

    .nav-links {
      display: flex;
      gap: 32px;
    }

    .nav-links a {
      color: #374151;
      text-decoration: none;
      transition: color 0.3s;
    }

    .nav-links a:hover {
      color: var(--accent-colour);
    }

    .menu-btn {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      flex-direction: column;
      gap: 4px;
    }

    .menu-btn span {
      width: 24px;
      height: 2px;
      background: #374151;
    }

    .mobile-menu {
      display: none;
      background: white;
      border-top: 1px solid #e5e7eb;
    }

    .mobile-menu.open {
      display: block;
    }

    .mobile-menu a {
      display: block;
      padding: 12px 20px;
      color: #374151;
      text-decoration: none;
    }

    .mobile-menu a:hover {
      background: #fef3c7;
    }

    /* Responsive */
    @media (min-width: 768px) {
      .menu-btn {
        display: none;
      }
    }

    @media (max-width: 767px) {
      .nav-links {
        display: none;
      }

      .menu-btn {
        display: flex;
      }
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
  }

  private toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  override render() {
    return html`
      <!-- Navigation -->
      <nav>
        <div class="nav-container">
          <div class="logo">Dance Figures - Conceptual Paintings</div>
          <div class="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#workshops">Workshops</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </div>
          <button class="menu-btn" @click=${this.toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="mobile-menu ${this.isMenuOpen ? 'open' : ''}">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#workshops">Workshops</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    `;
  }
}
