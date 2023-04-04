import "./App.css";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ThreeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setPixelRatio(2); // set pixel ratio
    renderer.setClearColor(0xffffff); // set background color to white

    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    const scene = new THREE.Scene();

    // Add an ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load the first model
    const loader1 = new GLTFLoader();
    loader1.load("glb1.glb", (gltf1) => {
      const model1 = gltf1.scene;
      scene.add(model1);

      // Load the second model
      const loader2 = new GLTFLoader();
      loader2.load("glb2.glb", (gltf2) => {
        const model2 = gltf2.scene;

        model2.traverse((node2) => {
          // Apply the skin material to the first model
          model1.traverse((node1) => {
            if (node1.isMesh && node2.isMesh && node1.name === node2.name) {
              node1.material = node2.material;
            }
          });
        });
      });
    });

    // Add orbit controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    function animate() {
      requestAnimationFrame(animate);
      controls.update(); // update the orbit controller
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
}

function App() {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <ThreeCanvas />
    </div>
  );
}

export default App;
