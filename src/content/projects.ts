export type ProjectCategory = 'Вебсайти' | 'Telegram' | 'Автоматизація';
export type ProjectStatus = 'Опубліковано' | 'Концепт-проєкт';

export interface ProjectCaseNote {
  title: string;
  copy: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  status: ProjectStatus;
  displayUrl: string;
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
  caseNotes?: ProjectCaseNote[];
  caseScreenshots?: ProjectScreenshot[];
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
    displayUrl: 'okk.works',
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
  {
    slug: 'beauty-site',
    title: 'MOVA Beauty Site',
    category: 'Вебсайти',
    year: '2026',
    status: 'Концепт-проєкт',
    displayUrl: 'mova.demo',
    headline: 'Showcase-сайт fictional beauty studio з editorial mood, каталогом послуг і demo-записом.',
    summary: 'Концепт-проєкт premium beauty studio: артдирекшн, каталог послуг, галерея робіт і покроковий booking UX без фальшивого live URL.',
    overview: 'MOVA створений як окремий showcase-проєкт, щоб показати, як може виглядати сильний beauty-сайт із чітким сервісним сценарієм. Це не сайт реального клієнта, а демонстрація підходу до бренду, структури й інтерфейсу.',
    challenge: 'Побудувати емоційний editorial-образ, але не втратити комерційну ясність: користувач має швидко зрозуміти напрям студії, побачити послуги, переглянути роботи й дійти до запису без зайвих кроків.',
    solution: 'Концепцію зібрано навколо спокійної premium-естетики, великих типографічних акцентів і коротких сценаріїв. Окремі сторінки послуг, галереї та запису працюють як послідовна воронка: враження, вибір, підтвердження наміру.',
    built: ['Cinematic hero для fictional brand MOVA', 'Сторінка послуг із категоріями, тривалістю та demo-цінами', 'Editorial gallery із роботами, простором і майстрами', 'Шестикроковий booking flow у demo-режимі', 'Окрема mobile-композиція для головних сценаріїв'],
    capabilities: ['Артдирекшн і брендова подача', 'UX/UI дизайн', 'Каталог послуг', 'Booking experience', 'Responsive frontend'],
    technologies: ['Astro', 'TypeScript', 'Семантичний HTML', 'Сучасний CSS', 'Клієнтський JavaScript для booking flow'],
    outcome: 'Проєкт показує, як OKK Works підходить до showcase-продуктів і комерційних сайтів у сфері сервісного бізнесу. Це демонстраційний кейс без вигаданих клієнтів, метрик чи відгуків, але з повноцінною структурою, мобільною версією й робочим UX запису.',
    coverImage: '/assets/projects/beauty-site/beauty-site-desktop.webp',
    coverThumb: '/assets/projects/beauty-site/beauty-site-desktop-card.webp',
    mobileImage: '/assets/projects/beauty-site/beauty-site-mobile.webp',
    mobileThumb: '/assets/projects/beauty-site/beauty-site-mobile-card.webp',
    caseNotes: [
      {
        title: 'Задача й концепція',
        copy: 'Проєкт побудовано як showcase для hypothetical beauty studio в Києві. Мета - показати, як поєднати атмосферний бренд-образ із чітким сервісним сайтом, де користувач розуміє пропозицію без довгого читання.',
      },
      {
        title: 'Art direction',
        copy: 'Візуальна система спирається на теплі нейтральні поверхні, глибокий brown/ink контраст, editorial serif для акцентів і стриманий sans для UI. Усе працює на відчуття спокою, тактильності та premium-сервісу без крикливого luxury.',
      },
      {
        title: 'UX послуг і галереї',
        copy: 'Каталог послуг одразу показує категорію, тривалість, description і ціну, а галерея допомагає підтвердити стиль студії через роботи, матеріали й простір. Так користувач отримує не абстрактну обіцянку, а зрозумілий доказ рівня подачі.',
      },
      {
        title: 'Booking experience',
        copy: 'Окремий demo-flow веде через вибір послуги, майстра, дати, часу та контактів. Це не декоративний mockup, а функціональний сценарій майбутнього запису, який показує логіку production-рішення без реального відправлення даних.',
      },
      {
        title: 'Responsive/mobile',
        copy: 'Mobile-версія не стискає desktop-макет, а перебудовує ієрархію під вузький екран: інша подача hero, зручні CTA, компактний booking summary і коротші шляхи до ключових дій.',
      },
      {
        title: 'Технічна реалізація',
        copy: 'Сайт побудовано як окремий Astro-проєкт із data-driven контентом, статичною генерацією та легким клієнтським JavaScript тільки там, де це потрібно для booking UX. Це тримає швидкість, спрощує підтримку й робить showcase придатним до подальшого розвитку.',
      },
    ],
    caseScreenshots: [
      {
        src: '/assets/projects/beauty-site/beauty-site-services.webp',
        alt: 'Сторінка послуг MOVA з великим typographic hero та каталогом категорій',
        width: 1440,
        height: 900,
      },
      {
        src: '/assets/projects/beauty-site/beauty-site-gallery.webp',
        alt: 'Gallery page MOVA з editorial-подачею робіт і візуального стилю',
        width: 1440,
        height: 900,
      },
      {
        src: '/assets/projects/beauty-site/beauty-site-booking.webp',
        alt: 'Desktop booking UI MOVA з progress-етапами та summary вибору',
        width: 1440,
        height: 900,
      },
      {
        src: '/assets/projects/beauty-site/beauty-site-booking-mobile.webp',
        alt: 'Mobile booking screen MOVA з hero та компактним summary',
        width: 390,
        height: 844,
      },
    ],
    featured: true,
  },
];

export const categories = ['Усі', 'Вебсайти', 'Telegram', 'Автоматизація'] as const;

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
