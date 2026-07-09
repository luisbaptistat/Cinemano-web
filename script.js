document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú a pantalla completa ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const menuOverlay = document.getElementById('menuOverlay');

  function openMenu() {
    menuOverlay.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOverlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    menuOverlay.classList.contains('open') ? closeMenu() : openMenu();
  });
  menuClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.menu-overlay-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  window.addEventListener('resize', closeMenu);

  /* ---------- WhatsApp flotante ---------- */
  const whatsappToggle = document.getElementById('whatsappToggle');
  const whatsappBox = document.getElementById('whatsappBox');

  whatsappToggle.addEventListener('click', () => {
    const isOpen = whatsappBox.classList.toggle('open');
    whatsappToggle.setAttribute('aria-expanded', String(isOpen));
  });

});
