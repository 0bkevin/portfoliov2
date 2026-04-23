const SITE_URL = "https://www.kevinbravo.com";
const SITE_NAME = "Kevin Bravo";
const SITE_TITLE = "Kevin Bravo — Software Engineer";
const SITE_DESCRIPTION =
  "Kevin Bravo is a software engineer building production-ready backend, infrastructure, and blockchain systems.";
const DEFAULT_OG_IMAGE = "/assets/main_photo.jpg";
const DEFAULT_LOCALE = "en_US";
const TWITTER_HANDLE = "@0bkevin";

export const seoConfig = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
  siteTitle: SITE_TITLE,
  siteDescription: SITE_DESCRIPTION,
  defaultOgImage: DEFAULT_OG_IMAGE,
  defaultLocale: DEFAULT_LOCALE,
  twitterHandle: TWITTER_HANDLE,
  author: {
    name: "Kevin Bravo",
    url: `${SITE_URL}/me/ama`,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/0bkevin",
      "https://www.linkedin.com/in/0bkevin/",
      "https://twitter.com/0bkevin",
    ],
  },
} as const;

export type SchemaValue = Record<string, unknown>;

export interface BaseSeoInput {
  title?: string | undefined;
  description?: string | undefined;
  canonical?: string | URL | undefined;
  image?: string | null | undefined;
  type?: "website" | "article" | "profile" | undefined;
  noindex?: boolean | undefined;
  publishedTime?: Date | string | undefined;
  modifiedTime?: Date | string | undefined;
  section?: string | undefined;
  tags?: string[] | undefined;
}

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

const normalizeDate = (value?: Date | string) => {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

export const toAbsoluteUrl = (value?: string | URL | null) => {
  if (!value) return undefined;
  const normalized = value instanceof URL ? value.toString() : value;
  return isAbsoluteUrl(normalized)
    ? normalized
    : new URL(normalized, SITE_URL).toString();
};

export const getCanonicalUrl = (
  pathname?: string,
  explicitCanonical?: string | URL,
) => {
  if (explicitCanonical) return toAbsoluteUrl(explicitCanonical);
  if (!pathname) return SITE_URL;
  return new URL(pathname, SITE_URL).toString();
};

export const resolveSeo = ({
  title,
  description,
  canonical,
  image,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  pathname,
}: BaseSeoInput & { pathname?: string | undefined }) => {
  const absoluteCanonical = getCanonicalUrl(pathname, canonical);

  const absoluteImage = toAbsoluteUrl(image || DEFAULT_OG_IMAGE);
  const normalizedPublished = normalizeDate(publishedTime);
  const normalizedModified = normalizeDate(modifiedTime);

  return {
    title: title || SITE_TITLE,
    description: description || SITE_DESCRIPTION,
    canonical: absoluteCanonical,
    image: absoluteImage,
    type,
    robots: noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large",
    openGraph: {
      title: title || SITE_TITLE,
      description: description || SITE_DESCRIPTION,
      url: absoluteCanonical,
      type,
      image: absoluteImage,
      locale: DEFAULT_LOCALE,
      siteName: SITE_NAME,
      publishedTime: normalizedPublished,
      modifiedTime: normalizedModified,
      section,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: title || SITE_TITLE,
      description: description || SITE_DESCRIPTION,
      image: absoluteImage,
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
  };
};

export const createPersonSchema = (
  overrides: Partial<SchemaValue> = {},
): SchemaValue => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: seoConfig.author.name,
  url: seoConfig.author.url,
  image: seoConfig.author.image,
  jobTitle: seoConfig.author.jobTitle,
  sameAs: [...seoConfig.author.sameAs],
  ...overrides,
});

export const createWebsiteSchema = (
  overrides: Partial<SchemaValue> = {},
): SchemaValue => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Person",
    name: seoConfig.author.name,
    url: seoConfig.author.url,
  },
  ...overrides,
});

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  image?: string | null | undefined;
  datePublished: Date | string;
  dateModified?: Date | string | undefined;
  authorName?: string | undefined;
  authorUrl?: string | undefined;
  keywords?: string[] | undefined;
  inLanguage?: string | undefined;
}

export const createArticleSchema = ({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = seoConfig.author.name,
  authorUrl = seoConfig.author.url,
  keywords = [],
  inLanguage = "en",
}: ArticleSchemaInput): SchemaValue => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline,
  description,
  mainEntityOfPage: toAbsoluteUrl(url),
  url: toAbsoluteUrl(url),
  image: toAbsoluteUrl(image || DEFAULT_OG_IMAGE),
  datePublished: normalizeDate(datePublished),
  dateModified: normalizeDate(dateModified || datePublished),
  inLanguage,
  keywords,
  author: {
    "@type": "Person",
    name: authorName,
    url: authorUrl,
  },
  publisher: {
    "@type": "Person",
    name: seoConfig.author.name,
    url: seoConfig.author.url,
    image: {
      "@type": "ImageObject",
      url: seoConfig.author.image,
    },
  },
});

export interface ProjectSchemaInput {
  name: string;
  description: string;
  url: string;
  image?: string | null | undefined;
  datePublished?: Date | string | undefined;
  programmingLanguage?: string[] | undefined;
  keywords?: string[] | undefined;
  codeRepository?: string | undefined;
  demoUrl?: string | undefined;
}

export const createProjectSchema = ({
  name,
  description,
  url,
  image,
  datePublished,
  programmingLanguage = [],
  keywords = [],
  codeRepository,
  demoUrl,
}: ProjectSchemaInput): SchemaValue => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name,
  description,
  url: toAbsoluteUrl(url),
  image: toAbsoluteUrl(image || DEFAULT_OG_IMAGE),
  creator: {
    "@type": "Person",
    name: seoConfig.author.name,
    url: seoConfig.author.url,
  },
  author: {
    "@type": "Person",
    name: seoConfig.author.name,
    url: seoConfig.author.url,
  },
  datePublished: normalizeDate(datePublished),
  keywords,
  programmingLanguage,
  codeRepository: toAbsoluteUrl(codeRepository),
  workExample: demoUrl ? toAbsoluteUrl(demoUrl) : undefined,
});

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export const createBreadcrumbSchema = (
  items: BreadcrumbItem[],
): SchemaValue => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.name,
    item: toAbsoluteUrl(entry.item),
  })),
});

export const stringifySchema = (schema: SchemaValue | SchemaValue[]) =>
  JSON.stringify(schema, null, 2);
