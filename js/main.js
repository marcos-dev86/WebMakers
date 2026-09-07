(function () {
  "use strict";

  /* ---------- Theme toggle ----------
     Tries to remember the choice with localStorage. If storage is
     blocked (e.g. a sandboxed preview), it quietly falls back to
     an in-memory value for the current session only. */
  var root = document.documentElement;
  var STORAGE_KEY = "webmakers-theme";

  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  function prefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var toggles = document.querySelectorAll(".theme-toggle");
    toggles.forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }

  var initial = safeGet(STORAGE_KEY) || (prefersDark() ? "dark" : "light");
  applyTheme(initial);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".theme-toggle");
    if (!btn) return;
    var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    var next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    safeSet(STORAGE_KEY, next);
  });

  /* ---------- Fixed header: shadow/border once scrolled ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-open", isOpen);
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      // close siblings within the same list for a tidy single-open accordion
      var list = item.closest(".faq-list");
      if (list) {
        list.querySelectorAll(".faq-item.is-open").forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove("is-open");
            openItem.querySelector(".faq-a").style.maxHeight = null;
            openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          }
        });
      }
      item.classList.toggle("is-open", !isOpen);
      q.setAttribute("aria-expanded", (!isOpen).toString());
      a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
    });
  });

  /* ---------- Year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
