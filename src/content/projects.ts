export type ProjectCategory = 'Вебсайти' | 'Telegram' | 'Автоматизація';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  status: 'Опубліковано';
  headline: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  built: string[];
  capabilities: string[];
  technologies: string[];
  outcome: string;
  coverImage: string;
  coverThumb: string;
  mobileImage: string;
  mobileThumb: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

// Public portfolio contains only confirmed work. New projects should be added
// after their content, links and visuals are ready for publication.
export const projects: Project[] = [
  {
    slug: 'okk-works',
    title: 'OKK Works',
    category: 'Вебсайти',
    year: '2026',
    status: 'Опубліковано',
    headline: 'Нова цифрова присутність для незалежної студії розробки.',
    summary: 'Комерційний сайт студії із чіткою пропозицією, інтерактивним поясненням послуг і системою кейсів.',
    overview: 'OKK Works потрібен був цілісний сайт, який за кілька секунд пояснює послуги, швидко веде до реальних робіт і перетворює зацікавлення на предметну розмову про проєкт.',
    challenge: 'Поєднати сильне перше враження з комерційною ясністю, не перевантажити досвід ефектами та зберегти високу швидкість на мобільних пристроях.',
    solution: 'Ми побудували спокійну кінематографічну систему навколо трьох ключових моментів: атмосферного першого екрана, інтерактивного вибору послуги та великої презентації робіт. Контент і переходи залишили простими, а анімацію - контрольованою.',
    built: ['Адаптивний багатосторінковий сайт', 'Інтерактивна презентація послуг', 'Галерея робіт на основі даних', 'Шаблон професійного кейсу', 'Контактна форма й SEO-основа'],
    capabilities: ['Артдирекшн', 'Продуктовий дизайн', 'Фронтенд-розробка', 'Контент-архітектура', 'Доступність і контроль якості'],
    technologies: ['Astro', 'TypeScript', 'Семантичний HTML', 'Сучасний CSS', 'Статична генерація'],
    outcome: 'Швидка готова до запуску основа, яка зрозуміло презентує студію, показує підтверджені роботи та може зростати разом із портфоліо. Бізнес-метрики будуть додані лише після появи реальних даних.',
    coverImage: '/projects/okk-works-home.webp',
    coverThumb: '/projects/okk-works-home-card.webp',
    mobileImage: '/projects/okk-works-mobile.webp',
    mobileThumb: '/projects/okk-works-mobile-card.webp',
    liveUrl: 'https://okk.works',
    featured: true,
  },
];

export const categories = ['Усі', 'Вебсайти', 'Telegram', 'Автоматизація'] as const;

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
