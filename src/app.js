import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import smacs from './img/SMACS.jpg';
import dahlia from './img/dahlia.jpeg';
import samson from './img/samson.jpeg';
import lu from './img/lu.jpg';
import chief from './img/chief.jpg';
import delilah from './img/delilah.jpeg';
import hamsa from './img/hamsa.jpg';
import ilanas from './img/ilanas.jpg';
import kates from './img/kates.jpg';

//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

const textureLoader = new THREE.TextureLoader();

//SCENE ---> the scene is what will show on the camera
const scene = new THREE.Scene();
// scene.background = textureLoader.load(smacs);

//CAMERA
const camera = new THREE.PerspectiveCamera(
  45, //field of view, 40-80 should be fine
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//ORBIT
const orbit = new OrbitControls(camera, renderer.domElement); //create a new instance of orbit controls to be able to use the mouse to change positions on the window

camera.position.set(0, 250, 250);
camera.lookAt(scene.position);
orbit.update(); //call the update method every time you change the position of the camera

//AXES HELPER
const axesHelper = new THREE.AxesHelper(5); //introduces the 3d elements to the scene
scene.add(axesHelper);

//you can set each one like this or use the set function as shown below
// camera.position.z = 5;
// camera.position.y = 2;

//BACK WALL  ---
//you can adjust the width of your box by passing a width parameter to tne box geometry constructor
const backWallGeometry = new THREE.BoxGeometry(100, 100, 1);
const backWallMaterial = new THREE.MeshStandardMaterial({ color: '#b400ff' });
const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
scene.add(backWall);
backWall.position.set(0, 50, -50);

//SIDE WALL ---
//you can adjust the width of your box by passing a width parameter to tne box geometry constructor
const sideWallGeometry = new THREE.BoxGeometry(100, 100, 1);
const sideWallMaterial = new THREE.MeshStandardMaterial({ color: '#5d1d7f' });
const sideWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
scene.add(sideWall);
sideWall.position.set(50, 50, 0);
sideWall.rotation.y = 0.5 * Math.PI;

//SIDE WALL 2 ---
//you can adjust the width of your box by passing a width parameter to tne box geometry constructor
const sideWallTwoGeometry = new THREE.BoxGeometry(100, 100, 1);
const sideWallTwoMaterial = new THREE.MeshStandardMaterial({
  color: '#5d1d7f',
});
const sideWallTwo = new THREE.Mesh(sideWallTwoGeometry, sideWallTwoMaterial);
scene.add(sideWallTwo);
sideWallTwo.position.set(-50, 50, 0);
sideWallTwo.rotation.y = 0.5 * Math.PI;

//PLANE ---
const planeGeometry = new THREE.PlaneGeometry(150, 100);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: '#781078',
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = 0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(60);
// scene.add(gridHelper);

//SPHERE ---
const sphereGeometry = new THREE.SphereGeometry(10, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  // color: '#ffffff',
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(0, 90, 0);
sphere.material.map = textureLoader.load(smacs);
sphere.castShadow = true;

//AMBIENT LIGHT ---
const ambientLight = new THREE.AmbientLight(0x033333, 2);
scene.add(ambientLight);

// DIRECTIONAL LIGHT ---
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);

directionalLight.position.set(20, 100, 150);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

//DIRECTIONAL LIGHT HELPER
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10);
// scene.add(dLightHelper);

// DIRECTIONAL LIGHT SHADOW HELPER
const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
// scene.add(dLightShadowHelper);

// MAIN SPOTLIGHT  ---
const mainSpotLight = new THREE.SpotLight(0xffffff);
mainSpotLight.angle = 18;
mainSpotLight.penumbra = 1;
mainSpotLight.intensity = 0.5;
scene.add(mainSpotLight);
mainSpotLight.position.set(50, 150, 0);

mainSpotLight.castShadow = true;

const mainSLightHelper = new THREE.SpotLightHelper(mainSpotLight);
// scene.add(mainSLightHelper);
//
// SECOND SPOTLIGHT  ---
const secondSpotLight = new THREE.SpotLight(0xffffff);
secondSpotLight.angle = 0.68;
secondSpotLight.penumbra = 1;
secondSpotLight.intensity = 0.6;
scene.add(secondSpotLight);
secondSpotLight.position.set(-50, 150, 10);
secondSpotLight.castShadow = true;

const secondSLightHelper = new THREE.SpotLightHelper(secondSpotLight);
// scene.add(secondSLightHelper);

// THIRD SPOTLIGHT  ---
const thirdSpotLight = new THREE.SpotLight(0xffffff);
thirdSpotLight.angle = 0.3;
thirdSpotLight.penumbra = 1;
thirdSpotLight.intensity = 0.6;
scene.add(thirdSpotLight);
thirdSpotLight.position.set(-50, 120, 0);

