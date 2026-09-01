import { site } from '@/content/site';
import { withBase } from '@/lib/paths';

export type JsonLd = Record<string, unknown>;
export type PageSchemaType = 'WebPage' | 'CollectionPage' | 'ContactPage' | 'AboutPage';

export const absoluteUrl = (path: string | URL) => (
  path instanceof URL ? path.toString() : new URL(withBase(path), site.url).toString()
);

export function buildBaseSchema({
  canonical,
  title,
  description,
  image,
  pageType,
}: {
  canonical: string;
  title: string;
  description: string;
  image: string;
  pageType: PageSchemaType;
}): JsonLd[] {
  const organizationId = absoluteUrl('/#organization');
  const websiteId = absoluteUrl('/#website');
  const imageUrl = absoluteUrl(image);
  const sameAs = [site.telegram, site.github].filter(Boolean);

  return [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: site.name,
      url: absoluteUrl('/'),
      description: site.description,
      email: site.email,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/favicon.svg'),
      },
      image: absoluteUrl(site.ogImage),
      areaServed: {
        '@type': 'Country',
        name: 'Україна',
      },
      knowsAbout: ['Розробка вебсайтів', 'UX/UI дизайн', 'Telegram-боти', 'Автоматизація бізнес-процесів'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Послуги OKK Works',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Розробка вебсайтів' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Розробка Telegram-ботів' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Автоматизація бізнес-процесів' } },
        ],
      },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: absoluteUrl('/'),
      name: site.name,
      description: site.description,
      inLanguage: site.language,
      publisher: { '@id': organizationId },
    },
    {
      '@type': pageType,
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: site.language,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
    },
  ];
}
