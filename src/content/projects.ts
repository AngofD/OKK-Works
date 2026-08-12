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
  portfolioTitle?: string;
  portfolioStatement?: string;
  portfolioDescription?: string;
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
    slug: 'beauty-site',
    title: 'MOVA Beauty',
    category: 'Вебсайти',
    year: '2026',
    status: 'Концепт-проєкт',
    displayUrl: 'mova.demo',
    portfolioTitle: 'MOVA Beauty',
    portfolioStatement: 'Сайт premium beauty studio.',
    portfolioDescription: 'Демонстраційний сайт для сервісного бізнесу: атмосфера бренду, послуги, галерея й зрозумілий шлях до запису.',
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
  {
    slug: 'carpathian-retreat',
    title: 'Carpathian Retreat',
    category: 'Вебсайти',
    year: '2026',
    status: 'Концепт-проєкт',
    displayUrl: 'obrys.demo',
    portfolioStatement: 'Cinematic website для гірського retreat.',
    portfolioDescription: 'Showcase-проєкт для premium hospitality: атмосфера Карпат, архітектура, простори для проживання й зрозумілий сценарій планування перебування.',
    headline: 'Концепт-сайт гірського retreat з кінематографічною подачею, архітектурним сторітелінгом і booking UX.',
    summary: 'Showcase-проєкт для premium mountain retreat: cinematic hero, простори проживання, галерея, маршрут до вибору дат і демо-планувальник перебування.',
    overview: 'Carpathian Retreat створений як окремий showcase-проєкт на базі локального сайту ОБРИС. Це не комерційний клієнтський кейс, а демонстрація того, як OKK Works може подати premium hospitality продукт: місце, архітектуру, емоцію й практичний шлях до бронювання.',
    challenge: 'Потрібно було поєднати повільну атмосферу гірського простору з чіткою комерційною структурою, щоб сайт не перетворився лише на красиву галерею і водночас не втратив відчуття преміального retreat.',
    solution: 'Сайт побудовано навколо великого cinematic hero, розділів про простори, архітектуру, враження та планування перебування. Візуальна мова спирається на гори, туман, дерево, камінь і панорамне світло, а UX веде від першого враження до вибору простору й дат.',
    built: ['Cinematic landing для fictional mountain retreat ОБРИС', 'Презентація просторів проживання з окремими сторінками', 'Галерея місця, архітектури й деталей', 'Demo stay planner із датами, гостями й додатковими опціями', 'Адаптивна desktop/mobile подача для емоційного першого контакту'],
    capabilities: ['Артдирекшн для hospitality', 'UX/UI дизайн', 'Booking UX', 'Контент-архітектура', 'Responsive frontend'],
    technologies: ['Astro', 'TypeScript', 'Семантичний HTML', 'Сучасний CSS', 'Статична генерація'],
    outcome: 'Проєкт показує, як можна презентувати premium hospitality experience без вигаданих метрик, клієнтської історії чи комерційних результатів. Фокус - на сильному першому екрані, зрозумілій структурі, мобільній композиції та маршруті до планування перебування.',
    coverImage: '/assets/projects/carpathian-retreat/carpathian-retreat-desktop.webp',
    coverThumb: '/assets/projects/carpathian-retreat/carpathian-retreat-desktop-card.webp',
    mobileImage: '/assets/projects/carpathian-retreat/carpathian-retreat-mobile.webp',
    mobileThumb: '/assets/projects/carpathian-retreat/carpathian-retreat-mobile-card.webp',
    caseNotes: [
      {
        title: 'Showcase context',
        copy: 'ОБРИС подано як fictional mountain retreat. Кейс чесно показує підхід до premium hospitality сайту без вигаданого клієнта, відгуків або бізнес-метрик.',
      },
      {
        title: 'Візуальна система',
        copy: 'Подача тримається на контрасті холодних карпатських пейзажів, теплого інтер’єру, великої serif-типографіки та стриманих UI-дій. Це створює відчуття тиші, приватності й архітектурного масштабу.',
      },
      {
        title: 'Booking UX',
        copy: 'Планувальник перебування демонструє практичний сценарій: дати, кількість гостей, вибір простору й додаткові опції. Це допомагає показати не тільки mood, а й майбутню комерційну логіку сайту.',
      },
      {
        title: 'Mobile experience',
        copy: 'На мобільному екрані hero, CTA та навігація перебудовані під швидке рішення: користувач бачить атмосферу, одразу має дію і може перейти до вибору простору або дат без зайвого пошуку.',
      },
    ],
    caseScreenshots: [
      {
        src: '/assets/projects/carpathian-retreat/carpathian-retreat-architecture.webp',
        alt: 'Desktop-секція Carpathian Retreat про архітектуру з інтер’єром, каменем і описом матеріалів',
        width: 1440,
        height: 900,
      },
      {
        src: '/assets/projects/carpathian-retreat/carpathian-retreat-gallery.webp',
        alt: 'Desktop-галерея Carpathian Retreat з фотографіями гірського простору та інтер’єру',
        width: 1440,
        height: 900,
      },
      {
        src: '/assets/projects/carpathian-retreat/carpathian-retreat-planner.webp',
        alt: 'Desktop stay planner Carpathian Retreat із вибором дат і параметрів перебування',
        width: 1440,
        height: 1338,
      },
      {
        src: '/assets/projects/carpathian-retreat/carpathian-retreat-planner-mobile.webp',
        alt: 'Mobile stay planner Carpathian Retreat із demo-бронюванням',
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
