import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer;
let cubes = [];
let Display;
let time = 0;
let asRatio = window.innerWidth / window.innerHeight


scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 10;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// HDR environment
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/src/assets/HDR_blue_nebulae-1.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

Display = document.getElementById('Display');

const geometry = new THREE.BoxGeometry(1, 1, 1);
for (let i = 0; i < 12; i++) {
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.z = (i - 10) * 2*asRatio;
    cube.position.x = (i - 10) * 2*asRatio;
    scene.add(cube);
    cubes.push(cube);
}

window.addEventListener('resize', onWindowResize, false);


animate();

function animate() {
    requestAnimationFrame(animate);

    time += 0.01;
    const newfar = 0.1 + 39.9 * Math.abs(Math.sin(time));
    camera.far = newfar;
    camera.updateProjectionMatrix();

    Display.textContent = 'far: ' + newfar.toFixed(2);

    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
    controls.update();

    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


window.addEventListener('dblclick', () =>
    {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    
        if(!fullscreenElement)
        {
            if(renderer.domElement.requestFullscreen)
            {
                renderer.domElement.requestFullscreen()
            }
            else if(renderer.domElement.webkitRequestFullscreen)
            {
                renderer.domElement.webkitRequestFullscreen()
            }
        }
        else
        {
            if(document.exitFullscreen)
            {
                document.exitFullscreen()
            }
            else if(document.webkitExitFullscreen)
            {
                document.webkitExitFullscreen()
            }
        }
    })