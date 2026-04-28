// === MAIN.JS — Nav, Scroll, Particles, Init ===

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky Navbar ----
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrolled > 60);
    }
    if (scrollProgress) {
      const total = document.body.scrollHeight - window.innerHeight;
      scrollProgress.style.width = (scrolled / total * 100) + '%';
    }
  });

  // ---- Mobile Nav Toggle ----
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ---- Active Nav Link ----
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll Reveal (Intersection Observer) ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ---- Hero Floating Particles ----
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 3 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 6) + 's';
      particle.style.opacity = Math.random() * 0.4 + 0.1;
      particlesContainer.appendChild(particle);
    }
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Parallax effect on hero glow ----
  const heroGlow = document.querySelector('.hero-glow');
  if (heroGlow) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      heroGlow.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

});
