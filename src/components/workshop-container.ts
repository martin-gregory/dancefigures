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
        /* display: flex; */
        /* flex-direction: column;
        max-width: 1500px;
        margin: auto !important;
        overflow: hidden; */
        --accent-colour: #6e90c0;
        --held-by-the-sea-bg: #485c71;
        --held-by-the-sea-bg: #b88393;
        background-color: var(--held-by-the-sea-bg);
      }
    `,
  ];

  override render() {
    return html`
      <workshop-site>
        <site-navigation slot="navigation"></site-navigation>
        <hero-scroll slot="site-header"></hero-scroll>

        <!-- negative startPos is up -->
        <!-- negative pos x is left -->
        <project-1 slot="project-1">
          <hero-parallax-panel
            slot="hero-1"
            style="--panel-background-image: url('/img/held-background-coloured-big.avif');"
            .layers=${[
        {
          // last
          src: '/img/held-wind-layer-3-big.avif',
          speed: 0.08,
          topPct: 0,
          heightVh: 220,
          cssName: 'layer-3',
          fetchPriority: 'high',
        },
        {
          // middle
          src: '/img/held-wind-layer-2a-swoosh-big.avif',
          speed: 0.15,
          topPct: 10,
          heightVh: 220,
          cssName: 'layer-2',
          fetchPriority: 'high',
        },
        {
          // middle
          src: '/img/held-wind-layer-2b-swoosh-big.avif',
          speed: 0.1,
          topPct: 10,
          heightVh: 220,
          cssName: 'layer-2',
          fetchPriority: 'high',
        },
        {
          // front
          src: '/img/held-wind-layer-1a-swoosh-big.avif',
          speed: 0.1,
          topPct: 50,
          heightVh: 220,
          scale: 0.8,
          leftPct: 9,
          cssName: 'layer-1',
          fetchPriority: 'high',
        },
        {
          // front
          src: '/img/held-wind-layer-1b-swoosh-big.avif',
          speed: 0.04,
          topPct: 50,
          heightVh: 220,
          scale: 0.8,
          leftPct: 9,
          cssName: 'layer-1',
          fetchpriority: 'high',
        },
      ]}
          >
            <h1>Held by the Wind</h1>
          </hero-parallax-panel>

          <shrink-painting-panel
            slot="shrink-layers-parallax"
            stageImage="/img/interior-held-wind.avif"
            .layers=${[{ src: '/img/held-wind-painting.avif', speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background' }]}
          >
          </shrink-painting-panel>
        </project-1>

        <hr />
        <project-2 slot="project-2">
          <hero-parallax-panel
            slot="hero-2"
            style="--panel-background-image: url('/img/moved-by-tide-bg.avif'); --panel-height: 300vh;"
            .words=${['Moved', 'by', 'the', 'Tide']}
            .layers=${[
        {
          speed: 0.1,
          src: '/img/moved-by-tide-layer-3-sm.avif',
          leftPct: 20,
          topPct: 0,
          heightVh: 220,
          scale: 0.8,
          cssName: 'layer-3',
        },
        {
          src: '/img/moved-by-tide-layer-2-sm.avif',
          speed: 0.17,
          topPct: 10,
          heightVh: 220,
          leftPct: 0,
          cssName: 'layer-2',
        },
        {
          speed: 0.01,
          src: '/img/moved-by-tide-layer-1-sm.avif',
          topPct: 30,
          heightVh: 220,
          cssName: 'layer-1',
        },
      ]}
          >
          </hero-parallax-panel>
          <shrink-layers-parallax
            slot="shrink-layers-parallax"
            stageImage="/img/interior-moved-by-tide.avif"
            .layers=${[
        { src: '/img/moved-by-tide-bg.avif', speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background' },
        { src: '/img/moved-by-tide-layer-3-sm.avif', speed: 0.02, objectFit: 'contain', startPos: '0', cssName: 'layer-3' },
        { src: '/img/moved-by-tide-layer-2-sm.avif', speed: 0.02, objectFit: 'contain', startPos: '-170', direction: 'up', cssName: 'layer-2' },
        {
          src: '/img/moved-by-tide-layer-1-sm.avif',
          speed: 0.02,
          objectFit: 'contain',
          startPos: '-100',
          stopPos: '200',
          scale: 0.8,
          position: { x: '100%' },
          cssName: 'layer-1',
        },
      ]}
          >
          </shrink-layers-parallax>
        </project-2>
        <project-2 slot="project-3">
          <hero-parallax-panel
            slot="hero-2"
            style="--panel-background-image: url('/img/dunes-1-background.avif'); --panel-height: 400vh;"
            .words=${['Dunes', 'I']}
            .layers=${[
        {
          speed: 0.14,
          src: '/img/dunes-1-layer-3a.avif',
          topPct: 15,
          heightVh: 220,
          scale: 0.8,
          cssName: 'layer-3',
        },
        {
          src: '/img/dunes-1-layer-2a.avif',
          speed: 0.17,
          topPct: 0,
          heightVh: 220,
          scale: 0.8,
          leftPct: 20,
          cssName: 'layer-2',
        },
        {
          speed: 0.01,
          src: '/img/dunes-1-layer-1a.avif',
          topPct: 50,
          leftPct: 24,
          heightVh: 220,
          scale: 0.5,
          cssName: 'layer-1',
        },
      ]}
          >
          </hero-parallax-panel>
          <shrink-painting-panel
            slot="shrink-layers-parallax"
            stageImage="/img/interior-dunes-2.avif"
            stageImageEndTranslateYPos="15"
            .layers=${[{ src: '/img/dunes-1-painting.avif', speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background' }]}
          >
          </shrink-painting-panel>
        </project-2>
        <project-2 slot="project-4">
          <hero-parallax-panel
            slot="hero-2"
            style="--panel-background-image: url('/img/dunes-2-background.avif'); --panel-height: 400vh;"
            .words=${['Dunes', 'II']}
            .layers=${[
        {
          speed: 0.14,
          src: '/img/dunes-2-layer-4a.avif',
          topPct: 15,
          heightVh: 220,
          scale: 0.8,
          cssName: 'layer-3',
        },
        {
          speed: 0.14,
          src: '/img/dunes-2-layer-3a.avif',
          topPct: 15,
          heightVh: 220,
          scale: 0.8,
          cssName: 'layer-3',
        },
        {
          src: '/img/dunes-2-layer-2a.avif',
          speed: 0.17,
          topPct: 0,
          heightVh: 220,
          scale: 0.8,
          leftPct: 20,
          cssName: 'layer-2',
        },
        {
          speed: 0.01,
          src: '/img/dunes-2-layer-1a.avif',
          topPct: 50,
          leftPct: 24,
          heightVh: 220,
          // scale: 0.8,
          cssName: 'layer-1',
        },
      ]}
          >
          </hero-parallax-panel>
          <shrink-painting-panel
            slot="shrink-layers-parallax"
            stageImage="/img/interior-dunes-2.avif"
            stageImageEndTranslateYPos="15"
            .layers=${[{ src: '/img/dunes-2-painting.avif', speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background' }]}
          >
          </shrink-painting-panel>
        </project-2>

        <progress-parallax-container slot="progress-parallax-2"></progress-parallax-container>
      </workshop-site>
    `;
  }
}
