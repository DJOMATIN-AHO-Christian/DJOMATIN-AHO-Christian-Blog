import Head from 'next/head';
import { FeaturedPosts } from '../sections/index';
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts, getFeaturedPosts, getCategories, getRecentPosts } from '../services';

const SITE_URL = 'https://djomatin-aho-christian-blog.netlify.app';

export default function Home({ posts, featuredPosts, categories, recentPosts }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'DJOMATIN AHO Christian Blog',
        description: 'Blog personnel de DJOMATIN AHO Christian — articles sur la technologie, le développement web, l\'IA et l\'innovation numérique.',
        publisher: {
          '@type': 'Person',
          name: 'DJOMATIN AHO Christian',
        },
        inLanguage: 'fr',
      },
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/#blog`,
        url: SITE_URL,
        name: 'DJOMATIN AHO Christian Blog',
        description: 'Articles et tutoriels sur le développement web, l\'intelligence artificielle et les technologies modernes.',
        author: {
          '@type': 'Person',
          name: 'DJOMATIN AHO Christian',
        },
        inLanguage: 'fr',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>DJOMATIN AHO Christian Blog — Technologie, Développement et IA</title>
        <meta name="description" content="Blog personnel de DJOMATIN AHO Christian. Découvrez des articles sur le développement web, l'intelligence artificielle, le machine learning et les dernières innovations technologiques." />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="DJOMATIN AHO Christian Blog — Technologie, Développement et IA" />
        <meta property="og:description" content="Blog personnel de DJOMATIN AHO Christian. Articles sur le développement web, l'IA et l'innovation numérique." />
        <meta property="og:site_name" content="DJOMATIN AHO Christian Blog" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DJOMATIN AHO Christian Blog" />
        <meta name="twitter:description" content="Articles sur le développement web, l'IA et l'innovation numérique par DJOMATIN AHO Christian." />

        {/* JSON-LD Structured Data (SEO + GEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="container mx-auto px-10 mb-8">
        <FeaturedPosts posts={featuredPosts} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget relatedPosts={recentPosts} />
              <Categories categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  const featuredPosts = (await getFeaturedPosts()) || [];
  const categories = (await getCategories()) || [];
  const recentPosts = (await getRecentPosts()) || [];

  return {
    props: { posts, featuredPosts, categories, recentPosts },
    revalidate: 60,
  };
}
