import { Template } from './types';

/**
 * Available site templates with keywords for matching
 */
export const templates: Template[] = [
  {
    name: 'portfolio',
    description: 'For photographers, artists, designers, and creatives',
    components: ['header', 'hero', 'gallery', 'about', 'contact', 'footer'],
    keywords: ['portfolio', 'photographer', 'artist', 'designer', 'creative', 'gallery', 'work', 'projects'],
  },
  {
    name: 'event',
    description: 'For weddings, conferences, parties, and gatherings',
    components: ['header', 'hero', 'details', 'schedule', 'rsvp', 'venue', 'footer'],
    keywords: ['wedding', 'event', 'conference', 'party', 'celebration', 'rsvp', 'invitation'],
  },
  {
    name: 'restaurant',
    description: 'For restaurants, cafes, bars, and food businesses',
    components: ['header', 'hero', 'menu', 'hours', 'location', 'reservations', 'footer'],
    keywords: ['restaurant', 'cafe', 'bar', 'food', 'menu', 'dining', 'bistro', 'kitchen'],
  },
  {
    name: 'service',
    description: 'For consultants, freelancers, and service providers',
    components: ['header', 'hero', 'services', 'pricing', 'testimonials', 'contact', 'footer'],
    keywords: ['service', 'consultant', 'freelance', 'agency', 'professional', 'business'],
  },
  {
    name: 'landing',
    description: 'For product launches, apps, and SaaS',
    components: ['header', 'hero', 'features', 'pricing', 'cta', 'footer'],
    keywords: ['product', 'app', 'saas', 'launch', 'startup', 'software', 'landing'],
  },
  {
    name: 'personal',
    description: 'For personal sites, resumes, and link-in-bio',
    components: ['header', 'hero', 'about', 'links', 'contact', 'footer'],
    keywords: ['personal', 'resume', 'bio', 'about me', 'links', 'profile'],
  },
];

/**
 * Detect the best template for a given prompt
 */
export function detectTemplate(prompt: string): Template {
  const promptLower = prompt.toLowerCase();
  
  let bestMatch: Template = templates[templates.length - 1]; // Default to personal
  let bestScore = 0;
  
  for (const template of templates) {
    let score = 0;
    for (const keyword of template.keywords) {
      if (promptLower.includes(keyword)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = template;
    }
  }
  
  return bestMatch;
}
