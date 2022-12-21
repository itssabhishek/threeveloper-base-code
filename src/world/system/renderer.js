import { WebGLRenderer } from "three";

function createRenderer() {
  // create a renderer instance
  const renderer = new WebGLRenderer({antialias: true});

  // turn on physically correct lighting model
  renderer.physicallyCorrectLights = true;
  return renderer;
}

export { createRenderer };
