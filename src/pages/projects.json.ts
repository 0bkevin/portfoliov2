import { getCollection, type CollectionEntry } from "astro:content";
import { seoConfig } from "@lib/seo";

export async function GET() {
  const projects = (await getCollection("projects")) as CollectionEntry<"projects">[];

  const body = projects
    .sort((a, b) => Number(b.data.pubYear) - Number(a.data.pubYear))
    .map((project) => ({
      title: project.data.title,
      description: project.data.description,
      url: `${seoConfig.siteUrl}/projects/${project.id}`,
      year: project.data.pubYear.getFullYear(),
      role: project.data.role,
      technologies: project.data.technologies ?? project.data.tags,
      demoUrl: project.data.demoUrl,
      repositoryUrl: project.data.repoUrl,
      status: project.data.status ?? "case-study",
    }));

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}
