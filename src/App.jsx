import { World } from "./world/World.js";

function App() {
  const main = async () => {
    const canvasContainer = document.getElementById("root");
    const world = new World(canvasContainer);
    await world.init();
    world.start();
  };

  return main().catch((err) => {
    console.error(err);
  });
}

App();
