/* Riama landing — ambient cursor glow + locale persistence.
   Kept deliberately small; there is no app state beyond the active locale. */
(function () {
  'use strict';

  var lang = document.documentElement.lang === 'es' ? 'es' : 'en';

  /* Persist the locale of the page actually being viewed, and record the
     choice whenever a language toggle is clicked (before navigation). */
  try { localStorage.setItem('riama-lang', lang); } catch (e) {}

  var toggles = document.querySelectorAll('[data-set-lang]');
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', function () {
      try { localStorage.setItem('riama-lang', this.getAttribute('data-set-lang')); } catch (e) {}
    });
  }

  /* Cursor glow — track the pointer as a percentage of the viewport and
     write it to CSS custom properties, throttled to one write per frame.
     Skipped entirely when the user prefers reduced motion. */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var glow = document.querySelector('.hero__glow');

  if (glow && !reduce) {
    var pending = false;
    var px = 72, py = 35;

    window.addEventListener('mousemove', function (e) {
      px = (e.clientX / window.innerWidth) * 100;
      py = (e.clientY / window.innerHeight) * 100;
      if (!pending) {
        pending = true;
        requestAnimationFrame(function () {
          glow.style.setProperty('--glow-x', px.toFixed(2) + '%');
          glow.style.setProperty('--glow-y', py.toFixed(2) + '%');
          pending = false;
        });
      }
    }, { passive: true });
  }
})();
