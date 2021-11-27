import "./style.css";
import * as THREE from "three";
import { Scene } from "three";

/*CREARE LA SCENA PER PRIMA COSA*/
const scene = new THREE.Scene();

/*CREARE L'OGGETTO*/
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "green" });
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
