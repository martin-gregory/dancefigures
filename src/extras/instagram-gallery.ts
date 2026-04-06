import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('instagram-gallery')
export class InstagramGallery extends LitElement {
  @property({ type: Number })
  private currentSlide = 0;

  @property({ type: Array })
  private instagramPosts = [
    {
      id: 1,
      url: 'https://www.instagram.com/p/DH53pOko2WD/',
      image:
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=800&fit=crop',
      caption: "Watercolor landscapes from last weekend's workshop!",
      likes: 234,
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=800&h=800&fit=crop',
      caption: 'Abstract art session - so much creativity!',
      likes: 189,
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop',
      caption: 'Our cozy studio space awaits you',
      likes: 312,
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1596548438137-d51ea5c83ca4?w=800&h=800&fit=crop',
      caption: 'Student showcase - amazing progress!',
      likes: 267,
    },
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1524721696987-b9527df9e512?w=800&h=800&fit=crop',
      caption: 'Acrylic pouring techniques workshop',
      likes: 298,
    },
    {
      id: 6,
      image:
        'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=800&fit=crop',
      caption: 'Portrait painting masterclass highlights',
      likes: 421,
    },
  ];

  static override styles = css`
    :host {
      display: block;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.5rem);
      font-weight: bold;
      color: #1f2937;
      text-align: center;
      margin-bottom: 48px;
    }

    /* Gallery */
    .instagram-header {
      text-align: center;
      margin-bottom: 16px;
      color: #d97706;
      font-size: 18px;
    }

    .carousel-container {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
    }

    .carousel-wrapper {
      overflow: hidden;
    }

    .carousel-track {
      display: flex;
      transition: transform 0.5s ease-out;
    }

    .carousel-item {
      flex: 0 0 100%;
      padding: 8px;
    }

    .instagram-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .instagram-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .instagram-caption {
      padding: 16px;
    }

    .instagram-caption p {
      color: #374151;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .instagram-likes {
      color: #6b7280;
      font-size: 14px;
    }

    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.9);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: background 0.3s;
      font-size: 20px;
    }

    .carousel-btn:hover {
      background: white;
    }

    .carousel-btn.prev {
      left: 10px;
    }

    .carousel-btn.next {
      right: 10px;
    }
        /* Responsive */
    @media (min-width: 768px) {
      /* .menu-btn {
        display: none;
      }

      .about-grid {
        grid-template-columns: 1fr 1fr;
      }

      .workshops-grid {
        grid-template-columns: repeat(3, 1fr);
      } */

      .carousel-item {
        flex: 0 0 33.333%;
      }
/* 
      .contact-grid {
        grid-template-columns: 1fr 1fr;
      } */
    }

    @media (max-width: 767px) {
      /* .nav-links {
        display: none;
      }

      .menu-btn {
        display: flex;
      } */
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.startCarouselAutoplay();
  }

  private nextSlide() {
    this.currentSlide =
      (this.currentSlide + 1) % (this.instagramPosts.length - 2);
  }

  private prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + (this.instagramPosts.length - 2)) %
      (this.instagramPosts.length - 2);
  }

  private startCarouselAutoplay() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  override render() {
    return html`
      <section id="gallery">
        <h2 class="section-title">Follow Our Journey</h2>
        <div class="instagram-header">📷 @artisanstudio</div>
        <div class="carousel-container">
          <div class="carousel-wrapper">
            <div
              class="carousel-track"
              style="transform: translateX(-${this.currentSlide * 33.333}%)"
            >
              ${this.instagramPosts.map(
      (post) => html`
                  <div class="carousel-item">
                    <a
                      class="instagram-card"
                      href="${post.url || '#'}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        class="instagram-image"
                        src="${post.image}"
                        alt="${post.caption}"
                      />
                      <div class="instagram-caption">
                        <p>${post.caption}</p>
                        <span class="instagram-likes">❤️ ${post.likes}</span>
                      </div>
                    </a>
                  </div>
                `
    )}
            </div>
          </div>
          <button class="carousel-btn prev" @click=${this.prevSlide}>‹</button>
          <button class="carousel-btn next" @click=${this.nextSlide}>›</button>
        </div>
      </section>
    `;
  }
}
