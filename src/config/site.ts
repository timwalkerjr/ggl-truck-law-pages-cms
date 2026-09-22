export const SITE = {
  name: 'GARCES, GRABLER & LEBROCQ',
  firmName: 'Garces, Grabler & LeBrocq',
  location: {
    city: 'New Brunswick',
    county: 'Middlesex County',
    state: 'NJ',
    region: 'Central Jersey',
    corridors: 'NJ Turnpike Exit 9, Route 1, and Route 18'
  },
  contact: {
    phone: '(888) 620-5852',
    email: 'intake@ggllawyers.com',
    address: '123 Albany Street\nNew Brunswick, NJ 08901'
  },
  theme: {
    accentColor: '351 84% 42%', // GGL red
    accentColorHover: '351 84% 35%'
  },
  title: 'New Brunswick Truck Accident Lawyer | Garces, Grabler & LeBrocq',
  description: 'High-stakes truck accident lawyer in New Brunswick, NJ. Specialist in semi-truck crash litigation, 18-wheeler accidents, and commercial vehicle injury claims across New Jersey.',
  lang: 'en',
  url: import.meta.env.SITE_URL || import.meta.env.URL || 'http://localhost:4321',
  twitterHandle: '@garcesgrabler',
  socials: {
    twitter: 'https://twitter.com/garcesgrabler',
    instagram: 'https://instagram.com/garcesgrabler',
    linkedin: 'https://www.linkedin.com/company/garcesgrabler',
    dribbble: 'https://dribbble.com/garcesgrabler',
  },
} as const;

export type SiteConfig = typeof SITE;
