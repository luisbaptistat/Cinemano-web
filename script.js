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
     Arranca escondido: al abrir la página solo se ve el video.
     Aparece al scrollear hacia arriba o (en desktop) al acercar el
     mouse a la franja superior; se vuelve a esconder apenas el mouse
     se aleja de esa zona o se sigue bajando la página. */
  const navbar = document.getElementById('navbar');
  const SHOW_NEAR_TOP_PX = 72; // zona sensible al mouse, en px desde arriba

  let lastScrollY = window.scrollY;
  let ticking = false;

  function showNav() { navbar.classList.remove('nav-hidden'); }
  function hideNav() { navbar.classList.add('nav-hidden'); }

  hideNav(); // estado inicial: escondido

  function handleScroll() {
    const currentY = window.scrollY;

    if (navLinks.classList.contains('active')) {
      showNav(); // nunca esconder con el menú móvil abierto
    } else if (currentY < lastScrollY) {
      showNav(); // subiendo → aparece
    } else if (currentY > lastScrollY) {
      hideNav(); // bajando → se esconde
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

  // Desktop: acercar el mouse a la franja superior muestra el nav;
  // alejarlo lo vuelve a esconder (a menos que el menú esté abierto)
  window.addEventListener('mousemove', (e) => {
    if (navLinks.classList.contains('active')) return;
    if (e.clientY <= SHOW_NEAR_TOP_PX) {
      showNav();
    } else if (e.clientY > SHOW_NEAR_TOP_PX + 48 && window.scrollY <= 4) {
      hideNav();
    }
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
