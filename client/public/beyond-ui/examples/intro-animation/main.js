const introAnimation = (function() {
  const staggerVisualizerEl = document.querySelector("#js-stagger-viz");
  const dotsWrapperEl = staggerVisualizerEl.querySelector("#js-dots-wrapper");
  const dotsFragment = document.createDocumentFragment();
  const vizComputedStyles = window.getComputedStyle(staggerVisualizerEl);
  const rowCount = Number.parseInt(
    vizComputedStyles.getPropertyValue("--viz-grid-row-count"),
    10
  );
  const colCount = Number.parseInt(
    vizComputedStyles.getPropertyValue("--viz-grid-col-count"),
    10
  );
  const grid = [rowCount, colCount];
  const numberOfElements = grid[0] * grid[1];
  let animation;
  let paused = true;

  for (let i = 0; i < numberOfElements; i++) {
    var dotEl = document.createElement("div");
    dotEl.classList.add("dot");
    dotsFragment.appendChild(dotEl);
  }

  dotsWrapperEl.appendChild(dotsFragment);

  const timings = {
    introFade: 2500
  };

  const rippleTl = anime
    .timeline({
      autoplay: false,
      loop: true
    })
    .add(
      {
        targets: ".dot",
        scale: {
          value: [0.3, 1],
          easing: "easeOutSine",
          duration: 500,
          delay: anime.stagger(200, { grid: grid, from: "center" })
        }
      },
      "-=200"
    )
    .add(
      {
        targets: ".dot",
        scale: {
          value: 0.3,
          easing: "easeInOutSine",
          duration: 500,
          delay: anime.stagger(200, { grid: grid, from: "center" })
        }
      },
      "+=0"
    );

  const fadeInTl = anime
    .timeline({
      autoplay: false,
      loop: false
    })
    .add({
      targets: ["#js-logo"],
      opacity: [0, 1],
      scale: 1.2,
      duration: timings.introFade,
      easing: "easeInOutSine"
    })
    .add(
      {
        begin: rippleTl.play
      },
      "-=" + String(timings.introFade / 2) + 100
    );

  const outroTl = anime
    .timeline({
      autoplay: false,
      loop: false
    })
    .add({
      targets: "#js-logo",
      duration: 2000,
      easing: "easeInOutSine",
      opacity: [1, 0]
    })
    .add(
      {
        targets: "#js-dots-wrapper",
        opacity: 0,
        duration: timings.introFade,
        easing: "easeInOutSine",
        complete: rippleTl.pause
      },
      "-=1500"
    );

  window.outroTl = outroTl;

  /* can call this based on a condition to end the intro */
  // window.setTimeout(() => {
  //   outroTl.play();
  // }, 3000);

  /* start */
  fadeInTl.play();
})();