thirdSpotLight.castShadow = true;

const thirdSLightHelper = new THREE.SpotLightHelper(thirdSpotLight);
// scene.add(thirdSLightHelper);

//DOGS SPOTLIGHT
const dogsSpotLight = new THREE.SpotLight(0xffffff);
dogsSpotLight.angle = 0.03;
dogsSpotLight.penumbra = 1;
dogsSpotLight.intensity = 0.9;
scene.add(dogsSpotLight);
// dogsSpotLight.position.set(900, 10, 0);
dogsSpotLight.position.set(700, -755, 10);

dogsSpotLight.castShadow = true;

const dogsLightHelper = new THREE.SpotLightHelper(dogsSpotLight);
// scene.add(dogsLightHelper);

//CATS SPOTLIGHT
const catsSpotLight = new THREE.SpotLight(0xffffff);
catsSpotLight.angle = 0.04;
catsSpotLight.penumbra = 1;
catsSpotLight.intensity = 1;
scene.add(catsSpotLight);
// catsSpotLight.position.set(900, 10, 0);
catsSpotLight.position.set(-700, -900, 0);

catsSpotLight.castShadow = true;

const catsLightHelper = new THREE.SpotLightHelper(catsSpotLight);
// scene.add(catsLightHelper);

//TORUS KNOT ----
// const torusGeometry = new THREE.TorusKnotGeometry(10, 2.4, 10, 16);
const torusGeometry = new THREE.TorusKnotGeometry(8, 2.8, 50, 16);
const torusMaterial = new THREE.MeshStandardMaterial({ color: '#a4742b' });
const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torusKnot);
torusKnot.receiveShadow = true;
torusKnot.castShadow = true;
torusKnot.position.set(28, 16.3, -35);
// torusKnot.add(sound);

//CONE
// const geometry = new THREE.ConeGeometry(8, 30, 40);
// const material = new THREE.MeshStandardMaterial({ color: '#1434b9' });
// const cone = new THREE.Mesh(geometry, material);
// cone.position.set(-25, 16.2, 35);
// scene.add(cone);

//CIRCLE
const circleGeometry = new THREE.CircleGeometry(10, 32);
const circleMaterial = new THREE.MeshBasicMaterial({
  // color: '#cdabc3'
});
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
scene.add(circle);
circle.position.set(-49, 50, 0);
circle.rotation.y = -4.7;
circle.material.map = textureLoader.load(dahlia);

// CHIEF CIRCLE
const chiefCircleGeometry = new THREE.CircleGeometry(10, 32);
const chiefCircleMaterial = new THREE.MeshBasicMaterial({
  // color: '#cdabc3'
});
const chiefCircle = new THREE.Mesh(chiefCircleGeometry, chiefCircleMaterial);
scene.add(chiefCircle);
chiefCircle.position.set(-49, 70, -20);
chiefCircle.rotation.y = -4.7;
chiefCircle.material.map = textureLoader.load(chief);

// HAMSA CIRCLE
const hamsaCircleGeometry = new THREE.CircleGeometry(10, 32);
const hamsaCircleMaterial = new THREE.MeshBasicMaterial({
  // color: '#cdabc3'
});
const hamsaCircle = new THREE.Mesh(hamsaCircleGeometry, hamsaCircleMaterial);
scene.add(hamsaCircle);
hamsaCircle.position.set(-49, 70, 20);
hamsaCircle.rotation.y = -4.7;
hamsaCircle.material.map = textureLoader.load(hamsa);

// SAMSON SQUARE
const samsonSquareGometry = new THREE.BoxGeometry(15, 15, 1);
const samsonSquareMaterial = new THREE.MeshBasicMaterial({
  // color: '#beb9b3',
});
const samsonSquare = new THREE.Mesh(samsonSquareGometry, samsonSquareMaterial);
scene.add(samsonSquare);
samsonSquare.position.set(49, 80, 21);
samsonSquare.rotation.y = -4.7;
samsonSquare.material.map = textureLoader.load(samson);

// LU SQUARE
const luSquareGometry = new THREE.BoxGeometry(15, 15, 1);
const luSquareMaterial = new THREE.MeshBasicMaterial({
  // color: '#beb9b3',
});
const luSquare = new THREE.Mesh(luSquareGometry, luSquareMaterial);
scene.add(luSquare);
luSquare.position.set(49, 50, 10);
luSquare.rotation.y = -4.7;
luSquare.material.map = textureLoader.load(lu);

