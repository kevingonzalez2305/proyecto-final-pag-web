/* Script principal de la pagina, por lo que veo hay algunas animaciones que se hacen directamente en CSS, hay que evitar confusiones y hacerlas todas en un documento. */

/* Pantalla de carga, utiliza constantes por lo que veo, esta bien. */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const start  = Date.now();
  const hide   = () => loader.classList.add('gone');
  const elapsed = Date.now() - start;
  elapsed >= 400 ? hide() : setTimeout(hide, 400 - elapsed);
});

/* Scroll por la barra de navegacion, puede hacerse mas sencilla, pero esta bien.  */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* Este es un despliegue del menu. */
function toggleMenu()    { document.getElementById('navLinks').classList.toggle('open'); }
function closeMobileMenu() { document.getElementById('navLinks').classList.remove('open'); }

/* Cerrar menú al hacer click fuera, usa eventos. */
document.addEventListener('click', (e) => {
  const nav  = document.getElementById('navLinks');
  const btn  = document.getElementById('hamburger');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) {
    closeMobileMenu();
  }
});


function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}


function handleContact() {
  const nombre = document.getElementById('fn').value.trim();
  const email  = document.getElementById('fe').value.trim();
  const msg    = document.getElementById('fmsg').value.trim();

  if (!nombre || !email || !msg) {
    showToast(' Por favor completa todos los campos');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast(' Ingresa un correo electrónico válido');
    return;
  }

  ['fn', 'ftel', 'fe', 'fmsg'].forEach(id => {
    document.getElementById(id).value = '';
  });
  showToast(' Mensaje enviado correctamente');
}


(function updateYears() {
  const founded = 1979;
  const years   = new Date().getFullYear() - founded;
  document.querySelectorAll('.years-dynamic').forEach(el => {
    el.textContent = `Más de ${years} años`;
  });
})();


const revealTargets = document.querySelectorAll(
  '.nos-card, .value-chip, .esp-card, .tit-card, .logro-card, .gal-item, .tl-item, .info-block'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity  = '1';
      e.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s`;
  revealObserver.observe(el);
});

