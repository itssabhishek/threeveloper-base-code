import * as THREE from "three";
import { MapView, OpenStreetMapsProvider } from "geo-three";

function App() {
  var canvas = document.getElementById("canvas");

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(255,255,255);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 100);
  camera.position.z= 10;
  scene.add(camera);
  // Create a map tiles provider object
  const provider = new OpenStreetMapsProvider();


// Create the map view and add it to your THREE scene
  const map = new MapView(MapView.PLANAR, provider);

  scene.add(map);

// By default coordinates are to meter, can be resized to kilometer

  document.body.onresize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  document.body.onresize();

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();


}

App();
