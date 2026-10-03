const email = document.body.dataset.contactEmail;
const galleryItems = JSON.parse(document.querySelector('#portfolio-gallery').dataset.items);
const video = document.querySelector('#hero-video');
const motionButton = document.querySelector('#motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = reducedMotion.matches;
let heroVisible = true;
function updateVideo() {
  const paused = userPaused || !heroVisible || document.hidden;
  if (paused) video.pause();
  else video.play().catch(() => {});
  motionButton.setAttribute('aria-pressed', String(userPaused));
  motionButton.setAttribute('aria-label', userPaused ? 'Відтворити відео' : 'Призупинити відео');
  motionButton.querySelector('span').textContent = userPaused ? 'Відтворити' : 'Пауза';
  motionButton.querySelector('path').setAttribute('d', userPaused ? 'M7 5l8 5-8 5V5Z' : 'M7 5v10M13 5v10');
}
video.muted = true;
video.playbackRate = 1;
if (reducedMotion.matches) video.removeAttribute('autoplay');
motionButton.addEventListener('click', () => { userPaused = !userPaused; updateVideo(); });
reducedMotion.addEventListener('change', e => { userPaused = e.matches; updateVideo(); });
document.addEventListener('visibilitychange', updateVideo);
new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; updateVideo(); }, { threshold: .05 }).observe(document.querySelector('.hero'));
updateVideo();

const header = document.querySelector('.header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 35), { passive: true });
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
  mobileMenu.hidden = !open;
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', e => { if (!header.contains(e.target)) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobileMenu.hidden) { setMenu(false); menuButton.focus(); } });

const inquiry = document.querySelector('#email-inquiry');
const contextLine = document.querySelector('#inquiry-context');
function setInquiry(label) {
  contextLine.hidden = !label;
  contextLine.textContent = label ? 'Хочемо обговорити: ' + label : '';
  inquiry.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Проєкт для OKK Works' + (label ? ': ' + label : '')) + '&body=' + encodeURIComponent('Вітаю!\n\n' + (label ? 'Мене цікавить: ' + label + '.\n\n' : '') + 'Коротко про задачу:\n');
}
document.querySelectorAll('.service-inquiry').forEach(a => a.addEventListener('click', () => setInquiry(a.dataset.service)));

const cases = {
  obrys: { title: 'Obrys Retreat', subtitle: 'Вебсайт гірського ретриту з демо-планувальником перебування.', desktop: '/assets/home-v2/obrys-desktop.webp', mobile: '/assets/home-v2/obrys-mobile.webp', task: 'Передати атмосферу гірського простору й допомогти відвідувачу перейти від перегляду до вибору проживання.', solution: 'Кінематографічна подача, варіанти проживання, галерея та демо-планувальник: дати, гості й додаткові опції. Окрема композиція для телефону.' },
  mova: { title: 'MOVA Beauty', subtitle: 'Сайт beauty-студії з каталогом послуг і демо-записом.', desktop: '/assets/home-v2/mova-desktop.webp', mobile: '/assets/home-v2/mova-mobile.webp', task: 'Поєднати виразний образ beauty-студії зі зрозумілим вибором послуг і коротким маршрутом до запису.', solution: 'Великі фотографії, виразна типографіка, каталог послуг, галерея робіт та покроковий демо-запис. Узгоджена мобільна версія.' },
  kut: { title: 'KUT/01 Barber Club', subtitle: 'Сайт барбершопу з послугами, майстрами та покроковим демо-записом.', desktop: '/assets/home-v2/kut-desktop.webp', mobile: '/assets/home-v2/kut-mobile.webp', task: 'Показати атмосферу майстерні й поєднати її зі зрозумілим прайсом, профілями майстрів та записом.', solution: 'Послуга → майстер → день → час. Підсумок перед підтвердженням, пов’язаний із послугами демо-запис і той самий маршрут на телефоні.' }
};
const dialog = document.querySelector('#case-dialog');
let lastCaseButton = null;
let activeCase = '';
function openCase(key, trigger) {
  const item = cases[key];
  if (!item) return;
  activeCase = key;
  const project = galleryItems.find(item => item.id === key);
  dialog.querySelector('.dialog-case-link').href = project.caseUrl;
  dialog.querySelector('.dialog-live-link').href = project.liveUrl;
  lastCaseButton = trigger;
  dialog.querySelector('#dialog-title').textContent = item.title;
  dialog.querySelector('.dialog-subtitle').textContent = item.subtitle;
  dialog.querySelector('.dialog-task').textContent = item.task;
  dialog.querySelector('.dialog-solution').textContent = item.solution;
  const desktop = dialog.querySelector('.dialog-desktop');
  desktop.src = item.desktop; desktop.alt = 'Вебсайт ' + item.title;
  const mobile = dialog.querySelector('.dialog-mobile');
  mobile.src = item.mobile; mobile.alt = 'Мобільний екран ' + item.title;
  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
}
document.addEventListener('click', event => {
  const button = event.target.closest('[data-case]');
  if (button) openCase(button.dataset.case, button);
});
document.addEventListener('okk:open-case', event => openCase(event.detail.key, event.detail.trigger));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastCaseButton?.focus({ preventScroll: true }); });
dialog.querySelector('.dialog-inquiry').addEventListener('click', () => { setInquiry('проєкт у стилі ' + cases[activeCase].title); dialog.close(); });

const toast = document.querySelector('#toast');
let toastTimer;
document.querySelector('.copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = 'Email скопійовано';
  } catch {
    toast.textContent = 'Email: ' + email;
  }
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
});
