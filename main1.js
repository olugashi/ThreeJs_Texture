import * as THREE from 'https://unpkg.com/three@0.138.0/build/three.module.js';

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 400;

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x0000FF );

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 1, 1 ).normalize();
scene.add(light);

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var width= 200;
var height = 200;
var size = width * height

var data = new Uint8Array(size  *4);

for (var i = 0; i < size; i++) {
    const stride = i * 4;

	data[ stride ] = 255 * Math.random();
	data[ stride + 1 ] = 255 * Math.random()
	data[ stride + 2 ] = 255 * Math.random()
	data[ stride + 3 ] = 255; 
}

var texture = new THREE.DataTexture(data, width, height,THREE.RGBAFormat);
texture.needsUpdate = true;

const geometry = new THREE.PlaneGeometry(512, 512);
const material = new THREE.MeshPhongMaterial({  map: texture });
const mesh = new THREE.Mesh( geometry, material );

scene.add( mesh );

function animate() {

    requestAnimationFrame( animate );

    for (var i = 0; i < size; i++) {
        const stride = i * 4;
    
        data[ stride ] = 255 * Math.random();
        data[ stride + 1 ] = 255 * Math.random()
        data[ stride + 2 ] = 255 * Math.random()
        data[ stride + 3 ] = 255; 
    }
    
    texture.needsUpdate = true;

    
    renderer.render( scene, camera );

}

animate();