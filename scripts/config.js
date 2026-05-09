const isLocal =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";
const ASSETS = isLocal ? "/resources" : "https://assets.gladeekvipager.dk";

function applyAssets() {
  document.querySelectorAll("img[data-src]").forEach((img) => {
    img.src = `${ASSETS}/${img.dataset.src}`;
  });

  document.querySelectorAll("[data-bg]").forEach((el) => {
    el.style.backgroundImage = `url(${ASSETS}/${el.dataset.bg})`;
  });
}