// DELILAH SQUARE
const delilahSquareGometry = new THREE.BoxGeometry(15, 15, 1);
const delilahSquareMaterial = new THREE.MeshBasicMaterial({
  // color: '#beb9b3',
});
const delilahSquare = new THREE.Mesh(
  delilahSquareGometry,
  delilahSquareMaterial
);
scene.add(delilahSquare);
delilahSquare.position.set(49, 50, -10);
delilahSquare.rotation.y = -4.7;
delilahSquare.material.map = textureLoader.load(delilah);

// ILANAS SQUARE
const ilanaSquareGometry = new THREE.BoxGeometry(15, 15, 1);
const ilanaSquareMaterial = new THREE.MeshBasicMaterial({
  // color: '#beb9b3',
});
const ilanaSquare = new THREE.Mesh(ilanaSquareGometry, ilanaSquareMaterial);
scene.add(ilanaSquare);
ilanaSquare.position.set(49, 80, -21);
ilanaSquare.rotation.y = -4.7;
ilanaSquare.material.map = textureLoader.load(ilanas);

// KATES SQUARE
const kateSquareGometry = new THREE.BoxGeometry(15, 15, 1);
const kateSquareMaterial = new THREE.MeshBasicMaterial({
  // color: '#beb9b3',
});
const kateSquare = new THREE.Mesh(kateSquareGometry, kateSquareMaterial);
scene.add(kateSquare);
kateSquare.position.set(49, 80, 0);
kateSquare.rotation.y = -4.7;
kateSquare.material.map = textureLoader.load(kates);

// GUI ---
const gui = new dat.GUI();

const options = {
  backWallColor: '#ffea00',
  sideWallColor: '#ffea00',
  sideWallTwoColor: '#ffea00',
  sphereColor: '#ffea00',
  torusKnotColor: '#ffea00',
  circleColor: '#ffea00',
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1,
};

gui
  .addColor(options, 'backWallColor')
  .onChange((e) => backWall.material.color.set(e));

gui
  .addColor(options, 'sideWallColor')
  .onChange((e) => sideWall.material.color.set(e));

gui
  .addColor(options, 'sideWallTwoColor')
  .onChange((e) => sideWallTwo.material.color.set(e));

gui
  .addColor(options, 'sphereColor')
  .onChange((e) => sphere.material.color.set(e));

gui
  .addColor(options, 'torusKnotColor')
  .onChange((e) => torusKnot.material.color.set(e));

gui
  .addColor(options, 'circleColor')
  .onChange((e) => circle.material.color.set(e));

gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);

// gui.add(options, 'wireframe').onChange((e) => (sphere.material.wireframe = e));

// scene.background = textureLoader.load(ballTextureImage);

// let step = 0;

function animate(time) {
  sphere.rotation.x = time / 1000; //example of geometrical transformation
  sphere.rotation.y = time / 1000;

  // cone.rotation.y = time / 1000;
  // cone.rotation.x = time / 1000;
  // step += options.speed;
  // sphere.position.y = 10 * Math.abs(Math.sin(step));

  // thirdSpotLight.angle = options.angle;
  // thirdSpotLight.penumbra = options.penumbra;
  // thirdSpotLight.intensity = options.intensity;
  // mainSLightHelper.update();
  renderer.render(scene, camera); //links the scene to the camera
}

renderer.setAnimationLoop(animate);

//AUDIO ---

// const listener = new THREE.AudioListener();
// camera.add(listener);

//NON POSITIONAL GLOBAL AUDIO OBJECT
// const backgroundSound = new THREE.Audio(listener);
// scene.add(backgroundSound);
// const audioElement = document.querySelector('backgroundAudio');
// const track = backgroundSound.setMediaElementSource('./sounds/hypnotic.ogg');

// LOADS EVERY SINGLE SOUND - JUST ONE FOR ALL SOUNDS FILES
// const audioLoader = new THREE.AudioLoader();

// const context = new AudioContext();
// window.AudioContext = context || window.webkitAudioContext;

// document.addEventListener('mouseup', () => {
// const context = new AudioContext();
// AudioContext.createBufferSource()
// audioLoader.load(
// 'hypnotic-freqman-cliche-hypnotic-6068.wav',
// context.decodeAudioData('./sounds/hypnotic.ogg', function (audioBuffer) {
// onLoad(audioBuffer);
// }),
// function (buffer) {
// console.log('inside the buffer');
// backgroundSound.setBuffer(buffer);
// backgroundSound.setLoop(true);
// backgroundSound.context = context;
// backgroundSound.setVolume(1);
// backgroundSound.play();
// },
// onProgress callback
// function (xhr) {
// console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
// },
// onError callback
// function (err) {
// console.log('An error happened', err);
//     }
//   );
// });
