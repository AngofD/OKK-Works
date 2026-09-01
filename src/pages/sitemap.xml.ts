import type { APIRoute } from 'astro';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { withBase } from '@/lib/paths';

const staticRoutes = ['', 'work/', 'contact/', 'privacy/'];

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export const GET: APIRoute = () => {
  const staticUrls = staticRoutes.map((route) => (
    `  <url><loc>${new URL(withBase(route ? `/${route}` : '/'), site.url)}</loc></url>`
  ));
  const projectUrls = projects.map((project) => {
    const url = new URL(withBase(`/work/${project.slug}/`), site.url);
    const image = new URL(withBase(project.coverImage), site.url);
    return `  <url><loc>${url}</loc><image:image><image:loc>${image}</image:loc><image:title>${escapeXml(project.title)}</image:title></image:image></url>`;
  });
  const urls = [...staticUrls, ...projectUrls].join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } },
  );
};
