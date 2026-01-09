document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js loaded");

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Contact (you kept a form tag, so keep handler safe)
  window.handleSubmit = function (e) {
    e.preventDefault();
    const status = document.querySelector("[data-status]");
    if (status) status.textContent = "Message received! (Demo form — connect to a real service later.)";
    return false;
  };

  // Slider (fade + dots, autoplay, no buttons)
  const track = document.querySelector("[data-slider]");
  const dotsWrap = document.querySelector("[data-dots]");
  const sliderWrap = document.querySelector("[data-slider-wrap]");

  if (!track || !dotsWrap) return;

  // IMPORTANT: only get slides inside THIS slider
  const slides = Array.from(track.querySelectorAll(".slide"));
  if (slides.length === 0) return;

  let index = 0;
  const total = slides.length;
  const intervalTime = 3000;
  let timer = null;

  // Build dots
  dotsWrap.innerHTML = "";
  const dots = slides.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slider-dot";
    btn.setAttribute("aria-label", `Go to project ${i + 1}`);
    btn.addEventListener("click", () => {
      index = i;
      show(index);
      restart();
    });
    dotsWrap.appendChild(btn);
    return btn;
  });

  function show(i) {
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
  }

  function next() {
    index = (index + 1) % total;
    show(index);
  }

  function start() {
    stop();
    timer = setInterval(next, intervalTime);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function restart() {
    start();
  }

  // Pause on hover
  sliderWrap?.addEventListener("mouseenter", stop);
  sliderWrap?.addEventListener("mouseleave", start);

  // Init
  show(index);
  start();
});
