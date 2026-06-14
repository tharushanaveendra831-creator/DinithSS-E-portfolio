/* =====================================================
   CHAPTER PAGE SCRIPT – shared across all chapters
   ===================================================== */

// === SCROLL REVEAL ===
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// === NAV SCROLL (if present) ===
(function () {
  const nav = document.querySelector('.ch-bottom-nav');
  // just a placeholder — the chapter nav is static
})();

// === HERO PARALLAX ===
(function () {
  const heroBg = document.querySelector('.ch-hero-bg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `scale(1.08) translateY(${y * 0.12}px)`;
  }, { passive: true });
})();
