let s1 = false;
let s2 = false;

let script = document.createElement("script");

script.src = "/three.min.js";
document.head.append(script);

let anime = document.createElement("script");
anime.src = "/anime/anime.min.js";
document.head.append(anime);

script.onload = function() {
  console.log("ok");
  s1 = true;
};

anime.onload = function() {
  console.log("anime loaded");
  s2 = true;
};

document.querySelector("#js-footer").hidden = true;

let raf;

function check() {
  raf = requestAnimationFrame(check);
  if (s1 && s1 && raf > 50) {
    let mainScript = document.createElement("script");
    mainScript.src = "/login.js";
    document.head.append(mainScript);
    document.querySelector("#js-spinner").hidden = true;
    document.querySelector("#js-footer").hidden = false;
    cancelAnimationFrame(raf);
  }
}

requestAnimationFrame(check);
