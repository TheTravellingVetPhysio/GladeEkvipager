// Load komponenter: Henter html-fil og indsætter i element
async function loadComponent(id, path) {
  const response = await fetch(path);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}

// Load side: Henter og renderer side ift om det er html eller Markdown
async function loadPage(path, isBlog = false) {
  document.getElementById("content").innerHTML = "";

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Siden blev ikke fundet");
    const text = await response.text();

    if (path.endsWith(".md")) {
      document.getElementById("content").innerHTML = `
      <article class="text-content">
       ${marked.parse(text)}
      </article>`;
    } else {
      document.getElementById("content").innerHTML = text;
    }
  } catch (error) {
    console.log("Fejl:", error);

    document.getElementById("content").innerHTML = `
    <h1>Siden blev ikke fundet</h1>
    <p>Siden <code>${path}</code> blev ikke fundet.</p>
    `;
  }
  afterPageLoad(path);
}

// Initiering af relevante funktioner for specifikke sider
function afterPageLoad(path) {
  switch (path) {
    case "pages/forside.html":
      initSlider();
      break;

    case "pages/ydelser.html":
      initServices();
      break;
  }
}


// Initiering
async function init() {
  await loadComponent("header-container", "components/header.html");
  await loadComponent("footer-container", "components/footer.html");
  loadPage("pages/forside.html");

  // Mobile / desktop menu layout
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
  });

  nav.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", false);
    });
  });
}

init();
