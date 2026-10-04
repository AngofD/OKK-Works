import { site } from '@/content/site';

export function initInquiry() {
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

