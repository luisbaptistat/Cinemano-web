document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú hamburguesa ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.getElementById('navLinks');

  function closeMenu() {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  hamburger.addEventListener('click', toggleMenu);
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  window.addEventListener('resize', closeMenu);

  /* ---------- Tabs de servicios (documental / comerciales / eventos / news) ---------- */
  const tabs = document.querySelectorAll('.card[data-target]');
  const panels = document.querySelectorAll('[data-video-panel]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;

      tabs.forEach(t => t.setAttribute('aria-pressed', String(t === tab)));
      panels.forEach(panel => {
        panel.hidden = panel.id !== targetId;
      });

      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  /* ---------- WhatsApp flotante ---------- */
  const whatsappToggle = document.getElementById('whatsappToggle');
  const whatsappBox = document.getElementById('whatsappBox');

  whatsappToggle.addEventListener('click', () => {
    const isOpen = whatsappBox.classList.toggle('open');
    whatsappToggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* ---------- Nav auto-ocultable ----------
     Se esconde al bajar la página, aparece al subirla o (en desktop)
     al acercar el mouse a la franja superior. Funciona igual en
     PC y en celular. */
  const navbar = document.getElementById('navbar');
  const SHOW_NEAR_TOP_PX = 72;   // zona sensible al mouse, en px desde arriba
  const HIDE_AFTER_SCROLL_PX = 120; // no esconder hasta pasar el hero

  let lastScrollY = window.scrollY;
  let ticking = false;

  function showNav() { navbar.classList.remove('nav-hidden'); }
  function hideNav() { navbar.classList.add('nav-hidden'); }

  function handleScroll() {
    const currentY = window.scrollY;

    // Nunca esconder mientras el menú móvil está abierto
    if (navLinks.classList.contains('active')) {
      showNav();
    } else if (currentY <= HIDE_AFTER_SCROLL_PX) {
      showNav(); // siempre visible cerca del tope
    } else if (currentY > lastScrollY) {
      hideNav(); // bajando → se esconde
    } else if (currentY < lastScrollY) {
      showNav(); // subiendo → aparece
    }

    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  // Desktop: acercar el mouse arriba de todo trae el nav de vuelta
  window.addEventListener('mousemove', (e) => {
    if (e.clientY <= SHOW_NEAR_TOP_PX) showNav();
  });

});

/* ---------- Cargar video de YouTube dentro de una miniatura (documental / news) ---------- */
function cargarVideoYouTube(containerId, videoId, thumbnailEl) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
      title="Video de Cinemano"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>`;

  container.hidden = false;
  if (thumbnailEl) thumbnailEl.style.display = 'none';
}
