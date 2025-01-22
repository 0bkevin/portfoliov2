import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blogs');

  return rss({
    // `<title>` field in output xml
    title: '0b',
    // `<description>` field in output xml
    description: 'Read about software development, maths, blockchain, security and embebed syst',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/0b/${post.id}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
    link: `/0b/${post.id}/`,
    stylesheet: '/rss/styles.xsl',

  });
}