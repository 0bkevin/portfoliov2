import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string())
  }),
});


const projectCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    pubYear: z.coerce.date(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
};

