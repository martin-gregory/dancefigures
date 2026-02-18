import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { commonStyles } from '../styles/common-styles';
// import LocomotiveScroll from 'locomotive-scroll';
// const locomotiveScroll = new LocomotiveScroll();

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

  override render() {
    return html`
      <workshop-site>
        <site-navigation slot="navigation"></site-navigation>
        <hero-scroll slot="site-header"></hero-scroll>

        <project-1 slot="project-1">
          <hero-parallax
            slot="hero-1"
            .layers=${[
        { src: '/img/held-background-coloured.avif', speed: 0, startPos: '-320' },
        { src: '/img/held-wind-layer-2-sm.avif', speed: 0.02, startPos: '-170', direction: 'up' },
        {
          src: '/img/held-wind-layer-1.1-big.avif',
          speed: 0.02,
          startPos: '-500',
          stopPos: '200',
          position: { x: '100%' },
        },
      ]}
          >
            <h1>Held by the Wind</h1>
          </hero-parallax>

          <image-parallax-container
            slot="image-parallax-1"
            imageUrl="/img/held-background-coloured.avif"
            .words=${['Held', 'by', 'the', 'Wind']}
          ></image-parallax-container>

          <pattern-parallax-container
            slot="pattern-parallax-1"
            .words=${['Sensations', 'of', 'the', 'Sea']}
            .layers=${['/img/held-wind-layer-2-sm.avif']}
          ></pattern-parallax-container>

          <shrink-layers-parallax
            slot="shrink-layers-parallax"
            .layers=${[
        { src: '/img/held-background-coloured.avif', speed: 0, startPos: '-320' },
        { src: '/img/held-wind-layer-2-sm.avif', speed: 0.02, startPos: '-170', direction: 'up' },
        {
          src: '/img/held-wind-layer-1.1-big.avif',
          speed: 0.02,
          startPos: '-500',
          stopPos: '200',
          position: { x: '100%' },
        },
        // {
        //   src: '/img/livingroom-mockup.avif',
        //   speed: 0.02,
        //   startPos: '-500',
        //   stopPos: '200',
        //   position: { x: '100%' },
        // }
      ]}
          >
          </shrink-layers-parallax>
        </project-1>

        <main style="height: 150vh; background-color: lightblue;" data-scroll-container>
          <div>
            <h1>Hello 👋</h1>
          </div>
          <div>
            <h2 data-scroll data-scroll-speed="0.5">What's up?</h2>
            <p data-scroll data-scroll-speed="0.8">😬</p>
          </div>
        </main>

        <hr />
        <project-2 slot="project-2">
          <image-parallax-container
            slot="image-parallax-2"
            imageUrl="/img/moved-by-tide-bg.avif"
            .words=${['Moved', 'by', 'the', 'Tide']}
          ></image-parallax-container>

          <pattern-parallax-container
            slot="pattern-parallax-2"
            .words=${['Sensations', 'of', 'the', 'Tide']}
            .layers=${['/img/moved-by-tide-layer-3-sm.avif']}
          ></pattern-parallax-container>

          <hero-parallax
            slot="hero-2"
            .layers=${[
        {
          objectFit: 'fill',
          src: '/img/moved-by-tide-bg.avif',
          startPos: '0',
          speed: 0,
        },
        {
          layerPosition: 'back',
          objectFit: 'contain',
          position: { x: '100%' },
          speed: 0.04,
          src: '/img/moved-by-tide-layer-3-sm.avif',
          startPos: '-580',
          id: 'spaceship',
          // stopPos: '200',
        },
        {
          // container: { maxWidth: '900px' },
          layerPosition: 'middle',
          objectFit: 'contain',
          position: { x: '0%' },
          speed: 0.07,
          src: '/img/moved-by-tide-layer-2-sm.avif',
          startPos: '-1000',
          id: 'comet',
          // stopPos: '10',
        },
        {
          direction: 'up',
          layerPosition: 'front',
          objectFit: 'contain',
          position: { x: '0%' },
          speed: 0.01,
          src: '/img/moved-by-tide-layer-1-sm.avif',
          startPos: '250',
        },
      ]}
          >
          </hero-parallax>
        </project-2>

        <!-- <progress-parallax-container slot="progress-parallax-2"></progress-parallax-container> -->
      </workshop-site>
    `;
  }
}
