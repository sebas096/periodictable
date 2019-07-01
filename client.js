import { Math as VRMath,ReactInstance, Location, Surface } from 'react-360-web';
import WebVRPolyfill from 'webvr-polyfill';

const polyfill = new WebVRPolyfill();
const SimpleRaycaster = {
  drawsCursor: () => true,
  fillDirection: direction => {
    direction[0] = 0;
    direction[1] = 0;
    direction[2] = -1;
    return true;
  },
  fillOrigin: origin => {
    origin[0] = 0;
    origin[1] = 0;
    origin[2] = 0;
    return true;
  },
  getMaxLength: () => Infinity,
  getType: () => "cursor",
  hasAbsoluteCoordinates: () => false
};

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    hideFullscreen: false,
    ...options,
  });
  // r360.renderToLocation(r360.createRoot('background'),
  //   new Location([0, 0, 0]));
  const menu = new Surface(20 * 80, 9 * 80, Surface.SurfaceShape.Cylinder);
  menu.setAngle(0, 0, 0);
  r360.renderToSurface(
    r360.createRoot('menu'),
    menu,
  );
  const element = new Surface(400, 400, Surface.SurfaceShape.Flat);
  element.setAngle(1.2, 0, 0);
  r360.renderToSurface(
    r360.createRoot('element'),
    element,
  );
  const information = new Surface(1000, 1000, Surface.SurfaceShape.Flat);
  information.setAngle(3.3, 0, 0);
  r360.renderToSurface(
    r360.createRoot('information'),
    information,
  );
  const flayer = new Surface(1000, 1000, Surface.SurfaceShape.Flat);
  flayer.setAngle(4.55, 0, 0);
  r360.renderToSurface(
    r360.createRoot('flayer'),
    flayer
  );
  r360.renderToLocation(
    r360.createRoot('model'),
    new Location([8, -1, 4]),
  );
  r360.compositor.setBackground(r360.getAssetURL('360_worl_edited.jpg'));
   if((/Mobi/i.test(navigator.userAgent)))
   {
     r360.controls.clearRaycasters();
     r360.controls.addRaycaster(SimpleRaycaster);
   }
}
window.React360 = { init };
