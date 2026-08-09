export type ProjectCategory = 'Websites' | 'Telegram Bots' | 'Automation';
export type ProjectTheme = 'acid' | 'signal' | 'paper' | 'cobalt';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  status: 'Live' | 'Content pending';
  headline: string;
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  built: string[];
  capabilities: string[];
  outcome: string;
  visualLabel: string;
  theme: ProjectTheme;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'okk-works',
    title: 'OKK Works',
    category: 'Websites',
    year: '2026',
    status: 'Live',
    headline: 'A sharper digital home for an independent product studio.',
    summary: 'Brand system, portfolio architecture, and a fast editorial website built as one coherent product.',
    overview: 'The studio needed a clear digital presence that could explain its offer, present work with confidence, and turn interest into project conversations.',
    challenge: 'Create a premium experience without hiding the practical offer behind visual effects or making unsupported claims.',
    solution: 'A static-first Astro site with a typographic visual system, content-driven case studies, and focused interaction that supports rather than interrupts reading.',
    built: ['Responsive marketing website', 'Structured project content system', 'Reusable case-study templates', 'Accessible motion and navigation'],
    capabilities: ['Art direction', 'Product design', 'Frontend development', 'Content architecture'],
    outcome: 'A production-ready foundation for OKK Works. Performance and quality are verifiable in the build; commercial metrics will be added only when real data is available.',
    visualLabel: 'Studio / 01',
    theme: 'acid',
    liveUrl: 'https://okk.works',
    featured: true,
  },
  {
    slug: 'website-case-study',
    title: 'Website project',
    category: 'Websites',
    year: 'TODO',
    status: 'Content pending',
    headline: 'Reserved for a real website case study.',
    summary: 'Replace this structured placeholder with a real project, scope, imagery, and verified outcome.',
    overview: 'Project content has not been supplied yet. This page demonstrates the presentation structure without inventing a client or result.',
    challenge: 'TODO: describe the real business problem and constraints.',
    solution: 'TODO: document the approved approach and why it was selected.',
    built: ['TODO: primary deliverable', 'TODO: supporting capability', 'TODO: integration or system'],
    capabilities: ['Strategy', 'UX/UI design', 'Development'],
    outcome: 'TODO: add a factual result. Do not add unverified metrics.',
    visualLabel: 'Web / 02',
    theme: 'paper',
    featured: true,
  },
  {
    slug: 'telegram-bot-case-study',
    title: 'Telegram bot project',
    category: 'Telegram Bots',
    year: 'TODO',
    status: 'Content pending',
    headline: 'Reserved for a real Telegram bot case study.',
    summary: 'A ready-to-fill case structure for a bot, its user journey, integrations, and verified value.',
    overview: 'Project content has not been supplied yet. No client identity, performance metric, or testimonial is implied.',
    challenge: 'TODO: describe the workflow or customer problem.',
    solution: 'TODO: explain the bot experience, backend logic, and integrations.',
    built: ['TODO: bot flows', 'TODO: system integration', 'TODO: operations tooling'],
    capabilities: ['Conversation design', 'Bot development', 'API integration'],
    outcome: 'TODO: add an observed outcome or a plain factual delivery note.',
    visualLabel: 'Bot / 03',
    theme: 'signal',
    featured: true,
  },
  {
    slug: 'automation-case-study',
    title: 'Automation project',
    category: 'Automation',
    year: 'TODO',
    status: 'Content pending',
    headline: 'Reserved for a real business automation case study.',
    summary: 'A case-study framework for showing the process, system, and real operational impact.',
    overview: 'Project content has not been supplied yet. This placeholder exists to make future content entry predictable.',
    challenge: 'TODO: describe the repetitive process, bottleneck, or data issue.',
    solution: 'TODO: describe the automated workflow and safeguards.',
    built: ['TODO: workflow automation', 'TODO: admin interface', 'TODO: monitoring or reporting'],
    capabilities: ['Process mapping', 'Systems integration', 'Automation development'],
    outcome: 'TODO: add only measured or directly observed results.',
    visualLabel: 'Ops / 04',
    theme: 'cobalt',
    featured: false,
  },
];

export const categories = ['All', 'Websites', 'Telegram Bots', 'Automation'] as const;

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
