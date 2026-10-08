/* Verdant ESG — GSAP motion layer (site only).
   Needs gsap, ScrollTrigger, SplitText and (optionally) Lenis loaded first.
   Adds html.gs, which hands the hero, headlines, statements, photos and the dark CTA over from vg-motion.css to GSAP.
   Everything else (reveals of .rv blocks, lists, hairlines, badges) keeps running from CSS via the .in class. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.querySelector('.vg');
  if (!root || reduce || !window.gsap || !window.ScrollTrigger) return;

  var gsap = window.gsap, ST = window.ScrollTrigger, Split = window.SplitText;
  gsap.registerPlugin(ST);
  if (Split) gsap.registerPlugin(Split);
  document.documentElement.classList.add('gs');

  var EXPO = 'expo.out';
  var q = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Smooth scrolling (Lenis) ---------- */
  var lenis = null;
  if (window.Lenis) {
    document.documentElement.style.scrollBehavior = 'auto';
    lenis = new window.Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    q('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        lenis.scrollTo(t, { offset: -96, duration: 1.4 });
      });
    });
  }

  /* ---------- Page transition curtain ---------- */
  var pt = document.createElement('div');
  pt.className = 'pt';
  pt.setAttribute('aria-hidden', 'true');
  pt.innerHTML = '<i></i>';
  root.appendChild(pt);
  var arriving = false;
  try { arriving = sessionStorage.getItem('vg-pt') === '1'; sessionStorage.removeItem('vg-pt'); } catch (e) {}
  if (arriving) {
    gsap.set(pt, { scaleY: 1, transformOrigin: 'top center' });
    gsap.set(pt.firstChild, { opacity: 1 });
    gsap.timeline()
      .to(pt.firstChild, { opacity: 0, duration: .3, ease: 'power2.out' }, .05)
      .to(pt, { scaleY: 0, duration: .9, ease: 'expo.inOut' }, .1);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:)/.test(href) || !/\.html(#.*)?$/.test(href)) return;
    e.preventDefault();
    try { sessionStorage.setItem('vg-pt', '1'); } catch (err) {}
    gsap.timeline({ onComplete: function () { window.location.href = href; } })
      .set(pt, { transformOrigin: 'bottom center' })
      .fromTo(pt, { scaleY: 0 }, { scaleY: 1, duration: .65, ease: 'expo.inOut' })
      .to(pt.firstChild, { opacity: 1, duration: .25 }, '-=.2');
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted) gsap.set(pt, { scaleY: 0 }); });

  /* ---------- Nav: hides on the way down, returns on the way up ---------- */
  var nav = document.querySelector('.nav');
  var lastY = 0, navHidden = false;
  ST.create({
    start: 0, end: 'max',
    onUpdate: function (self) {
      if (!nav) return;
      var y = self.scroll();
      var menuOpen = document.querySelector('.menu-btn[aria-expanded="true"]');
      var hide = navHidden;
      if (menuOpen || y < 520 || y < lastY - 4) hide = false;
      else if (y > lastY + 4) hide = true;
      if (Math.abs(y - lastY) > 4) lastY = y;
      if (hide !== navHidden) {
        navHidden = hide;
        nav.classList.toggle('is-hidden', hide);
        gsap.to(nav, { yPercent: hide ? -101 : 0, duration: hide ? .5 : .7, ease: hide ? 'power2.in' : EXPO, overwrite: 'auto' });
      }
    }
  });

  function lines(el) {
    if (!Split) return [el];
    var s = Split.create(el, { type: 'lines', mask: 'lines', linesClass: 'sl' });
    return s.lines;
  }

  function init() {
    /* ---------- Hero timeline ---------- */
    var hero = document.querySelector('.phero, .hero, .ahero');
    var tl = gsap.timeline({ defaults: { ease: EXPO }, delay: arriving ? .55 : .05 });
    if (nav) tl.from(nav, { yPercent: -100, opacity: 0, duration: 1 }, 0);
    if (hero) {
      var h1 = hero.querySelector('.h1');
      tl.from(q('.eyebrow, .crumb', hero), { y: 18, opacity: 0, duration: .9 }, .1);
      if (h1) {
        if (h1.querySelector('.em, svg')) tl.from(h1, { y: 40, opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', duration: 1.3 }, .18);
        else tl.from(lines(h1), { yPercent: 112, duration: 1.25, stagger: .09 }, .18);
      }
      tl.from(q('.ph-lead, .ph-sub, .alead, .lead, .aside-note', hero), { y: 24, opacity: 0, duration: 1.1, stagger: .08 }, .5);
      tl.from(q('.ph-intro .body, .ph-intro .ctas, .aintro .body, .aintro .btn, .cta-row, .contact .cform, .contact .c-direct', hero), { y: 28, opacity: 0, duration: 1.1, stagger: .07 }, .62);
    }

    /* ---------- Section headlines rise line by line ---------- */
    q('.h2, .guide-t').forEach(function (h) {
      if (h.closest('.phero, .hero, .ahero')) return;
      gsap.from(lines(h), { yPercent: 108, duration: 1.15, ease: EXPO, stagger: .08, scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
    });

    /* ---------- Statements light up word by word as you read ---------- */
    if (Split) {
      q('.statement, .pull blockquote, .callout p, .defn p, .qcard h3, .closing-p, .lead-b').forEach(function (el) {
        var s = Split.create(el, { type: 'words' });
        gsap.fromTo(s.words, { opacity: .16 }, { opacity: 1, ease: 'none', stagger: .04, scrollTrigger: { trigger: el, start: 'top 88%', end: 'bottom 58%', scrub: .6 } });
      });
    }

    /* ---------- Photos unmask, settle and drift ---------- */
    q('.aphoto .ph, .post-img').forEach(function (ph) {
      var img = ph.querySelector('img');
      var big = ph.classList.contains('ph');
      gsap.fromTo(ph, { clipPath: big ? 'inset(12% 8% 12% 8%)' : 'inset(8% 8% 8% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: EXPO, scrollTrigger: { trigger: ph, start: 'top 88%', once: true } });
      if (!img) return;
      var keep = img.style.transition;
      img.style.transition = 'none';
      gsap.fromTo(img, { scale: big ? 1.3 : 1.18 }, { scale: big ? 1.12 : 1, duration: 2.2, ease: EXPO, scrollTrigger: { trigger: ph, start: 'top 88%', once: true },
        onComplete: function () { if (!big) { gsap.set(img, { clearProps: 'transform' }); img.style.transition = keep; } } });
      if (big) gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: ph, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    q('.aphoto figcaption').forEach(function (c) {
      gsap.from(c, { y: 12, opacity: 0, duration: 1, ease: EXPO, delay: .4, scrollTrigger: { trigger: c, start: 'top 95%', once: true } });
    });

    /* ---------- The dark block opens out as it arrives ---------- */
    q('.deep').forEach(function (d) {
      gsap.fromTo(d, { clipPath: 'inset(0% 3.5% 0% 3.5% round 44px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: d, start: 'top 96%', end: 'top 40%', scrub: true } });
    });

    /* ---------- Hero art drifts away, footer sprout rises into place ---------- */
    q('.nleaf, .aleaf, .hero-sprout').forEach(function (a) {
      gsap.to(a, { yPercent: -14, ease: 'none', scrollTrigger: { trigger: a.closest('section') || a, start: 'top top', end: 'bottom top', scrub: true } });
    });
    q('.fsp').forEach(function (f) {
      gsap.fromTo(f, { yPercent: 12, rotate: 4 }, { yPercent: 0, rotate: 0, ease: 'none', scrollTrigger: { trigger: f.parentNode, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    });

    /* ---------- Guide: the table of contents follows your place ---------- */
    var toc = q('.toc .toc-list a, .toc-m .toc-list a');
    if (toc.length) {
      q('.art > section[id]').forEach(function (sec) {
        ST.create({
          trigger: sec, start: 'top 40%', end: 'bottom 40%',
          onToggle: function (self) {
            if (!self.isActive) return;
            toc.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('href') === '#' + sec.id); });
          }
        });
      });
    }

    /* tag long-form blocks that have no .rv so they reveal too */
    q('.art > section > *:not(.rv)').forEach(function (el) {
      el.classList.add('rv');
      ST.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { el.classList.add('in'); } });
    });

    ST.refresh();
  }

  var go = function () { requestAnimationFrame(init); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  window.addEventListener('load', function () { ST.refresh(); });
})();
