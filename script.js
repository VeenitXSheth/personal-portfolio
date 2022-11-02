const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: new THREE.Color("black")
    },
    color2: {
      value: new THREE.Color("darkgray")
    }
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
  wireframe: false
});
const base = new THREE.Mesh( geometry, material );

scene.add( base );

const geometry2 = new THREE.TorusGeometry( 10, 5, 16, 100 );
const material2 = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: new THREE.Color("blue")
    },
    color2: {
      value: new THREE.Color("red")
    }
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
  wireframe: false
});
const ring = new THREE.Mesh( geometry2, material2 );

scene.add( ring )

camera.position.z = 5;

function animate() {
  
  requestAnimationFrame( animate );
	renderer.render( scene, camera );

  base.rotation.x -= 0.0025;
  base.rotation.y -= 0.0025;

  ring.rotation.x += 0.001;
  ring.rotation.y += 0.001;

  // triangle.rotation.x -= 0.005;
  // triange.rotation.y -= 0.005;

}

animate()