// =========================================================
// DAKSHIN DELIGHTS — SHARED SCRIPT
// =========================================================

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const scrim = document.querySelector('.nav-scrim');

  function closeNav() {
    nav && nav.classList.remove('open');
    scrim && scrim.classList.remove('open');
  }
  function openNav() {
    nav && nav.classList.add('open');
    scrim && scrim.classList.add('open');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) closeNav(); else openNav();
    });
  }
  if (scrim) scrim.addEventListener('click', closeNav);
  document.querySelectorAll('nav ul li a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Highlight active nav link based on current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul li a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Back to top button
  const toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) toTop.classList.add('show');
      else toTop.classList.remove('show');
    });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Generic form handler (no backend yet — shows a friendly confirmation)
  document.querySelectorAll('form[data-static-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const successBox = form.parentElement.querySelector('.form-success');
      if (successBox) {
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    });
  });
});
