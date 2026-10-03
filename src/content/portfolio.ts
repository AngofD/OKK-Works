import { projects, type Project } from './projects';

const kut: Project = {
  slug: 'kut-01', title: 'KUT/01 Barber Club', category: 'Вебсайти', year: '2026', status: 'Концепт-проєкт', displayUrl: 'KUT/01 · демо',
  portfolioStatement: 'Сайт барбершопу з інтерактивним записом.',
  headline: 'Демонстраційний сайт барбершопу: послуги, майстри та інтерактивний запис.',
  summary: 'Концепція сучасної барберської майстерні. Прайс, майстри й покроковий демо-запис в одному інтерфейсі.',
  overview: 'Створити зрозумілий сайт барбершопу, де можна побачити атмосферу, порівняти послуги та спробувати запис без довгої переписки.',
  challenge: 'Поєднати виразний образ майстерні зі зрозумілим розкладом і цінами.',
  solution: 'Інтерактивна панель веде від вибору послуги до майстра, дати й часу. Прайс та запис пов’язані між собою, а мобільна версія зберігає той самий короткий маршрут.',
  built: ['Прайс із ціною та тривалістю', 'Профілі майстрів', 'Покроковий демо-запис', 'Галерея та простір', 'Мобільна версія'],
  capabilities: ['Послуга → майстер → день → час', 'Підсумок перед підтвердженням', 'Доступна навігація'],
  technologies: ['Astro', 'TypeScript', 'CSS'],
  outcome: 'Демонстрація структури та інтерфейсу, а не діючий сервіс бронювання реального закладу.',
  coverImage: '/assets/projects/kut-01/desktop.webp', coverThumb: '/assets/projects/kut-01/desktop.webp', mobileImage: '/assets/projects/kut-01/mobile.webp', mobileThumb: '/assets/projects/kut-01/mobile.webp',
  liveUrl: '/demos/kut-01/', featured: true,
};

// Existing slugs and public destinations are retained. KUT/01 is explicitly
// included in the approved redesign; other standalone demos stay separate.
export const portfolio: Project[] = [
  { ...projects.find(project => project.slug === 'beauty-site')!,
    headline: 'Сайт для beauty-студії з каталогом послуг і демо-записом.',
    summary: 'Атмосфера бренду, послуги, галерея та зрозумілий шлях до запису.',
    portfolioStatement: 'Сайт для beauty-студії.',
    overview: 'Поєднати виразну візуальну подачу beauty-студії зі зрозумілим вибором послуг та записом.',
    solution: 'Великі фотографії передають характер бренду. Послуги, роботи й запис розділені на короткі, послідовні кроки.',
    built: ['Каталог послуг', 'Галерея робіт', 'Демо-запис', 'Адаптивна мобільна версія'],
  },
  kut,
  { ...projects.find(project => project.slug === 'carpathian-retreat')!,
    title: 'Obrys Retreat', portfolioTitle: 'Obrys Retreat',
    headline: 'Сайт гірського ретриту з демо-планувальником перебування.',
    summary: 'Архітектура, атмосфера Карпат і зрозумілий шлях до вибору відпочинку.',
    portfolioStatement: 'Сайт гірського ретриту.',
    overview: 'Передати атмосферу гірського простору й допомогти відвідувачу перейти від перегляду до вибору проживання.',
    solution: 'Фотографії, архітектура й варіанти проживання поєднані з демо-планувальником: дати, гості та додаткові опції.',
    built: ['Варіанти проживання', 'Галерея простору', 'Демо-планувальник', 'Мобільна версія'],
  },
  { ...projects.find(project => project.slug === 'booking-bot')!,
    headline: 'Telegram-бот для запису клієнтів.',
    summary: 'Вибір послуги, спеціаліста й часу та керування записами в одному чаті.',
    portfolioStatement: 'Запис клієнтів у Telegram.',
    overview: 'Показати зрозумілий сценарій запису в Telegram: від вибору послуги до підтвердження та керування бронюванням.',
    solution: 'Короткі кроки й кнопки замість довгої переписки. Клієнт обирає послугу, спеціаліста, дату й доступний час.',
    coverImage: '/assets/projects/booking-bot/booking-bot-cover.webp', coverThumb: '/assets/projects/booking-bot/booking-bot-cover.webp', mobileImage: '/assets/projects/booking-bot/booking-bot-mobile.webp', mobileThumb: '/assets/projects/booking-bot/booking-bot-mobile.webp',
    built: ['Вибір послуги та спеціаліста', 'Доступні дати й час', 'Перегляд і скасування записів', 'Нагадування'],
    caseScreenshots: projects.find(project => project.slug === 'booking-bot')!.caseScreenshots?.map(shot => ({ ...shot, src: shot.src.replace(/\.png$/, '.webp') })),
  },
];

export const portfolioFilters = ['Усі', 'Вебсайти', 'Telegram', 'Автоматизація'];
export const nextPortfolioProject = (slug: string) => portfolio[(portfolio.findIndex(project => project.slug === slug) + 1) % portfolio.length];
export const projectLabel = (project: Project) => project.status === 'Концепт-проєкт' ? 'Демо-концепт' : 'Власний продукт · демо';
