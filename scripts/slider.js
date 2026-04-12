let activeSlide = 0;
let sliderInterval;

function goToSlide(index) {
  // Fjern active fra nuværende
  document.querySelectorAll(".slide")[activeSlide].classList.remove("active");
  document.querySelectorAll(".dot")[activeSlide].classList.remove("active");

  // Sæt active på ny
  activeSlide = index;
  document.querySelectorAll(".slide")[activeSlide].classList.add("active");
  document.querySelectorAll(".dot")[activeSlide].classList.add("active");
}

function nextSlide() {
  const number = document.querySelectorAll(".slide").length;
  goToSlide((activeSlide + 1) % number);
}

function prevSlide() {
  const number = document.querySelectorAll(".slide").length;
  goToSlide((activeSlide - 1 + number) % number);
}

function initSlider() {
  activeSlide = 0;
  clearInterval(sliderInterval);
  sliderInterval = setInterval(nextSlide, 8000);
}
