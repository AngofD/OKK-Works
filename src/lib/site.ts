import { site } from '@/content/site';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const main = document.querySelector<HTMLElement>('main');
  const footer = document.querySelector<HTMLElement>('footer');
  if (!header || !toggle || !menu) return;

  let restoreFocus: HTMLElement | null = null;
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  const close = () => {
    if (menu.hidden) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Відкрити навігацію');
    menu.hidden = true;
    document.body.classList.remove('menu-open');
    main?.removeAttribute('inert');
    footer?.removeAttribute('inert');
    restoreFocus?.focus();
    restoreFocus = null;
  };
  const open = () => {
    restoreFocus = document.activeElement instanceof HTMLElement ? document.activeElement : toggle;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрити навігацію');
    menu.hidden = false;
    document.body.classList.add('menu-open');
    main?.setAttribute('inert', '');
    footer?.setAttribute('inert', '');
    menu.querySelector<HTMLAnchorElement>('a')?.focus();
  };

  toggle.addEventListener('click', () => (menu.hidden ? open() : close()));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    if (event.key !== 'Tab' || menu.hidden) return;
    const focusable = [toggle, ...menu.querySelectorAll<HTMLElement>('a, button:not([disabled])')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 901px)').matches) close();
  });
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  targets.forEach((target) => observer.observe(target));
}

function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || reducedMotion) return;
  if (window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty('--hero-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 10}px`);
      hero.style.setProperty('--hero-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 8}px`);
    });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--hero-x', '0px');
      hero.style.setProperty('--hero-y', '0px');
    });
  }
  let ticking = false;
  const update = () => {
    const progress = Math.min(Math.max(window.scrollY / Math.max(hero.offsetHeight, 1), 0), 1);
    hero.style.setProperty('--hero-scroll', `${progress * 26}px`);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
}

function initServices() {
  const tabs = [...document.querySelectorAll<HTMLButtonElement>('[data-service-tab]')];
  const panels = [...document.querySelectorAll<HTMLElement>('[data-service-panel]')];
  if (!tabs.length || !panels.length) return;

  const activate = (tab: HTMLButtonElement, moveFocus = false) => {
    const key = tab.dataset.serviceTab;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.dataset.servicePanel === key;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
      if (active && !reducedMotion) {
        panel.animate([
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 420, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      }
    });
    if (moveFocus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(tabs[nextIndex], true);
    });
  });
}

function initFilters() {
  const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const cards = [...document.querySelectorAll<HTMLElement>('[data-category]')];
  filters.forEach((filter) => filter.addEventListener('click', () => {
    const value = filter.dataset.filter;
    filters.forEach((item) => {
      const active = item === filter;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => {
      const visible = value === 'Усі' || card.dataset.category === value;
      card.hidden = !visible;
      card.toggleAttribute('aria-hidden', !visible);
    });
  }));
}

function initProcess() {
  const process = document.querySelector<HTMLElement>('[data-process]');
  if (!process) return;
  if (reducedMotion) {
    process.style.setProperty('--process-progress', '100%');
    return;
  }
  let ticking = false;
  const update = () => {
    const bounds = process.getBoundingClientRect();
    const point = window.innerHeight * 0.64;
    const progress = Math.max(0, Math.min(1, (point - bounds.top) / Math.max(bounds.height, 1)));
    process.style.setProperty('--process-progress', `${progress * 100}%`);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}

function initInquiry() {
  const form = document.querySelector<HTMLFormElement>('[data-inquiry-form]');
  const status = document.querySelector<HTMLElement>('[data-form-status]');
  if (!form) return;
  const serviceField = form.elements.namedItem('service');
  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (requestedService && serviceField instanceof HTMLSelectElement && [...serviceField.options].some((option) => option.value === requestedService)) {
    serviceField.value = requestedService;
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const serviceName = String(data.get('service') || 'Не визначено').trim();
    const budget = String(data.get('budget') || 'Не вказано').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = encodeURIComponent(`Запит на проєкт: ${serviceName}`);
    const body = encodeURIComponent(`Ім’я: ${name}\nEmail: ${email}\nПослуга: ${serviceName}\nБюджет: ${budget}\n\nКонтекст проєкту:\n${message}`);
    if (status) status.textContent = 'Відкриваємо ваш поштовий застосунок...';
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  });
}

initHeader();
initReveal();
initHero();
initServices();
initFilters();
initProcess();
initInquiry();
