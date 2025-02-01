import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


let time = 0;
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
pointLight1.position.set(-5, -5, -5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
pointLight2.position.set(-5, 5, -5);
scene.add(pointLight2);

// HDR environment
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/src/assets/HDR_blue_nebulae-1.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});

// Create 15 random objects
const generateRandomColor = () =>{
    // تولید سه عدد تصادفی بین 0 تا 255 برای R، G و B
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // تبدیل اعداد به مقدار هگزادسیمال و اطمینان از اینکه دو رقمی باقی بمانند
    let hexR = r.toString(16).padStart(2, '0');
    let hexG = g.toString(16).padStart(2, '0');
    let hexB = b.toString(16).padStart(2, '0');

    // ترکیب و خروجی رنگ هگزادسیمال
    return `#${hexR}${hexG}${hexB}`;
}

for (let i = 0; i < 15; i++) {
    const randomGeometry = Math.floor(Math.random() * 9);
    let geometry;

    switch (randomGeometry) {
        case 0:
            geometry = new THREE.BoxGeometry(1, 1, 1);
            break;
        case 1:
            geometry = new THREE.SphereGeometry(0.5, 32, 32);
            break;
        case 2:
            geometry = new THREE.ConeGeometry(0.5, 1, 32);
            break;
        case 3:
            geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 
            break;
        case 4:
            geometry = new THREE.CircleGeometry( 1, 8 ); 
            break;
        case 5:
            geometry = new THREE.CylinderGeometry( 1, 1, 10, 16 );  
            break;
        case 6:
            geometry = new THREE.RingGeometry( 1, 5, 16 );
            break;
        case 7:
            geometry = new THREE.TorusGeometry( 10, 3, 16, 10 ); 
            break;
        case 8:
            geometry = new THREE.TorusKnotGeometry( 10, 3, 10, 16 ); 
            break;
    }

    const material = new THREE.MeshStandardMaterial({
        color: generateRandomColor(),
        metalness: 0.5,
        roughness: 0.1
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() * 100 - 20, Math.random() * 100 - 20, Math.random() * 100 - 20);
    scene.add(mesh);
}

// Camera position
camera.position.z = 10;

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    time += 0.0006;

    // Using a sine wave for smooth FOV transformation between 30 and 100
    const newFov = 1 + 179 * Math.sin(time); // FOV will oscillate between 30 and 100
    camera.fov = Math.abs(newFov);
    camera.updateProjectionMatrix(); 

  // Update FOV display
  fovDisplay.textContent = `FOV: ${camera.fov.toFixed(2)} °`;


    scene.traverse((object) => {
        if (object.isMesh) {
            object.rotation.x += 0.01;
            object.rotation.y += 0.01;
        }
    });

    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
