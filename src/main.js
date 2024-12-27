import * as THREE from "three";
import "./style.css";

const scene = new THREE.Scene();

// object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
scene.add(mesh);

// sizes
const sizes = {
  width: 800,
  height: 600,
};

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// camera.lookAt(mesh.position);

// renderer
const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// clock
const clock = new THREE.Clock();

// animation
const loop = () => {
  // time
  const elapsedTime = clock.getElapsedTime();

  // update
  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);

  camera.lookAt(mesh.position);

  // render
  renderer.render(scene, camera);

  // request animation frame
  window.requestAnimationFrame(loop);
};

loop();
