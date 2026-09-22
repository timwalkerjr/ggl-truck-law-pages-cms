import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    toc: z.boolean().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/team' }),
  schema: z.object({
    title: z.string(),
    jobTitle: z.string(),
    image: z.string(),
    imageAlt: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const publishing = { order: z.number().default(0), draft: z.boolean().default(false) };
const verdicts = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/verdicts' }),
  schema: z.object({ title: z.string().min(1), amount: z.string().min(1), venue: z.string(), type: z.string().default(''), detail: z.string().min(1), status: z.string().min(1), featured: z.boolean().default(false), ...publishing }),
});
const faq = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faq' }),
  schema: z.object({title: z.string().min(1), answer: z.string().min(1), ...publishing}),
});
const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    title: z.string().min(1), seoTitle: z.string().min(1), description: z.string().min(1),
    eyebrow: z.string(), heading: z.string().min(1), headingAccent: z.string(), intro: z.string().min(1),
    image: z.string(), imageAlt: z.string(),
    analysisPoints: z.array(z.object({title: z.string(), detail: z.string()})).default([]),
    detailHeading: z.string(), detailHeadingAccent: z.string(), detail: z.string(),
    bullets: z.array(z.string()).default([]), imageCaption: z.string(), ...publishing,
  }),
});
export const collections = { blog, team, verdicts, faq, services };
