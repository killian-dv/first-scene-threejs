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

// time
let time = Date.now();

// animation
const loop = () => {
  // time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // update
  mesh.rotation.y += 0.01 * deltaTime;

  // render
  renderer.render(scene, camera);

  // request animation frame
  window.requestAnimationFrame(loop);
};

loop();
