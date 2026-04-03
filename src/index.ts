import './components/site-navigation';
import './components/workshop-container';
import './components/workshop-site';
import './components/hero-parallax';
import './components/hero-parallax-panel';
import './components/instagram-gallery';
import './components/workshops-section';
import './components/hero-scroll';
import './components/image-parallax-container';
import './components/pattern-parallax-container';
import './components/progress-parallax-container';
import './components/shrink-painting-panel';
import './components/shrink-layers-parallax';
import './components/project-1';
import './components/project-2';

// Can add app bootstrapping logic here if needed
import Clarity from '@microsoft/clarity';
// Make sure to add your actual project id instead of "yourProjectId".

// Only fire in production to save your quota and keep data clean
const isProd = import.meta.env ? import.meta.env.PROD : process.env.NODE_ENV === 'production';

if (isProd) {
  const projectId = 'w5flc55tv4';
  Clarity.init(projectId);
  console.log('Clarity initialized for Production');
}
