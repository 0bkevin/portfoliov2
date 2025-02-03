import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('blogs');

  return rss({
    // `<title>` field in output xml
    title: '0b Blog',
    // `<description>` field in output xml
    description: 'Read about software development, maths, blockchain, security and embebed syst',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    trailingSlash: false,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post) => {
      return ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/0b/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
  })}),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}