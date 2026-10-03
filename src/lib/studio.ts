import { site } from '@/content/site';

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

function initNavigation() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!toggle || !menu) return;
  const page = [...document.querySelectorAll<HTMLElement>('main, .site-footer')];
  const close = (focus = true) => {
    if (menu.hidden) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Відкрити навігацію');
    document.body.classList.remove('menu-open');
    page.forEach(element => element.removeAttribute('inert'));
    if (focus) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    if (!menu.hidden) return close();
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрити навігацію');
    document.body.classList.add('menu-open');
    page.forEach(element => element.setAttribute('inert', ''));
    menu.querySelector<HTMLElement>('a')?.focus();
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close(false)));
  document.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key !== 'Tab') return;
    const focusables = [toggle, ...menu.querySelectorAll<HTMLElement>('a,button')];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) close(false); });
}

function initMotion() {
  const reveal = [...document.querySelectorAll<HTMLElement>('.reveal')];
  if (!motionPreference.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { threshold: .06 });
    document.documentElement.classList.add('motion-ready');
    reveal.forEach(element => observer.observe(element));
    motionPreference.addEventListener('change', event => { if (event.matches) { document.documentElement.classList.remove('motion-ready'); observer.disconnect(); } });
  }
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || !window.matchMedia('(pointer: fine)').matches) return;
  let frame = 0;
  hero.addEventListener('pointermove', event => {
    if (motionPreference.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty('--hero-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 9}px`);
      hero.style.setProperty('--hero-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 7}px`);
    });
  });
  hero.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); hero.style.setProperty('--hero-x', '0px'); hero.style.setProperty('--hero-y', '0px'); });
}

function initAccordion() {
  document.querySelectorAll<HTMLDetailsElement>('[data-accordion] details').forEach(detail => {
    const summary = detail.querySelector('summary');
    if (!summary) return;
    let animation: Animation | null = null;
    let targetOpen = detail.open;
    summary.addEventListener('click', event => {
      if (motionPreference.matches) { targetOpen = !detail.open; return; }
      event.preventDefault();
      const start = detail.getBoundingClientRect().height;
      targetOpen = !targetOpen;
      animation?.cancel();
      detail.open = true;
      const end = targetOpen ? detail.getBoundingClientRect().height : summary.getBoundingClientRect().height + 2;
      animation = detail.animate({ height: [`${start}px`, `${end}px`] }, { duration: 300, easing: 'cubic-bezier(.2,.7,.2,1)' });
      animation.onfinish = () => { detail.open = targetOpen; animation = null; };
    });
  });
}

function initFilters() {
  const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const cards = [...document.querySelectorAll<HTMLElement>('[data-category]')];
  const empty = document.querySelector<HTMLElement>('[data-work-empty]');
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  const extraConcepts = document.querySelector<HTMLElement>('.more-concepts');
  const activate = (value: string) => {
    let count = 0;
    filters.forEach(button => { const active = button.dataset.filter === value; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => {
      const visible = value === 'Усі' || card.dataset.category === value;
      card.hidden = !visible;
      if (visible) { count++; if (!motionPreference.matches) card.animate([{ opacity: .3, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'ease-out' }); }
    });
    if (empty) empty.hidden = count !== 0;
    if (extraConcepts) extraConcepts.hidden = value !== 'Усі' && value !== 'Вебсайти';
    if (status) status.textContent = `Показано проєктів: ${count}`;
  };
  filters.forEach(button => button.addEventListener('click', () => activate(button.dataset.filter || 'Усі')));
}

function initInquiry() {
  const form = document.querySelector<HTMLFormElement>('[data-inquiry-form]');
  const status = document.querySelector<HTMLElement>('[data-form-status]');
  const fallback = document.querySelector<HTMLElement>('[data-form-fallback]');
  if (!form) return;
  form.querySelector<HTMLButtonElement>('button[type="submit"]')?.removeAttribute('disabled');
  const service = form.elements.namedItem('service');
  const requested = new URLSearchParams(window.location.search).get('service');
  if (requested && service instanceof HTMLSelectElement && [...service.options].some(option => option.value === requested)) service.value = requested;
  let preparedMessage = '';
  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const fieldName of ['name', 'contact', 'message']) {
      const field = form.elements.namedItem(fieldName);
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.setCustomValidity(field.value.trim() ? '' : 'Будь ласка, заповніть це поле.');
        field.addEventListener('input', () => field.setCustomValidity(''), { once: true });
      }
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const serviceName = service instanceof HTMLSelectElement ? service.selectedOptions[0].text : 'Проєкт';
    preparedMessage = `Ім’я: ${String(data.get('name')).trim()}\nКонтакт: ${String(data.get('contact')).trim()}\nПослуга: ${serviceName}\nБюджет: ${data.get('budget') || 'Не вказано'}\nЗручний зв’язок: ${data.get('channel') || 'Не вказано'}\n\nЗадача:\n${String(data.get('message')).trim()}`;
    if (status) status.textContent = 'Лист підготовлено. Надішліть його у своєму поштовому застосунку. Якщо він не відкрився, скопіюйте текст нижче.';
    if (fallback) fallback.hidden = false;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Запит на проєкт: ${serviceName}`)}&body=${encodeURIComponent(preparedMessage)}`;
  });
  document.querySelector('[data-copy-inquiry]')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(preparedMessage); if (status) status.textContent = `Текст скопійовано. Надішліть його на ${site.email}.`; }
    catch { if (status) status.textContent = `Копіювання недоступне. Напишіть напряму на ${site.email}.`; }
  });
}

initNavigation();
initMotion();
initAccordion();
initFilters();
initInquiry();
