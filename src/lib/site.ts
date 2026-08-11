import { site } from '@/content/site';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  const updateHeader = () => {
    const currentY = window.scrollY;
    header.classList.toggle('is-scrolled', currentY > 30);
    header.classList.toggle('is-hidden', currentY > lastY && currentY > 180 && !document.body.classList.contains('menu-open'));
    lastY = Math.max(currentY, 0);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
  const close = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    menu.hidden = true;
    document.body.classList.remove('menu-open');
  };
  toggle?.addEventListener('click', () => {
    if (!menu) return;
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open) close();
    else {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation');
      menu.hidden = false;
      document.body.classList.add('menu-open');
      menu.querySelector<HTMLAnchorElement>('a')?.focus();
    }
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 901px)').matches) close();
  });
  updateHeader();
}

function initProgress() {
  const progress = document.querySelector<HTMLElement>('[data-progress]');
  if (!progress) return;
  const update = () => {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? Math.min(window.scrollY / range, 1) : 0})`;
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach((target) => observer.observe(target));
}

function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
  hero.addEventListener('pointermove', (event) => {
    hero.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth - 0.5) * 28}px`);
    hero.style.setProperty('--pointer-y', `${(event.clientY / window.innerHeight - 0.5) * 24}px`);
  });
}

function initServices() {
  const triggers = document.querySelectorAll<HTMLButtonElement>('[data-service]');
  const scenes = document.querySelectorAll<HTMLElement>('[data-scene]');
  triggers.forEach((trigger) => trigger.addEventListener('click', () => {
    const index = trigger.dataset.service;
    triggers.forEach((item) => {
      const active = item === trigger;
      item.setAttribute('aria-expanded', String(active));
      item.closest('.service-item')?.classList.toggle('active', active);
    });
    scenes.forEach((scene) => scene.classList.toggle('active', scene.dataset.scene === index));
  }));
}

function initFilters() {
  const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('[data-category]');
  filters.forEach((filter) => filter.addEventListener('click', () => {
    const value = filter.dataset.filter;
    filters.forEach((item) => {
      const active = item === filter;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => {
      const visible = value === 'All' || card.dataset.category === value;
      card.hidden = !visible;
      card.toggleAttribute('aria-hidden', !visible);
    });
  }));
}

function initProcess() {
  const process = document.querySelector<HTMLElement>('[data-process]');
  if (!process) return;
  const steps = [...process.querySelectorAll<HTMLElement>('.process-step')];
  const update = () => {
    const bounds = process.getBoundingClientRect();
    const viewportPoint = window.innerHeight * 0.58;
    const value = Math.max(0, Math.min(1, (viewportPoint - bounds.top) / bounds.height));
    process.style.setProperty('--process-progress', `${value * 100}%`);
    steps.forEach((step) => step.classList.toggle('is-active', step.getBoundingClientRect().top < viewportPoint));
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initMagnetic() {
  if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('.magnetic').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const bounds = element.getBoundingClientRect();
      element.style.transform = `translate(${(event.clientX - bounds.left - bounds.width / 2) * 0.11}px, ${(event.clientY - bounds.top - bounds.height / 2) * 0.16}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });
}

function initInquiry() {
  const form = document.querySelector<HTMLFormElement>('[data-inquiry-form]');
  const status = document.querySelector<HTMLElement>('[data-form-status]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const serviceName = String(data.get('service') ?? 'Project').trim() || 'Project';
    const budget = String(data.get('budget') || 'Not specified').trim() || 'Not specified';
    const message = String(data.get('message') ?? '').trim();
    const subject = encodeURIComponent(`Project inquiry: ${serviceName}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${serviceName}\nBudget: ${budget}\n\nProject context:\n${message}`);
    if (status) status.textContent = 'Opening your email application...';
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  });
}

initHeader();
initProgress();
initReveal();
initHero();
initServices();
initFilters();
initProcess();
initMagnetic();
initInquiry();
