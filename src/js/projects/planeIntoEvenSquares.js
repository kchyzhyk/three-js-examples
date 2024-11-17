import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import * as lil from 'lil-gui'


export default function init() {
    const container = document.getElementById('container');


    // Настройка сцены, камеры и рендера
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    camera.position.set(10, 15, -22);

    const controls = new OrbitControls(camera, renderer.domElement);

    const gridHelper = new THREE.GridHelper(20, 20)
    scene.add(gridHelper);

    const planeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            visible: false
        }))
    planeMesh.name = 'ground'
    planeMesh.rotateX(-Math.PI / 2);

    scene.add(planeMesh);

    const highlightMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
        }))


    highlightMesh.rotateX(-Math.PI / 2);
    highlightMesh.position.set(0.5, 0, 0.5);
    scene.add(highlightMesh);

    const mousePosition = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    let intersects;

    window.addEventListener('mousemove', (event) => {
        mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mousePosition, camera);
        intersects = raycaster.intersectObjects(scene.children);

        intersects.forEach((intersect) => {
            if (intersect.object.name === 'ground') {
                const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
                highlightMesh.position.set(highlightPos.x, 0, highlightPos.z)
            }
        })
    })


    const sphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 4, 2),
        new THREE.MeshBasicMaterial({ wireframe: true, color: "violet" }),
    )


    let eraser = false
    const eraserButton = document.createElement('button');
    eraserButton.id = 'eraserButton';
    eraserButton.textContent = 'Eraser off'
    document.getElementById('container').appendChild(eraserButton)
    eraserButton.addEventListener('click', () => {
        eraser = !eraser
        eraserButton.textContent = eraser ? 'Eraser on' : 'Eraser off'
    })


    const objects = []


    window.addEventListener('mousedown', (event) => {
        const objectExists = objects.find(object => {
            return (object.position.x === highlightMesh.position.x) && (object.position.z === highlightMesh.position.z)
        })
        if (!objectExists) {
            intersects.forEach((intersect) => {
                if (intersect.object.name === 'ground') {
                    const sphereClone = sphereMesh.clone()
                    sphereClone.position.copy(highlightMesh.position)
                    scene.add(sphereClone)
                    objects.push(sphereClone)
                }
            })
        }

        if (eraser) {
            const objectToRemove = objects.find(object => {
                return (object.position.x === highlightMesh.position.x) && (object.position.z === highlightMesh.position.z)
            })
            if (objectToRemove) {
                scene.remove(objectToRemove)
                objects.splice(objects.indexOf(objectToRemove), 1)
            }
        }
    })

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


}