(() => {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      const loader = document.querySelector(".screen-loader");
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 3000);
  });

})();