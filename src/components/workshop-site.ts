import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('workshop-site')
export class WorkshopSite extends LitElement {
  @property({ type: Boolean })
  private isMenuOpen = false;

  static override styles = css`
    :host {
      display: block;
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
      font-size: 24px;
      font-weight: bold;
      color: #d97706;
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
      color: #d97706;
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
      background: #d97706;
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

    /* Workshops */
    .bg-gray {
      background: #f9fafb;
    }

    .workshops-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .workshop-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s;
    }

    .workshop-card:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }

    .workshop-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .workshop-content {
      padding: 24px;
    }

    .workshop-title {
      font-size: 24px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 16px;
    }

    .workshop-meta {
      color: #6b7280;
      margin-bottom: 16px;
    }

    .workshop-price {
      font-size: 28px;
      font-weight: bold;
      color: #d97706;
      margin-bottom: 16px;
    }

    .workshop-card button {
      width: 100%;
      background: #d97706;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .workshop-card button:hover {
      background: #b45309;
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
      border-color: #d97706;
      box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
    }

    .contact-form button {
      background: #d97706;
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

    /* Responsive */
    @media (min-width: 768px) {
      .menu-btn {
        display: none;
      }

      .about-grid {
        grid-template-columns: 1fr 1fr;
      }

      .workshops-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      /* .carousel-item {
        flex: 0 0 33.333%;
      } */

      .contact-grid {
        grid-template-columns: 1fr 1fr;
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

  private handleSubmit() {
    alert('Message sent! We\'ll get back to you soon.');
  }

  override render() {
    return html`
          <!-- Navigation -->
          <nav>
            <div class="nav-container">
              <div class="logo">Artisan Studio</div>
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

          <!-- Hero -->
          <section id="home" class="hero">
            <img class="hero-image" src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=2000&h=1200&fit=crop" alt="Painting Workshop" />
            <div class="hero-overlay"></div>
            <div class="hero-content">
              <h1>Unleash Your Creativity</h1>
              <p>Join our painting workshops and discover the artist within you</p>
              <a href="#workshops" class="btn">Explore Workshops</a>
            </div>
          </section>

          <slot name="hero"></slot>

          <!-- About -->
          <section id="about">
            <div class="about-grid">
              <div class="about-text">
                <h2 class="section-title">About Our Studio</h2>
                <p>Welcome to Artisan Studio, where creativity meets community. For over a decade, we've been inspiring artists of all levels to explore their passion for painting in a supportive and vibrant environment.</p>
                <p>Our experienced instructors bring years of expertise and a genuine love for teaching. Whether you're picking up a brush for the first time or looking to refine your technique, we have the perfect workshop for you.</p>
                <p>Join our community of creative souls and embark on an artistic journey that will transform the way you see the world.</p>
              </div>
              <div>
                <img class="about-image" src="https://images.unsplash.com/photo-1561489396-888724a1543d?w=800&h=600&fit=crop" alt="Art Studio" />
              </div>
            </div>
          </section>

          <!-- Workshops -->
          <section id="workshops" class="bg-gray">
            <h2 class="section-title">Our Workshops</h2>
            <div class="workshops-grid">
              <div class="workshop-card">
                <img class="workshop-image" src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop" alt="Beginner Watercolor" />
                <div class="workshop-content">
                  <h3 class="workshop-title">Beginner Watercolor</h3>
                  <p class="workshop-meta">⏱️ 4 weeks</p>
                  <div class="workshop-price">$150</div>
                  <button>Enroll Now</button>
                </div>
              </div>
              <div class="workshop-card">
                <img class="workshop-image" src="https://images.unsplash.com/photo-1524721696987-b9527df9e512?w=600&h=400&fit=crop" alt="Acrylic Techniques" />
                <div class="workshop-content">
                  <h3 class="workshop-title">Acrylic Techniques</h3>
                  <p class="workshop-meta">⏱️ 6 weeks</p>
                  <div class="workshop-price">$200</div>
                  <button>Enroll Now</button>
                </div>
              </div>
              <div class="workshop-card">
                <img class="workshop-image" src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&h=400&fit=crop" alt="Portrait Painting" />
                <div class="workshop-content">
                  <h3 class="workshop-title">Portrait Painting</h3>
                  <p class="workshop-meta">⏱️ 8 weeks</p>
                  <div class="workshop-price">$280</div>
                  <button>Enroll Now</button>
                </div>
              </div>
            </div>
          </section>

          <slot name="gallery"></slot>

          <!-- Contact -->
          <section id="contact" class="bg-gray">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-grid">
              <div class="contact-info">
                <div class="contact-item">
                  <div>📍</div>
                  <div>
                    <h3>Location</h3>
                    <p>123 Creative Avenue<br />Art District, CA 90210</p>
                  </div>
                </div>
                <div class="contact-item">
                  <div>📞</div>
                  <div>
                    <h3>Phone</h3>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                <div class="contact-item">
                  <div>✉️</div>
                  <div>
                    <h3>Email</h3>
                    <p>hello@artisanstudio.com</p>
                  </div>
                </div>
              </div>
              <div class="contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message" rows="4"></textarea>
                <button @click=${this.handleSubmit}>Send Message</button>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer>
            <p>© 2026 Artisan Studio. All rights reserved.</p>
            <div class="footer-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Pinterest</a>
            </div>
          </footer>
        `;
  }
}
