/* =====================================================
   MAIN SCRIPT – E-Portfolio | S.A.D. Induwara
   ===================================================== */

// === PARTICLES CANVAS ===
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;
  const GOLD = 'rgba(212,175,55,';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  function Particle() {
    this.reset = function () {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.a = Math.random() * 0.4 + 0.05;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.life = Math.random() * 400 + 200;
      this.age = 0;
    };
    this.reset();
    this.y = Math.random() * H;  // start anywhere, not just top
  }

  function initParticles() {
    const count = Math.floor((W * H) / 12000);
    particles = Array.from({ length: count }, () => new Particle());
  }
  initParticles();

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = GOLD + (0.04 * (1 - dist / 100)) + ')';
          ctx.lineWidth = 0.4;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.age++;
      if (p.age > p.life || p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
      const alpha = Math.min(p.age / 60, 1, (p.life - p.age) / 60) * p.a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + alpha + ')';
      ctx.fill();
    });
    drawConnections();
    animId = requestAnimationFrame(loop);
  }
  loop();
})();

// === NAV SCROLL EFFECT ===
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// === INTERSECTION OBSERVER – REVEAL ===
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// === CRITERIA BARS ANIMATION ===
(function () {
  const bars = document.querySelectorAll('.criteria-bar');
  if (!bars.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target;
        const target = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = target; }, 200);
        io.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => { b.style.width = '0%'; io.observe(b); });
})();
