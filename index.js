import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// App
const app = document.querySelector("#app");

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(100, 0, 100);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Cube (initialized once)
const geometry = new THREE.BoxGeometry(1, 1, 1); // Default size
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// WebSocket Client
const socket = new WebSocket('ws://localhost:5173'); // Adjust to your server's address

// Error handling for WebSocket
socket.onerror = function(error) {
  console.error('WebSocket Error:', error);
};

// Function to map potentiometer value to scale
function mapPotValueToScale(value) {
  return (value / 1023) * 2 + 0.5; // Maps 0-1023 to 0.5-2.5
}

// Handle incoming WebSocket messages
socket.onmessage = function (event) {
  const potValue = parseInt(event.data, 10);
  const scale = mapPotValueToScale(potValue);
  console.log(potValue);
  cube.scale.set(scale, scale, scale); // Update the scale of the cube
};

socket.onopen = function(event) {
  console.log('WebSocket connection established');
};

socket.onerror = function(error) {
  console.error('WebSocket Error:', error);
};

socket.onclose = function(event) {
  console.log('WebSocket connection closed');
};

// Resize handling
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", onResize);

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};

animate();
