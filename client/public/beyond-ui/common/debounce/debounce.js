function debounce(func, delay) {
  let debounceTimer;
  return () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(), delay);
  };
}

export default debounce;
