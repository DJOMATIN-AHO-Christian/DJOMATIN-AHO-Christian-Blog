import { getPosts, getCategories } from '../services';

const SITE_URL = 'https://djomatin-aho-christian-blog.netlify.app';

function generateSiteMap(posts, categories) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
            .map(({ node }) => `
  <url>
    <loc>${SITE_URL}/post/${node.slug}</loc>
    <lastmod>${new Date(node.createdAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${node.featuredImage?.url ? `<image:image>
      <image:loc>${node.featuredImage.url}</image:loc>
      <image:title>${node.title}</image:title>
    </image:image>` : ''}
  </url>`)
            .join('')}
  ${categories
            .map((cat) => `
  <url>
    <loc>${SITE_URL}/category/${cat.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`)
            .join('')}
</urlset>`;
}

function SiteMap() {
    // This component is never rendered
    return null;
}

export async function getServerSideProps({ res }) {
    const posts = (await getPosts()) || [];
    const categories = (await getCategories()) || [];

    const sitemap = generateSiteMap(posts, categories);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return { props: {} };
}

export default SiteMap;
