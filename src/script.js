import "./style.css";
import * as THREE from "three";
import { LoadingManager, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
/*IMPORTO LE TEXTURE, SI UTILIZZANO NEI MATERIALI*/
/*METODO CONSIGLIATO CON TEXTURE LOADER*/
const loadingManager =
  new THREE.LoadingManager(); /*UTILIZZO UN LOADING MANAGER DA PASSARE NEL TEXTURE LOADER*/
loadingManager.onStart = () => {
  console.log("START");
};
loadingManager.onLoad = () => {
  console.log("LOADING");
};
loadingManager.onProgress = () => {
  console.log("PROGRESSING");
};
loadingManager.onError = () => {
  console.log("ERROR");
}; /*POSSO USARE QUESTE FUNZIONI DEL LOADING MANAGER PER DEBUGGARE IL CARICAMENTO E LO STATO DELLE TEXTURES*/
const textureLoader = new THREE.TextureLoader(
  loadingManager
); /*POSSO USARLO PER TUTTE LE TEXTURE NECESSARIE*/
const colorTexture = textureLoader.load(
  "textures/door/color.jpg"
); /*SI POSSONO AGGIUNGERE ALTRI TRE AROMENTI FUNZIONE PER ,*LOAD*,*PROGRESS*,*ERRORS**/
const alphaTexture = textureLoader.load("textures/door/alpha.jpg");
const heightTexture = textureLoader.load("textures/door/height.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("textures/door/roughness.jpg");
const normalTexture = textureLoader.load("textures/door/normal.jpg");

// const image = new Image(); /*CREO UNA VARIABILE IMMAGINE VUOTA*/
// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = "/textures/door/color.jpg"; /*DICHIARO LA SORGENTE DELL'IMMAGINE*/

/*CREARE LA SCENA PER PRIMA COSA*/
const scene = new THREE.Scene();

/*CREARE L'OGGETTO*/
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(
  geometry,
  material
); /*L'OGGETTO E' FORMATO DALL' UNIONE DI GEOMETRIA E MATERIALE*/
scene.add(mesh);

/*CREARE LE DIMENSIONI*/
const sizes = {
  width: window.innerWidth /*LARGHEZZA DEL VIEWPORT*/,
  height: window.innerHeight /*ALTEZZA DEL VIEWPORT*/,
};
/*FUNZIONE PER IL RESPONSIVE*/
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/*CREARE LA CAMERA*/
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
); /*(VISTA A 75 GRADI, DIMENSIONE SI CALCOLA SEMPRE CON QUELLA FORMULA)*/
camera.position.z = 3; /*AGGIUNGO UNA PROFONDITà DI 3 ALTRIMENTI VEDREI L'INTERNO DELL'OGGETTO*/
scene.add(camera);

/*CREARE RENDER*/
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
}); /*BISOGNA DICHIARARE SU QUALE ELEMENTO RIEMPIRE *CANVAS* IN QUESTO CASO*/
renderer.setSize(
  sizes.width,
  sizes.height
); /*DICHIARARE LE DIMENSIONI DEL RENDERER SEMPRE IN QUESTO ORDINE*/
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
); /*MIGLIORA LA RISOLIZUONE DEI PIXEL, CON VALORE MASSIMO DI 2 PER OTTIMIZZAZIONE*/
renderer.render(scene, camera); /*DICHIARARE COSA RENDERIZZARE*/

// DICHIARO I CONTROLLI, IN QUESTO CASO ORBITCONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/*ANIMAZIONE*/
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
