import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import * as lil from 'lil-gui'

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff, 0);
// document.getElementById('three-container').appendChild(renderer.domElement);


// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper);
// const controls = new OrbitControls(camera, renderer.domElement);
// camera.position.set(-10, 20, 20);

// const planeMaterial = new THREE.MeshBasicMaterial({ color: 'beige', side: THREE.DoubleSide });
// const planeGeometry = new THREE.PlaneGeometry(30, 30);
// const plane = new THREE.Mesh(planeGeometry, planeMaterial)
// scene.add(plane);
// plane.rotation.x = -0.5 * Math.PI

// const gridHelper = new THREE.GridHelper(30)
// scene.add(gridHelper);


// const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
// const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'green', wireframe: false });
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
// scene.add(sphere);
// sphere.position.set(-10, 10, 0)

// const gui = new lil.GUI();
// const options = {
//     sphereColor: 'blue',
//     wireframe: false
// }
// gui.addColor(options, "sphereColor").onChange((e) => {
//     sphere.material.color.set(e)
// })
// gui.add(options, "wireframe").onChange((e) => {
//     sphere.material.wireframe = e
// })

// const animate = () => {
//     requestAnimationFrame(animate);
//     controls.update();
//     renderer.render(scene, camera);
// };

// animate();

// window.addEventListener("resize", () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });
// // eraser bug
// // walls bugs
// // roof angle bug
// //



// script.js

// Настройка сцены, камеры и рендера
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Загрузка текстуры крыши
const loader = new THREE.TextureLoader();
const roofTexture = loader.load('Screenshot.png'); // Замените на путь к изображению

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper);
const controls = new OrbitControls(camera, renderer.domElement);

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper);


// Создание стен дома
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const wallHeight = 10;

// Создаем четыре стены
const wall1 = new THREE.Mesh(new THREE.BoxGeometry(10, wallHeight, 0.01), wallMaterial);
wall1.position.set(0, wallHeight / 2, -5);
scene.add(wall1);

const wall2 = new THREE.Mesh(new THREE.BoxGeometry(0.01, wallHeight, 10), wallMaterial);
wall2.position.set(5, wallHeight / 2, 0);
scene.add(wall2);

const wall3 = new THREE.Mesh(new THREE.BoxGeometry(10, wallHeight, 0.01), wallMaterial);
wall3.position.set(0, wallHeight / 2, 5);
scene.add(wall3);

const wall4 = new THREE.Mesh(new THREE.BoxGeometry(0.01, wallHeight, 10), wallMaterial);
wall4.position.set(-5, wallHeight / 2, 0);
scene.add(wall4);

// Создание крыши с наклоном
const roofGeometry = new THREE.PlaneGeometry(10, 10);
const roofMaterial = new THREE.MeshBasicMaterial({ map: roofTexture });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);

// Поворот крыши на угол в 30 градусов (π/6 радиан)
roof.rotation.x = -Math.PI / 2;
roof.position.y = wallHeight;
scene.add(roof);

// Настройка позиции камеры и добавление освещения
camera.position.set(15, 15, 20);
camera.lookAt(0, wallHeight / 2, 0);

const light = new THREE.AmbientLight(0x404040); // Нейтральный свет
scene.add(light);

// Анимация сцены
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Обновление размера рендера при изменении размера окна
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
