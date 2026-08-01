/* =========================================================
   DAKSHIN DELIGHTS — SHARED SITE SCRIPT
========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- MOBILE NAV (drops down from top) ---------- */
  var menuToggle = document.querySelector('.menu-toggle');
  var nav        = document.querySelector('header nav');
  var navScrim   = document.querySelector('.nav-scrim');
  var toggleIcon = menuToggle ? menuToggle.querySelector('i') : null;

  function openNav() {
    nav.classList.add('open');
    navScrim.classList.add('open');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-label', 'Close menu');
    menuToggle.setAttribute('aria-expanded', 'true');
    if (toggleIcon) {
      toggleIcon.classList.remove('fa-bars');
      toggleIcon.classList.add('fa-xmark');
    }
    document.body.classList.add('nav-locked');
  }

  function closeNav() {
    nav.classList.remove('open');
    navScrim.classList.remove('open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (toggleIcon) {
      toggleIcon.classList.remove('fa-xmark');
      toggleIcon.classList.add('fa-bars');
    }
    document.body.classList.remove('nav-locked');
  }

  if (menuToggle && nav && navScrim) {
    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close when a nav link is tapped (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close when tapping the dark overlay behind the dropdown
    navScrim.addEventListener('click', closeNav);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
      }
    });

    // Close (and reset state) if the viewport is resized back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960 && nav.classList.contains('open')) {
        closeNav();
      }
    });
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  var currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('header nav ul li a, footer .footer-grid a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var linkPage = href.replace('.html', '');
    if (linkPage === currentPage || (currentPage === 'index' && linkPage === 'index')) {
      link.classList.add('active');
    }
  });

  /* ---------- BACK TO TOP BUTTON ---------- */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 420) {
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    });

    toTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- STATIC FORM HANDLING ---------- */
  document.querySelectorAll('form[data-static-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var wrapper = form.closest('.form-card') || form.closest('.contact-form-wrap') || form.parentElement;
      var successMsg = wrapper ? wrapper.querySelector('.form-success') : null;

      form.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.setAttribute('tabindex', '-1');
        successMsg.focus();
      }

      form.reset();
    });
  });

  /* ---------- HEADER SCROLL SHADOW ---------- */
  var header = document.querySelector('header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 4) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

});
