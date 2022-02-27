import * as THREE from 'https://unpkg.com/three@0.138.0/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x050505 );
scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

scene.add( new THREE.AmbientLight( 0x444444 ) );

  const light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
  light1.position.set( 1, 1, 1 );
  scene.add( light1 );

  const light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
  light2.position.set( 0, - 1, 0 );
  scene.add( light2 );

const camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 3500 );
camera.position.z = 2750;
const triangles = 160000;

const geometry = new THREE.BufferGeometry();

const positions = [];
const normals = [];
const colors = [];

const color = new THREE.Color();

const n = 800, n2 = n / 2;	// triangles spread in the cube
const d = 12, d2 = d / 2;	// individual triangle size

const pA = new THREE.Vector3();
const pB = new THREE.Vector3();
const pC = new THREE.Vector3();

const cb = new THREE.Vector3();
const ab = new THREE.Vector3();

for ( let i = 0; i < triangles; i ++ ) {

  // positions

  const x = Math.random() * n - n2;
  const y = Math.random() * n - n2;
  const z = Math.random() * n - n2;

  const ax = x + Math.random() * d - d2;
  const ay = y + Math.random() * d - d2;
  const az = z + Math.random() * d - d2;

  const bx = x + Math.random() * d - d2;
  const by = y + Math.random() * d - d2;
  const bz = z + Math.random() * d - d2;

  const cx = x + Math.random() * d - d2;
  const cy = y + Math.random() * d - d2;
  const cz = z + Math.random() * d - d2;

  positions.push( ax, ay, az );
  positions.push( bx, by, bz );
  positions.push( cx, cy, cz );

  // flat face normals

  pA.set( ax, ay, az );
  pB.set( bx, by, bz );
  pC.set( cx, cy, cz );

  cb.subVectors( pC, pB );
  ab.subVectors( pA, pB );
  cb.cross( ab );

  cb.normalize();

  const nx = cb.x;
  const ny = cb.y;
  const nz = cb.z;

  normals.push( nx, ny, nz );
  normals.push( nx, ny, nz );
  normals.push( nx, ny, nz );

  // colors

  const vx = ( x / n ) + 0.5;
  const vy = ( y / n ) + 0.5;
  const vz = ( z / n ) + 0.5;

  color.setRGB( vx, vy, vz );

  const alpha = Math.random();

  colors.push( color.r, color.g, color.b, alpha );
  colors.push( color.r, color.g, color.b, alpha );
  colors.push( color.r, color.g, color.b, alpha );

}
function disposeArray() {

  this.array = null;

}

geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ).onUpload( disposeArray ) );
geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ).onUpload( disposeArray ) );
geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 4 ).onUpload( disposeArray ) );

geometry.computeBoundingSphere();

const material = new THREE.MeshPhongMaterial( {
  color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
  side: THREE.DoubleSide, vertexColors: true, transparent: true
} );

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;

document.body.appendChild(renderer.domElement);


/*const boxGeometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 0x00FF00});

console.log(boxGeometry);
console.log(material);

const mesh = new THREE.Mesh(boxGeometry,material);

console.log(mesh);

scene.add(mesh);

camera.position.z = 5;*/

function animate() {

  requestAnimationFrame( animate );
  
  //mesh.rotation.x += 0.01;

  renderer.render(scene,camera);
}

animate();

