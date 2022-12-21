// components
import { loadBirds } from "./components/birds/birds.js";
import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { Train } from "./components/Train/Train.js";
import { createLights } from "./components/lights.js";

// system
import { createRenderer } from "./system/renderer.js";
import { Resizer } from "./system/Resizer.js";
import { Loop } from "./system/Loop.js";
import { createControls } from "./system/controls.js";

class World {
  // 1. Create an instance of the World app
  #camera;
  #controls;
  #scene;
  #renderer;
  #loop;
  constructor(container) {
    this.#camera = createCamera();
    this.#scene = createScene();
    this.#renderer = createRenderer();
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer);
    this.#controls = createControls(this.#camera, this.#renderer.domElement);
    container.append(this.#renderer.domElement);
    const { mainLight, ambientLight } = createLights();

    // const meshGroup = createMeshGroup();

    this.#loop.updatables.push(this.#controls);
    this.#scene.add(mainLight, ambientLight);
    const resizer = new Resizer(container, this.#camera, this.#renderer);
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds();

    this.#controls.target.copy(parrot.position);
    this.#loop.updatables.push(parrot,flamingo,stork)
    this.#scene.add(parrot, flamingo, stork);
  }

  // 2. Render the scene
  render() {
    // draw a single frame
    this.#renderer.render(this.#scene, this.#camera);
  }

  start() {
    this.#loop.start();
  }

  stop() {
    this.#loop.stop();
  }
}

export { World };
