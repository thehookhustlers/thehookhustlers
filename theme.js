/* ═══════════════════════════════════════════════════
   THE HOOK HUSTLERS — SHARED PREMIUM JS
   theme.js — include on every page
   ═══════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── INSTANT LOGIN STATE ── */
  if (localStorage.getItem('hhLoggedIn') === 'true') {
    document.documentElement.classList.add('is-logged-in');
  }

  /* ── CUSTOM CURSOR ── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  if (cursor && cursorRing) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    document.querySelectorAll('a, button, .flip-card, .filter-chip').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform     = 'translate(-50%,-50%) scale(2.5)';
        cursorRing.style.width     = '56px';
        cursorRing.style.height    = '56px';
        cursorRing.style.opacity   = '0.3';
        cursorRing.style.borderColor = 'var(--emerald)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform     = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.width     = '32px';
        cursorRing.style.height    = '32px';
        cursorRing.style.opacity   = '0.5';
        cursorRing.style.borderColor = 'var(--purple2)';
      });
    });
  }

  /* ── PARTICLE SYSTEM (multi-color spectrum) ── */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx    = canvas.getContext('2d');
    const colors = ['#ff1a3c','#9d00ff','#0088ff','#00ff88','#ffb700','#c44dff','#4db8ff'];
    let particles = [];
    let W, H;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x   = Math.random() * W;
        this.y   = Math.random() * H;
        this.vx  = (Math.random() - .5) * .4;
        this.vy  = (Math.random() - .5) * .4 - .2;
        this.r   = Math.random() * 1.6 + .4;
        this.col = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * .5 + .1;
        this.life  = 0;
        this.maxLife = Math.random() * 300 + 200;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife ||
            this.x < 0 || this.x > W ||
            this.y < 0 || this.y > H) {
          this.reset();
        }
      }
      draw() {
        const fade = Math.min(this.life / 40, 1) *
                     Math.min((this.maxLife - this.life) / 40, 1);
        ctx.save();
        ctx.globalAlpha = this.alpha * fade;
        ctx.shadowColor = this.col;
        ctx.shadowBlur  = 8;
        ctx.fillStyle   = this.col;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 120; i++) {
      const p = new Particle();
      p.life = Math.random() * p.maxLife; // stagger
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });

      // Connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 80) {
            ctx.save();
            ctx.globalAlpha = (1 - dist/80) * 0.06;
            ctx.strokeStyle = particles[i].col;
            ctx.lineWidth = .5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  /* ── HAMBURGER / MOBILE MENU ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  window.closeMobile = () => {
    if (hamburger)  hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
  };

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('[data-target]');
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const dur    = 1800;
      const step   = 16;
      const inc    = target / (dur / step);
      let cur = 0;
      const t = setInterval(() => {
        cur += inc;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = Math.floor(cur).toLocaleString() + suffix;
      }, step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countIO.observe(el));

  /* ── BAR CHART FILL ── */
  const bars = document.querySelectorAll('.chart-bar-fill');
  const barIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = (e.target.dataset.width || 0) + '%';
        barIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => barIO.observe(b));

  /* ── JOURNEY STEP ANIMATION ── */
  const jsteps = document.querySelectorAll('.jstep');
  const jIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('animated'), delay);
        jIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  jsteps.forEach(el => jIO.observe(el));

  /* ── FILTER CHIPS ── */
  document.querySelectorAll('.filter-bar').forEach(bar => {
    bar.addEventListener('click', e => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  /* ── HOW TABS ── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── NAV USER BADGE ── */
  const badge = document.getElementById('nav-user-badge');
  if (badge) {
    if (localStorage.getItem('hhLoggedIn') === 'true') {
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }

  /* ── NEON GLITCH on LOGO hover ── */
  const logo = document.querySelector('.nav-logo-text');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.filter = 'drop-shadow(0 0 16px rgba(157,0,255,0.8)) drop-shadow(0 0 32px rgba(255,26,60,0.5))';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.filter = 'drop-shadow(0 0 8px rgba(157,0,255,0.5))';
    });
  }

})();
