const logoIntroAnimation = (() => {
  window.anime({
    targets: "#js-logo",
    autoplay: true,
    scale: [0.9, 1.1],
    opacity: [0, 1],
    duration: 2500,
    easing: "easeInOutSine"
  });
})();

const sphereAnimation = (() => {
  let camera, scene, renderer;
  let geometry, material, mesh;
  const sphereRotationMultiplier = 0.0001;
  const meshHexColor = 0x1c213e;
  const meshCount = Math.random() * 80;
  const meshEdges = Math.random() * 10;

  const init = function() {
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#js-sphere-canvas")
    });

    document.body.appendChild(renderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );

    camera.position.set(0, 0, 500);

    geometry = new THREE.SphereGeometry(150, meshCount, meshEdges);
    material = new THREE.MeshBasicMaterial({
      color: meshHexColor,
      wireframe: true,
      wireframeLinewidth: 1
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.setAnimationLoop(() => {
      mesh.rotation.x = window.performance.now() * sphereRotationMultiplier;
      mesh.rotation.y = window.performance.now() * sphereRotationMultiplier;
      renderer.render(scene, camera);
    });
  };

  init();
})();
