import gsap from "gsap";
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

// renderer
const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

gsap.to(mesh.position, {
  x: 2,
  duration: 1,
  delay: 1,
});

gsap.to(mesh.position, {
  x: 0,
  duration: 1,
  delay: 2,
});

// animation
const loop = () => {
  // render
  renderer.render(scene, camera);

  // request animation frame
  window.requestAnimationFrame(loop);
};

loop();
