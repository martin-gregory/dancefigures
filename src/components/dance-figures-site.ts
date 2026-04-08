import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { commonStyles } from '../styles/common-styles';

@customElement('dance-figures-site')
export class DanceFiguresSite extends LitElement {
  firstUpdated() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    const schema = {
      "@context": "https://schema.org/",
      "@type": "ItemList",
      "numberOfItems": 5,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "VisualArtwork",
            "name": "Held by the Wind",
            "image": "https://www.dancefigures.com/img/held-wind-painting.avif",
            "description": "100 x 70 cm, 2025 Oil and acrylic on 4 plastic sheets"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "VisualArtwork",
            "name": "Moved by the Tide",
            "image": "https://www.dancefigures.com/img/moved-by-tide-painting.avif",
            "description": "100 x 70 cm, 2025 Oil and acrylic on 4 plastic sheets"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "VisualArtwork",
            "name": "The Song of the Swaying Dunes I",
            "image": "https://www.dancefigures.com/img/dunes-1-painting.avif",
            "description": "100 x 70 cm, 2025 Oil and acrylic on 4 plastic sheets"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "VisualArtwork",
            "name": "The Song of the Swaying Dunes II",
            "image": "https://www.dancefigures.com/img/dunes-2-painting.avif",
            "description": "100 x 70 cm, 2025 Oil and acrylic on 4 plastic sheets"
          }
        }
      ]
    }
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
  static override styles = [
    commonStyles,
    css`
      :host {
        display: block;
        --accent-colour: #6e90c0;
        --held-by-the-sea-bg: #485c71;
        --held-by-the-sea-bg: #b88393;
        background-color: var(--held-by-the-sea-bg);
      }
    `,
  ];
  override render() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const config = {
      heightVh: isMobile ? 80 : 220,
      panelHeight: isMobile ? 150 : 400,
      imgUrl: isMobile ? '/img/mobile/' : '/img/',
    };
    return html`
      <dance-figures-layout>
        <site-navigation slot="navigation"></site-navigation>
        <site-header-panel slot="site-header"></site-header-panel>

        <!-- negative startPos is up -->
        <!-- negative pos x is left -->
        <panel-layout-1 slot="artwork-held-by-the-wind">
          <hero-parallax-panel
            slot="hero-1"
            style="--panel-background-image: url('${config.imgUrl}held-background-coloured-big.avif'); --panel-height: ${isMobile
        ? 150
        : 500}vh; --panel-background-position: center 0;"
            .caption=${"Painting: Held by the Wind, 100 x 70 cm, 2025 Oil and acrylic on 4 plastic sheets"}
            .layers=${[
        {
          // front
          src: `${config.imgUrl}held-wind-layer-3b.avif`,
          speed: 0.1,
          topPct: 1,
          heightVh: config.heightVh,
          scale: 0.8,
          leftPct: 9,
          cssName: 'layer-1',
          fetchPriority: 'high',
        },
        {
          // front
          src: `${config.imgUrl}held-wind-layer-3a.avif`,
          speed: 0.14,
          topPct: 0,
          heightVh: config.heightVh,
          scale: 0.8,
          leftPct: 9,
          cssName: 'layer-1',
          fetchpriority: 'high',
        },
        {
          // middle
          src: `${config.imgUrl}held-wind-layer-2a.avif`,
          speed: 0.18,
          topPct: 17,
          edgeAnchor: { edge: 'left', offset: -10 },
          scale: 1.1,
          heightVh: config.heightVh,
          cssName: 'layer-2',
          fetchPriority: 'high',
        },
        {
          // middle
          src: `${config.imgUrl}held-wind-layer-2b.avif`,
          speed: 0.12,
          topPct: 19,
          edgeAnchor: { edge: 'left', offset: -10 },
          scale: 1,
          heightVh: config.heightVh,
          cssName: 'layer-2',
          fetchPriority: 'high',
        },
        {
          // last
          src: `${config.imgUrl}held-wind-layer-1bb.avif`,
          speed: 0.14,
          topPct: 48,
          leftPct: 13,
          scale: 0.8,
          heightVh: config.heightVh,
          cssName: 'layer-3',
          fetchPriority: 'high',
        },
        {
          // last
          src: `${config.imgUrl}held-wind-layer-1aaa.avif`,
          speed: 0.17,
          topPct: 46,
          leftPct: 13,
          scale: 0.8,
          heightVh: config.heightVh,
          cssName: 'layer-3',
          fetchPriority: 'high',
        },
      ]}
          >
          </hero-parallax-panel>

          <artwork-in-scene
            slot="artwork-in-scene"
            plaqueText="Held by the Wind"
            stageImage="${config.imgUrl}interior-held-wind.avif"
            .layers=${[{ src: `${config.imgUrl}held-wind-painting.avif`, speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background', alt: 'Painting: Held by the Wind' }]}
          >
          </artwork-in-scene>
        </panel-layout-1>

        <panel-layout-2 slot="artwork-moved-by-the-tide">
          <hero-parallax-panel
            slot="hero-2"
            style="--panel-background-image: url('${config.imgUrl}held-background-coloured-big.avif'); --panel-height: ${isMobile ? 120 : 352}vh;"
            .words=${['Moved', 'by', 'the', 'Tide']}
            .caption=${"Painting: Moved by the Tide, 100 x 70 cm, 2025 Oil and acrylic on 4 plastic sheets"}
            .layers=${[
        {
          speed: 0.12,
          src: `${config.imgUrl}moved-by-tide-layer-3b.avif`,
          leftPct: 20,
          topPct: -1.5,
          heightVh: config.heightVh,
          scale: 0.8,
          cssName: 'layer-3',
        },
        {
          speed: 0.15,
          src: `${config.imgUrl}moved-by-tide-layer-3a.avif`,
          leftPct: 20,
          topPct: -2,
          heightVh: config.heightVh,
          scale: 0.8,
          cssName: 'layer-3',
        },
        {
          src: `${config.imgUrl}moved-by-tide-layer-2b.avif`,
          speed: 0.14,
          topPct: 18,
          heightVh: config.heightVh,
          leftPct: 0,
          cssName: 'layer-2',
        },
        {
          src: `${config.imgUrl}moved-by-tide-layer-2a.avif`,
          speed: 0.18,
          topPct: 17,
          heightVh: config.heightVh,
          leftPct: 0,
          cssName: 'layer-2',
        },
        {
          speed: 0.1,
          src: `${config.imgUrl}moved-by-tide-layer-1b.avif`,
          topPct: 24.5,
          heightVh: config.heightVh,
          cssName: 'layer-1',
        },
        {
          speed: 0.14,
          src: `${config.imgUrl}moved-by-tide-layer-1a.avif`,
          topPct: 24,
          heightVh: config.heightVh,
          cssName: 'layer-1',
        },
      ]}
          >
          </hero-parallax-panel>
          <artwork-in-scene
            slot="artwork-in-scene"
            plaqueText="Moved by the Tide"
            style="--panel-bg-gradient: linear-gradient(305deg, rgb(166 154 137) 0%, rgb(193 208 215) 59%, rgb(207 214 217) 65%, rgb(255 255 255) 100%)"
            stageImage="${config.imgUrl}interior-moved-by-tide.avif"
            .layers=${[
        { src: `${config.imgUrl}moved-by-tide-painting.avif`, speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background', alt: 'Painting: Moved by the Tide' },
      ]}
          >
          </artwork-in-scene>
        </panel-layout-2>
        <panel-layout-2 slot="artwork-dunes-part-1">
          <hero-parallax-panel
            slot="hero-2"
            style="--panel-background-image: url('${config.imgUrl}dunes-2-background.avif'); --panel-height: ${isMobile ? 123 : 360}vh;"
            .words=${['Dunes', 'I']}
            .caption=${"Painting: The Song of the Swaying Dunes I, 100 x 70 cm, 2025 Oil and acrylic on 4 plastic sheets"}
            .layers=${[
        {
          speed: 0.14,
          src: `${config.imgUrl}dunes-1-layer-3b.avif`,
          topPct: 12,
          leftPct: -2,
          heightVh: config.heightVh,
          scale: 0.9,
          cssName: 'layer-3',
        },
        {
          speed: 0.18,
          src: `${config.imgUrl}dunes-1-layer-3a.avif`,
          topPct: 10,
          leftPct: -2,
          heightVh: config.heightVh,
          scale: 0.9,
          cssName: 'layer-3',
        },
        {
          src: `${config.imgUrl}dunes-1-layer-2b.avif`,
          speed: 0.16,
          topPct: 1,
          heightVh: config.heightVh,
          scale: 1.05,
          leftPct: 15,
          cssName: 'layer-2',
        },
        {
          src: `${config.imgUrl}dunes-1-layer-2a.avif`,
          speed: 0.2,
          topPct: 0,
          heightVh: config.heightVh,
          scale: 1.05,
          leftPct: 15,
          cssName: 'layer-2',
        },

        {
          speed: 0.1,
          src: `${config.imgUrl}dunes-1-layer-1b.avif`,
          topPct: 25,
          edgeAnchor: { edge: 'left', offset: 0 },
          heightVh: config.heightVh,
          scale: 1.15,
          cssName: 'layer-1',
        },
        {
          speed: 0.14,
          src: `${config.imgUrl}dunes-1-layer-1a.avif`,
          topPct: 25,
          edgeAnchor: { edge: 'left', offset: 0 },
          heightVh: config.heightVh,
          scale: 1.15,
          cssName: 'layer-1',
        },
      ]}
          >
          </hero-parallax-panel>
          <artwork-in-scene
            slot="artwork-in-scene"
            plaqueText="The Song of the Swaying Dunes I"
            style="--panel-bg-gradient: linear-gradient(305deg, rgb(142 134 178) 0%, rgb(199 177 164) 59% 65%, rgb(236 203 204) 100%)"
            stageImage="${config.imgUrl}interior-dunes-1.avif"
            stageImageEndTranslateYPos="15"
            .layers=${[{ src: `${config.imgUrl}dunes-1-painting.avif`, speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background', alt: 'Painting: The Song of the Swaying Dunes I' }]}
          >
          </artwork-in-scene>
        </panel-layout-2>

        <panel-layout-2 slot="artwork-dunes-part-2">
          <hero-parallax-panel
            slot="hero-2"
            style="--panel-background-image: url('${config.imgUrl}dunes-2-background.avif'); --panel-height: ${config.panelHeight}vh;"
            .words=${['Dunes', 'II']}
            .caption=${"Painting: The Song of the Swaying Dunes II, 100 x 70 cm, 2025 Oil and acrylic on 4 plastic sheets"}
            .layers=${[
        {
          speed: 0.2,
          src: `${config.imgUrl}dunes-2-layer-4a.avif`,
          topPct: 22,
          heightVh: config.heightVh,
          scale: 0.9,
          // rightPct: 6,
          cssName: 'layer-4',
          edgeAnchor: { edge: 'left', offset: 5 },
        },
        {
          speed: 0.14,
          src: `${config.imgUrl}dunes-2-layer-4b.avif`,
          topPct: 22,
          heightVh: config.heightVh,
          scale: 0.9,
          rightPct: 6,
          edgeAnchor: { edge: 'left', offset: 5 },
          cssName: 'layer-4',
        },

        {
          speed: 0.15,
          src: `${config.imgUrl}dunes-2-layer-3b.avif`,
          topPct: 25,
          leftPct: 8,
          heightVh: config.heightVh,
          scale: 0.9,
          cssName: 'layer-3',
        },
        {
          speed: 0.2,
          src: `${config.imgUrl}dunes-2-layer-3a.avif`,
          topPct: 25,
          leftPct: 8,
          heightVh: config.heightVh,
          scale: 0.9,
          cssName: 'layer-3',
        },

        {
          src: `${config.imgUrl}dunes-2-layer-2b.avif`,
          speed: 0.17,
          topPct: 1,
          heightVh: config.heightVh,
          scale: 0.8,
          leftPct: 23,
          cssName: 'layer-2',
        },
        {
          src: `${config.imgUrl}dunes-2-layer-2a.avif`,
          speed: 0.2,
          topPct: 0,
          heightVh: config.heightVh,
          scale: 0.8,
          leftPct: 15,
          cssName: 'layer-2',
        },
        {
          speed: 0.07,
          src: `${config.imgUrl}dunes-2-layer-1a.avif`,
          topPct: 45,
          // leftPct: 24,
          heightVh: config.heightVh,
          scale: 1.1,
          cssName: 'layer-1',
        },
        {
          speed: 0.02,
          src: `${config.imgUrl}dunes-2-layer-1b.avif`,
          topPct: 50,
          leftPct: -1,
          heightVh: config.heightVh,
          scale: 1,
          cssName: 'layer-1',
        },
      ]}
          >
          </hero-parallax-panel>
          <artwork-in-scene
            slot="artwork-in-scene"
            plaqueText="The Song of the Swaying Dunes II"
            style="--frame-width: 70vh;"
            stageImage="${config.imgUrl}interior-dunes-2.avif"
            stageImageEndTranslateYPos="15"
            .layers=${[{ src: `${config.imgUrl}dunes-2-painting.avif`, speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background', alt: 'Painting: The Song of the Swaying Dunes II' }]}
          >
          </artwork-in-scene>
        </panel-layout-2>

      </dance-figures-layout>
    `;
  }
}
