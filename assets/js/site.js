(function () {
  var root = document.querySelector('.vg');
  if (!root) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Palette switcher: swaps one class on the root; every colour is a CSS variable ---- */
  var NAMES = { verdant: 'Verdant', forest: 'Deep Forest', mint: 'Mono + Mint', moss: 'Moss & Stone' };
  var swatches = Array.prototype.slice.call(document.querySelectorAll('.sw[data-palette]'));
  var nameEl = document.querySelector('.pal-name');
  function setPalette(id) {
    if (!NAMES[id]) return;
    Object.keys(NAMES).forEach(function (k) { root.classList.remove('p-' + k); });
    root.classList.add('p-' + id);
    swatches.forEach(function (b) {
      var on = b.getAttribute('data-palette') === id;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (nameEl) nameEl.textContent = NAMES[id];
    try { localStorage.setItem('verdant-palette', id); } catch (e) {}
  }
  swatches.forEach(function (b) { b.addEventListener('click', function () { setPalette(b.getAttribute('data-palette')); }); });
  try { var saved = localStorage.getItem('verdant-palette'); if (saved) setPalette(saved); } catch (e) {}

  /* ---- Nav: translucent after scrolling + sprout scroll indicator fills bottom→top ---- */
  var nav = document.querySelector('.nav');
  var rect = document.getElementById('sindRect');
  var fill = document.getElementById('sindFill');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var se = document.documentElement;
      var max = se.scrollHeight - window.innerHeight;
      var y = window.scrollY || se.scrollTop || 0;
      var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      var top = 12 + 213 * (1 - p);          /* sprout spans y 12 → 225 in its 310×238 viewBox */
      if (rect) { rect.setAttribute('y', top.toFixed(1)); rect.setAttribute('height', (238 - top).toFixed(1)); }
      if (fill) fill.style.clipPath = 'inset(' + (top / 238 * 100).toFixed(1) + '% 0 0 0)';
      if (nav) nav.classList.toggle('is-scrolled', y > 8);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---- Mobile menu ---- */
  var btn = document.getElementById('menuBtn');
  var panel = document.getElementById('mpanel');
  function setMenu(open) {
    if (!btn || !panel) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    panel.hidden = !open;
  }
  if (btn) btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  if (panel) panel.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && btn && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); } });

  /* ---- Newsletter (prototype: no backend) ---- */
  Array.prototype.forEach.call(document.querySelectorAll('#newsletterForm,[data-proto-form]'), function (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); });
  });

  /* ---- Fade/rise on scroll + number counters ---- */
  if (reduce || !('IntersectionObserver' in window)) return;
  root.classList.add('rv-on');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  Array.prototype.forEach.call(document.querySelectorAll('.rv'), function (el) { io.observe(el); });

  var stats = document.querySelector('.stats');
  var nums = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if (stats && nums.length && stats.getBoundingClientRect().top > window.innerHeight) {
    nums.forEach(function (n) { n.textContent = '0'; });
    var sio = new IntersectionObserver(function (entries) {
      if (!entries.some(function (e) { return e.isIntersecting; })) return;
      sio.disconnect();
      var t0 = performance.now(), dur = 1700;
      (function step(t) {
        var k = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
        nums.forEach(function (n) { n.textContent = String(Math.round(+n.getAttribute('data-count') * eased)); });
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    }, { threshold: 0.4 });
    sio.observe(stats);
  }
})();
