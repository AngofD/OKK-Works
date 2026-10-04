import { initInquiry } from './inquiry';

// Scope filters to their own portfolio, so embedded sections remain independent.
document.querySelectorAll<HTMLElement>('[data-inner-portfolio]').forEach(root => {
  const filters = [...root.querySelectorAll<HTMLButtonElement>('[data-inner-filter]')];
  const cards = [...root.querySelectorAll<HTMLElement>('[data-inner-category]')];
  filters.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.innerFilter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    let count = 0;
    cards.forEach(card => { card.hidden = selected !== 'Усі' && selected !== card.dataset.innerCategory; if (!card.hidden) count++; });
    const status = root.querySelector<HTMLElement>('[data-inner-filter-status]');
    if (status) status.textContent = `Показано проєктів: ${count}`;
    const empty = root.querySelector<HTMLElement>('[data-inner-empty]');
    if (empty) empty.hidden = count > 0;
    root.querySelectorAll<HTMLElement>('[data-inner-other], .i-gallery').forEach(extra => { extra.hidden = selected !== 'Усі' && selected !== 'Вебсайти'; });
  }));
});

// Native disclosure controls work without JavaScript, including keyboard input.
const menu = document.querySelector<HTMLDetailsElement>('.i-mobile-nav');
if (menu) {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary')?.focus(); }
  });
  document.addEventListener('click', event => { if (event.target instanceof Node && !menu.contains(event.target)) menu.open = false; });
  matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) menu.open = false; });
}
initInquiry();
