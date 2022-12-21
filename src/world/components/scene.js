import { Color, Scene } from "three";

function createScene() {
  // create a scene
  const scene = new Scene();
  // set background color
  scene.background = new Color("coral");
  return scene;
}

export { createScene };
