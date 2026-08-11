import type { APIRoute } from 'astro';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { withBase } from '@/lib/paths';

const staticRoutes = ['', 'work/', 'contact/', 'privacy/'];

export const GET: APIRoute = () => {
  const routes = [
    ...staticRoutes,
    ...projects.map((project) => `work/${project.slug}/`),
  ];
  const urls = routes
    .map((route) => `  <url><loc>${new URL(withBase(route ? `/${route}` : '/'), site.url)}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
