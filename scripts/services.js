const servicesState = {
  category: null
};

function initServices() {
  
loadComponent(
  "service-categories-container",
  "components/services-nav.html"
).then(() => {
    bindServiceCategoryEvents();
    setServiceCategory("featured");
  });
}

function bindServiceCategoryEvents() {
  document
    .querySelectorAll(".service-categories button")
    .forEach(btn => {
      btn.addEventListener("click", () => {
        setServiceCategory(btn.dataset.service);
      });
    });
}

async function setServiceCategory(category) {
  servicesState.category = category;

  const response = await fetch(`services/${category}.html`);
  const html = await response.text();

  document.getElementById("service-content").innerHTML = `
      ${html}
  `;

  applyAssets();

  updateActiveCategoryUI();
}

function updateActiveCategoryUI() {
  document
    .querySelectorAll(".service-categories button")
    .forEach(btn => {
      btn.classList.toggle(
        "active",
        btn.dataset.service === servicesState.category
      );
    });
}