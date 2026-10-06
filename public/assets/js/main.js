/**
 * Nordmann Automotive — algemene interactie
 * - mobiele navigatie
 * - header-rand bij scrollen
 * - actueel jaartal in de footer
 * - rustig inkomen van blokken bij scrollen
 */
(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    var label = toggle.querySelector(".visually-hidden");
    if (label) label.textContent = open ? "Menu sluiten" : "Menu openen";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Sluit het menu na het kiezen van een link
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Blokken met data-reveal komen in beeld zodra ze het scherm binnenschuiven.
  // Zonder IntersectionObserver blijft alles gewoon zichtbaar (geen .js-klasse).
  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      observer.observe(el);
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
