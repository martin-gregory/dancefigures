import './components/dance-figures-site';
import './components/site-navigation';
import './components/hero-parallax-panel';
import './components/site-header-panel';
import './components/artwork-in-scene';

import './layouts/dance-figures-layout';
import './layouts/panel-layout-1';
import './layouts/panel-layout-2';

// Can add app bootstrapping logic here if needed
import Clarity from '@microsoft/clarity';

// Only fire in production to save your quota and keep data clean
const isProd = import.meta.env ? import.meta.env.PROD : process.env.NODE_ENV === 'production';

if (isProd) {
  const projectId = 'w5flc55tv4';
  Clarity.init(projectId);
}
