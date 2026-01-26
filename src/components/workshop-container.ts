import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { commonStyles } from '../styles/common-styles';

@customElement('workshop-container')
export class WorkshopContainer extends LitElement {
  static override styles = [
    commonStyles,
    css`
      :host {
        display: block;
        --accent-colour: #6e90c0;
        --held-by-the-sea-bg: #485c71;
        background-color: var(--held-by-the-sea-bg);
      }
    `,
  ];
  private handleSubmit() {
    alert("Message sent! We'll get back to you soon.");
  }
  override render() {
    return html`
      <workshop-site>
        <site-navigation slot="navigation"></site-navigation>
        <hero-scroll slot="hero-scroll-1"></hero-scroll>
        <hero-parallax
          slot="hero-1"
          .layers=${[
        { src: '/img/test-1.jpg', speed: 0, startPos: '-320' },
        { src: '/img/test-3.png', speed: 0.02, startPos: '-470', direction: 'up' },
        {
          src: '/img/test-4.png',
          speed: 0.02,
          startPos: '-500',
          stopPos: '200',
        },
      ]}
        >
          <h1>Held by the Wind</h1>
        </hero-parallax>

        <image-parallax-container
          slot="image-parallax-1"
          imageUrl="/img/test-1.jpg"
          .words=${['Held', 'by', 'the', 'Wind']}
        ></image-parallax-container>

        <pattern-parallax-container
          slot="pattern-parallax-1"
          .words=${['Sensations', 'of', 'the', 'Sea']}
          .layers=${['/img/test-3.png']}
        ></pattern-parallax-container>

        <!-- <progress-parallax-container slot="progress-parallax-1"></progress-parallax-container> -->

        <hr />
        <image-parallax-container
          slot="image-parallax-2"
          imageUrl="/img/tide-animation-bg.jpg"
          .words=${['Moved', 'by', 'the', 'Tide']}
        ></image-parallax-container>

        <pattern-parallax-container
          slot="pattern-parallax-2"
          .words=${['Sensations', 'of', 'the', 'Wind']}
          .layers=${['/img/tide-animation-1.png']}
        ></pattern-parallax-container>

        <hero-parallax
          slot="hero-2"
          .layers=${[
        {
          objectFit: 'fill',
          src: '/img/tide-animation-bg.jpg',
          startPos: '0',
          speed: 0,
        },
        {
          layerPosition: 'back',
          objectFit: 'contain',
          position: { x: '100%' },
          speed: 0.04,
          src: '/img/tide-animation-3-sm.png',
          startPos: '-780',
          // stopPos: '200',
        },
        {
          // container: { maxWidth: '900px' },
          layerPosition: 'middle',
          objectFit: 'contain',
          position: { x: '0%' },
          speed: 0.1,
          src: '/img/tide-animation-2-sm.png',
          startPos: '-1400',
          // stopPos: '10',
        },
        {
          direction: 'up',
          layerPosition: 'front',
          objectFit: 'contain',
          position: { x: '0%' },
          speed: 0.01,
          src: '/img/tide-animation-1-sm.png',
          startPos: '250',
        },
      ]}
        >
        </hero-parallax>

        <progress-parallax-container slot="progress-parallax-2"></progress-parallax-container>

        <hr />
        <instagram-gallery id="gallery" slot="gallery"></instagram-gallery>
        <workshops-section id="workshops" slot="workshops"></workshops-section>
        <!-- Workshops -->

        <slot name="workshops"></slot>

        <slot name="gallery"></slot>
        <!-- About -->
        <section id="about">
          <div class="about-grid">
            <div class="about-text">
              <h2 class="section-title">About Our Studio</h2>
              <p>
                Welcome to Artisan Studio, where creativity meets community. For over a decade, we've been inspiring artists of all levels to explore
                their passion for painting in a supportive and vibrant environment.
              </p>
              <p>
                Our experienced instructors bring years of expertise and a genuine love for teaching. Whether you're picking up a brush for the first
                time or looking to refine your technique, we have the perfect workshop for you.
              </p>
              <p>Join our community of creative souls and embark on an artistic journey that will transform the way you see the world.</p>
            </div>
            <div>
              <img class="about-image" src="https://images.unsplash.com/photo-1561489396-888724a1543d?w=800&h=600&fit=crop" alt="Art Studio" />
            </div>
          </div>
        </section>
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
      </workshop-site>
    `;
  }
}
