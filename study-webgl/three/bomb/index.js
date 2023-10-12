
//THREEJS RELATED VARIABLES 

var scene, 
    camera,
    controls,
    fieldOfView,
  	aspectRatio,
  	nearPlane,
  	farPlane,
    shadowLight, 
    backLight,
    light, 
    renderer,
		container;


//SCREEN VARIABLES

var HEIGHT,
  	WIDTH,
    windowHalfX,
  	windowHalfY,
    mousePos = {x:0,y:0};


//INIT THREE JS, SCREEN AND MOUSE EVENTS

function init(){
  scene = new THREE.Scene();
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 2000; 
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane);
  camera.position.z = 1000;  
  camera.position.y = 300;
  camera.lookAt(new THREE.Vector3(0,0,0));    
  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio); 
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;
  
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
    
//   window.addEventListener('resize', onWindowResize, false);
//   document.addEventListener('mousemove', handleMouseMove, false);
//   document.addEventListener('touchstart', handleTouchStart, false);
// 	document.addEventListener('touchend', handleTouchEnd, false);
// 	document.addEventListener('touchmove',handleTouchMove, false);
  /*
  controls = new THREE.OrbitControls( camera, renderer.domElement);
  //*/


  let geometry = new THREE.BufferGeometry();
let vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 100, 0, //顶点3坐标
    0, 0, 10, //顶点4坐标
    0, 0, 100, //顶点5坐标
    50, 0, 10, //顶点6坐标
]);
let attribue = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribue;

const axesHelper = new THREE.AxisHelper(1000)
scene.add(axesHelper)
// 点
let material = new THREE.PointsMaterial({
    color: 0x6c92fa,
    size: 30.0
});
let point = new THREE.Points(geometry, material);
scene.add(point);

renderer.render(scene, camera);


setTimeout(() => {
    var control = new THREE.OrbitControls(camera);

control.addEventListener('change', () => {
    renderer.render(scene, camera);
});

})
}

init()