import { ReactInstance, Location, Surface } from 'react-360-web';
import SimpleRaycaster from 'simple-raycaster';
import WebVRPolyfill from "webvr-polyfill";
const polyfill = new WebVRPolyfill();

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
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
  const flayer = new Surface(600, 600, Surface.SurfaceShape.Flat);
  flayer.setAngle(4.7, 0, 0);
  r360.renderToSurface(
    r360.createRoot('flayer'),
    flayer
  );
  r360.renderToLocation(
    r360.createRoot('model'),
    new Location([8, 0, 4]),
  );
   if( (/Mobi/i.test(navigator.userAgent)))
   {
      
      r360.controls.clearRaycasters();
      r360.controls.addRaycaster(SimpleRaycaster);
   }
  //  const  cameraController = {
  //   fillCameraProperties: (position,rotation) => {
  //     position[0];
  //     position[1];
  //     position[2];
  //     rotation[0];
  //     rotation[1];
  //     rotation[2];
  //     rotation[3];
  //     return true;
  //   }
  // }
  
   //r360.controls.addCameraController(cameraController);
    r360.compositor.setBackground(r360.getAssetURL('360_worl_edited.jpg'));
    //console.log(navigator.userAgent + "hola");
}
window.React360 = { init };
