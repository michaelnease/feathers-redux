const pause = t =>
  new Promise((r, j) => {
    setTimeout(() => {
      r();
    }, t);
  });

export { pause };
