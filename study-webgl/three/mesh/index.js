import mesh from "./mesh.json"
import * as THREE from "./libs/Three";
import { OrbitControls } from './libs/O2'


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
    mousePos = { x: 0, y: 0 };


//INIT THREE JS, SCREEN AND MOUSE EVENTS

function init() {
    scene = new THREE.Scene();
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 75;
    nearPlane = 1;
    farPlane = 2000;
    // camera = new THREE.PerspectiveCamera(
    //     fieldOfView,
    //     aspectRatio,
    //     nearPlane,
    //     farPlane);
    camera = new THREE.OrthographicCamera(
        -50, 50,
        50, -50,
        nearPlane,
        farPlane);
    camera.position.z = 40;
    camera.position.y = 0;
    camera.zoom = 1.4;
    camera.updateProjectionMatrix();
    camera.lookAt(new THREE.Vector3(0, 0, 1));
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;


    const generateMesh = (mesh, meshParams) => {
        let geometry = new THREE.BufferGeometry();
        let vertices = new Float32Array(mesh.vertice.flat());
        let attribue = new THREE.BufferAttribute(vertices, 3);
        const indices = new Uint32Array(mesh.face.flat().reverse()); // faceData是从您的数据中解析出来的面索引数组
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.attributes.position = attribue;
        geometry.computeVertexNormals();
        // 
        const material = new THREE.MeshPhongMaterial(meshParams);
        const _mesh = new THREE.Mesh(geometry, material);
        _mesh.castShadow = true; // cast投射，方块投射阴影 
        _mesh.receiveShadow = true; // 物体接收阴
        return _mesh;
    }



    const parentObj = new THREE.Object3D();
    scene.add(parentObj);
    // 血管
    let c1 = generateMesh(mesh[1], {
        color: '#facc43',
        transparent: false,
        opacity: 0.8,
        depthWrite: true,
        depthTest: true,
        // blenging
        // blending: THREE.PremulAlphaBlending, // 设置自定义混合模式
        // blendSrc: THREE.OneFactor, // 新像素的颜色如何与已经存在于屏幕上的像素进行混合
        // blendDst: THREE.ZeroFactor, // 已经存在于屏幕上的像素的颜色如何影响新像素的颜色
        // blendEquation: THREE.AddEquation, // 设置混合方程
        // side: THREE.BackSide


    });
    // 病灶
    let c2 = generateMesh(mesh[0], {
        color: 'red',
        transparent: false,
        side: THREE.DoubleSide
    });
    parentObj.add(c1);
    parentObj.add(c2);
    c1.geometry.computeBoundingBox();
    
    let c = new THREE.Vector3();
    console.log(c1.geometry,"c1.geometry")
    c1.geometry.boundingBox.getCenter(c);
    // c1.geometry.computeBoundingSphere();

    // const radius = c1.geometry.boundingSphere.radius;
    // const distance = camera.position.distanceTo(parentObj.position);
    // const scale = (camera.fov * distance) / (2 * Math.tan(Math.PI * camera.fov / 360));
    // console.log(scale,"scale")
    // parentObj.scale.set(2, 2, 2);

    parentObj.position.set(-c.x, -c.y, -c.z);
    const light = new THREE.PointLight(0xffffff, 150,0,1);
    light.castShadow = true;
    scene.add(light);
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    // renderer.setClearColor(0xffffff, 1); // 设置背景为白色

    const render = () => {
        var vector = camera.position.clone();
        light.position.set(vector.x, vector.y, vector.z);
        renderer.render(scene, camera);

    }
    render();


    var control = new OrbitControls(camera, renderer.domElement);

    control.addEventListener('change', render);
}

setTimeout(() => {
    init()
}, 1000)