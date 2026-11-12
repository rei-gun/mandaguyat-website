document.addEventListener('DOMContentLoaded', function () {
  // Preserve the original 1920px slide composition without overflowing the page.
  const deck = document.querySelector('.portfolio-deck');
  if (deck) {
    function scaleDeck() {
      deck.style.setProperty('--deck-scale', String(Math.min(1, deck.clientWidth / 1920)));
    }
    scaleDeck();
    if ('ResizeObserver' in window) {
      new ResizeObserver(scaleDeck).observe(deck);
    } else {
      window.addEventListener('resize', scaleDeck);
    }
  }

  const button = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!button || !nav) return;

  function setMenu(open) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
  }

  button.addEventListener('click', function () {
    setMenu(button.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      button.focus();
    }
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });
});
