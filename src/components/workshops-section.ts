import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('workshops-section')
export class WorkshopsSection extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    /* Workshops */
    .bg-gray {
      background: #f9fafb;
    }
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

    /* Responsive */
    @media (min-width: 768px) {
      .workshops-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `;
  override render() {
    return html`
      <section id="workshops" class="bg-gray">
        <h2 class="section-title">Our Workshops</h2>
        <div class="workshops-grid">
          <div class="workshop-card">
            <img
              class="workshop-image"
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop"
              alt="Beginner Watercolor"
            />
            <div class="workshop-content">
              <h3 class="workshop-title">Beginner Watercolor</h3>
              <p class="workshop-meta">⏱️ 4 weeks</p>
              <div class="workshop-price">$150</div>
              <button>Enroll Now</button>
            </div>
          </div>
          <div class="workshop-card">
            <img
              class="workshop-image"
              src="https://images.unsplash.com/photo-1524721696987-b9527df9e512?w=600&h=400&fit=crop"
              alt="Acrylic Techniques"
            />
            <div class="workshop-content">
              <h3 class="workshop-title">Acrylic Techniques</h3>
              <p class="workshop-meta">⏱️ 6 weeks</p>
              <div class="workshop-price">$200</div>
              <button>Enroll Now</button>
            </div>
          </div>
          <div class="workshop-card">
            <img
              class="workshop-image"
              src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&h=400&fit=crop"
              alt="Portrait Painting"
            />
            <div class="workshop-content">
              <h3 class="workshop-title">Portrait Painting</h3>
              <p class="workshop-meta">⏱️ 8 weeks</p>
              <div class="workshop-price">$280</div>
              <button>Enroll Now</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
