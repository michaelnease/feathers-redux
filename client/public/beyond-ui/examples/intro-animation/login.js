class Particles {
  constructor() {
    this.canvasDimensions = {
      width: window.innerWidth,
      height: window.innerHeight / 1.5
    };
    this.particleCount = 1000;
    this.setStage();
    this.setLighting();
    this.setActors();
    this.animate();
    this.move();
    this.render();
  }

  move() {
    console.log("start...");
  }

  setActors() {
    return this.addStars();
  }

  addStars() {
    var i, j, materials, x, y, z;
    this.geometry = new THREE.Geometry();
    materials = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: this.getTexture(),
      depthTest: false
    });

    for (i = j = 0; j <= this.particleCount; i = ++j) {
      x = Math.random() * 100 - 50;
      y = Math.random() * 100 - 50;
      z = Math.random() * 100 - 50;
      this.geometry.vertices.push(new THREE.Vector3(x, y, z));
    }
    this.starSystem = new THREE.Points(this.geometry, materials);
    this.starSystem.sortParticles = true;
    return this.scene.add(this.starSystem);
  }

  getTexture() {
    var canvas, context, gradient, texture;
    canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    context = canvas.getContext("2d");
    gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(0,0,124,1)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  setLighting() {
    this.ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
    return this.scene.add(this.ambientLight);
  }

  setStage() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("js-particles"),
      antialias: true
    });

    this.renderer.setClearColor("#000000");
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.canvasDimensions.width,
      this.canvasDimensions.height
    );
    this.renderer.shadowMap.enabled = true;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    return (this.camera.position.z = 50);
  }

  rotateRadians(deg) {
    return deg * (Math.PI / 180);
  }

  animate() {
    this.renderer.setAnimationLoop(t => {
      this.starSystem.rotation.z = this.rotateRadians(t / 1000);
      this.starSystem.rotation.y = this.rotateRadians(t / 1000);
      this.render();
    });
  }

  render() {
    return this.renderer.render(this.scene, this.camera);
  }
}

new Particles();
