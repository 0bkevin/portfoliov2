import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**\/*.md", base: "./src/content/blogs" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    tags: z.array(z.string()),
    language: z.enum(['en', 'es']),
    footnote: z.string().optional(),
    // Transform a date string (e.g. "2022-07-08") to a Date object
    updatedDate: z.string().transform((str) => new Date(str)).optional(),
    canonicalURL: z.string().url().optional(),

  }),
});


const projectCollection = defineCollection({
  loader: glob({ pattern: "**\/*.md", base: "./src/content/proyects" }),
  schema: z.object({
    title: z.string(),
    pubYear: z.coerce.date(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string()),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    studyCaseUrl: z.string().optional(),
    language: z.enum(['en', 'es']),
    footnote: z.string().optional(),
  }),
});

const meCollection = defineCollection({
  loader: glob({ pattern: "**\/*.md", base: "./src/content/me" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
  }),
});

export const collections = {
  'blogs': blogCollection,
  'projects': projectCollection,
  'me': meCollection
};

