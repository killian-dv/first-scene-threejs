import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// // object
// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
//   new THREE.MeshBasicMaterial({ color: "red" })
// );
// scene.add(mesh);

// buffer geometry
const geometry = new THREE.BufferGeometry();
const count = 50;
const positions = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 4;
}

const positionsAttribute = new THREE.BufferAttribute(positions, 3);
geometry.setAttribute("position", positionsAttribute);

// material
const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });

// mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// listen resize
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// listen double click
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// clock
const clock = new THREE.Clock();
// animation
const loop = () => {
  const elapsedTime = clock.getElapsedTime();
  // update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // update controls
  controls.update();

  // render
  renderer.render(scene, camera);

  // request animation frame
  window.requestAnimationFrame(loop);
};

loop();
