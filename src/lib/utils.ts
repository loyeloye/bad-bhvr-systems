export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export const SITE = {
  name: 'Bad Bhvr Systems',
  tagline: 'Good businesses run on Bad Behaviour.',
  url: 'https://badbhvr.com',
  email: 'hello@badbhvr.com',
  whatsapp: '+2348106981030',
  whatsappLink: 'https://wa.me/2348106981030',
  bookingCTA: 'Book a Working Session',
  social: {
    twitter: 'https://twitter.com/badbhvrsystems',
    linkedin: 'https://linkedin.com/company/badbhvrsystems',
    instagram: 'https://instagram.com/badbhvrsystems',
  },
};
