import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

// gui debug
const gui = new GUI();
const debugObject = {};

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// object
debugObject.color = "#4799e6";
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});

debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 2,
  });
};
gui.add(debugObject, "spin");
debugObject.subdivision = 2;
gui
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .name("subdivision")
  .onFinishChange(() => {
    // destroy old geometry
    mesh.geometry.dispose();
    // create new geometry
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    );
  });

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
