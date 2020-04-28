const outroAnimation = window.anime({
  targets: "#js-logo",
  autoplay: false,
  opacity: [1, 0],
  duration: 1500,
  easing: "easeInOutSine"
});

window.outroAnimation = outroAnimation;

class Particles {
  constructor() {
    this.canvas = {
      width: window.innerWidth / 1,
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
    const rotateOneDuration = 1800;
    const rotateTwoDuration = 2500;
    window.anime
      .timeline({
        autoplay: true,
        loop: false
      })
      .add(
        {
          targets: "#js-logo",
          scale: [0.9, 1.1],
          opacity: [0, 1],
          duration: 2500,
          easing: "easeOutSine"
        },
        rotateOneDuration - 100
      )
      .add(
        {
          targets: this.starSystem.rotation,
          z: [this.rotateRadians(15), this.rotateRadians(0)],
          y: [this.rotateRadians(15), this.rotateRadians(0)],
          duration: rotateOneDuration,
          easing: "linear"
        },
        0
      )
      .add(
        {
          targets: this.starSystem.rotation,
          z: [0, this.rotateRadians(-5)],
          y: [0, this.rotateRadians(-5)],
          duration: rotateTwoDuration,
          easing: "linear"
        },
        rotateOneDuration
      )
      .add({
        targets: this.starSystem.rotation,
        z: [this.rotateRadians(-5), this.rotateRadians(-10)],
        y: [this.rotateRadians(-5), this.rotateRadians(-10)],
        duration: 2e3,
        easing: "linear"
      })
      .add(
        {
          targets: ["#js-logo", "#particles"],
          opacity: [1, 0],
          duration: 2500,
          easing: "easeInOutSine"
        },
        rotateOneDuration + rotateTwoDuration
      );
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
      canvas: document.getElementById("particles"),
      antialias: true
    });

    this.renderer.setClearColor("#000000");
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.canvas.width, this.canvas.height);
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
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  render() {
    return this.renderer.render(this.scene, this.camera);
  }
}

new Particles();
