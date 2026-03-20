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
          <hero-parallax
            slot="hero-1"
            .layers=${[
        {
          src: '/img/held-background-coloured-big.avif',
          speed: 0, //startPos: '-320',
          cssName: 'background',
        },
        {
          // last
          src: '/img/held-wind-layer-3-big.avif',
          speed: 0.08,
          startPos: '110',
          cssName: 'layer-3',
          // position: { x: '0' },
        },
        {
          // middle
          src: '/img/held-wind-layer-2a-swoosh-big.avif',
          speed: 0.15,
          startPos: '1920',
          // direction: 'up',
          cssName: 'layer-2',
          // position: { x: '0' },
        },
        {
          // middle
          src: '/img/held-wind-layer-2b-swoosh-big.avif',
          speed: 0.1,
          startPos: '2220',
          // direction: 'up',
          cssName: 'layer-2',
          // position: { x: '0' },
        },
        {
          // front
          src: '/img/held-wind-layer-1a-swoosh-big.avif',
          speed: 0.1,
          startPos: '4500',
          scale: 0.8,
          // stopPos: '20',
          position: { x: '8' },
          cssName: 'layer-1',
        },
        {
          // front
          src: '/img/held-wind-layer-1b-swoosh-big.avif',
          speed: 0.04,
          startPos: '4450',
          scale: 0.85,
          // stopPos: '20',
          position: { x: '8' },
          cssName: 'layer-1',
        },
      ]}
          >
            <h1>Held by the Wind</h1>
          </hero-parallax>

          <shrink-layers-parallax
            slot="shrink-layers-parallax"
            stageImage="/img/interior-held-wind.avif"
            .layers=${[
        { src: '/img/held-background-coloured.avif', speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background' },
        { src: '/img/held-wind-layer-3-big.avif', speed: 0.02, objectFit: 'contain', startPos: '0', cssName: 'layer-3' },
        { src: '/img/held-wind-layer-2-sm.avif', speed: 0.02, objectFit: 'contain', startPos: '-170', direction: 'up', cssName: 'layer-2' },
        {
          src: '/img/held-wind-layer-1.1-big.avif',
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
        </project-1>

        <hr />
        <project-2 slot="project-2">
          <hero-parallax
            slot="hero-2"
            .words=${['Moved', 'by', 'the', 'Tide']}
            .layers=${[
        {
          src: '/img/moved-by-tide-bg.avif',
          startPos: '0',
          speed: 0,
          cssName: 'background',
        },
        {
          speed: 0.14,
          src: '/img/moved-by-tide-layer-3-sm.avif',
          startPos: '1310',
          scale: 0.8,
          cssName: 'layer-3',
          position: { x: '10' },
        },
        {
          src: '/img/moved-by-tide-layer-2-sm.avif',
          speed: 0.17,
          startPos: '2900',
          cssName: 'layer-2',
        },
        {
          speed: 0.01,
          src: '/img/moved-by-tide-layer-1-sm.avif',
          startPos: '4720',
          cssName: 'layer-1',
        },
      ]}
          >
          </hero-parallax>
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
          <hero-parallax
            slot="hero-2"
            .words=${['Dunes', 'Part', 'One']}
            .layers=${[
        {
          src: '/img/dunes-1-background.avif',
          startPos: '0',
          speed: 0,
          cssName: 'background',
        },
        {
          speed: 0.14,
          src: '/img/dunes-1-layer-3a.avif',
          startPos: '510',
          scale: 0.8,
          cssName: 'layer-3',
          position: { x: '10' },
        },
        {
          src: '/img/dunes-1-layer-2a.avif',
          speed: 0.17,
          startPos: '2500',
          scale: 0.8,
          cssName: 'layer-2',
        },
        {
          speed: 0.01,
          src: '/img/dunes-1-layer-1a.avif',
          startPos: '4520',
          scale: 0.7,
          cssName: 'layer-1',
        },
      ]}
          >
          </hero-parallax>
          <shrink-layers-parallax
            slot="shrink-layers-parallax"
            stageImage="/img/interior-dunes-2.avif"
            stageImageEndTranslateYPos="15"
            .layers=${[
        { src: '/img/dunes-1-background.avif', speed: 0, objectFit: 'contain', startPos: '-320', cssName: 'background' },
        { src: '/img/dunes-1-layer-3a.avif', speed: 0.02, objectFit: 'contain', startPos: '0', cssName: 'layer-3' },
        { src: '/img/dunes-1-layer-2a.avif', speed: 0.02, objectFit: 'contain', startPos: '-170', direction: 'up', cssName: 'layer-2' },
        {
          src: '/img/dunes-1-layer-1a.avif',
          speed: 0.02,
          objectFit: 'contain',
          startPos: '-100',
          stopPos: '200',
          scale: 0.4,
          position: { x: '100%' },
          cssName: 'layer-1',
        },
      ]}
          >
          </shrink-layers-parallax>
        </project-2>

        <progress-parallax-container slot="progress-parallax-2"></progress-parallax-container>
      </workshop-site>
    `;
  }
}
