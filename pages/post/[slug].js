import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, SkeletonPostDetail } from '../../components';
import { getPosts, getPostDetails, getCategories, getAdjacentPosts, getSimilarPosts } from '../../services';
import { AdjacentPosts } from '../../sections';

const SITE_URL = 'https://djomatin-aho-christian-blog.netlify.app';

const PostDetails = ({ post, categories, adjacentPosts, relatedPosts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <SkeletonPostDetail />;
  }

  if (!post) {
    return null;
  }

  const categoriesArr = Array.isArray(post.categories) ? post.categories : [post.categories].filter(Boolean);
  const postUrl = `${SITE_URL}/post/${post.slug}`;

  // Schema.org Article + Person + Organization (SEO + AEO + GEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${postUrl}/#article`,
        url: postUrl,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.createdAt,
        dateModified: post.createdAt,
        image: post.featuredImage?.url,
        inLanguage: 'fr',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#author`,
          name: post.author?.name || 'DJOMATIN AHO Christian',
          image: post.author?.photo?.url,
          url: SITE_URL,
          sameAs: [
            'https://github.com/DJOMATIN-AHO-Christian',
          ],
        },
        publisher: {
          '@type': 'Organization',
          name: 'DJOMATIN AHO Christian Blog',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/favicon.ico`,
          },
        },
        isAccessibleForFree: true,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.notion-content', 'h1'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{post.title} — DJOMATIN AHO Christian Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={postUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.featuredImage?.url && <meta property="og:image" content={post.featuredImage.url} />}
        <meta property="og:site_name" content="DJOMATIN AHO Christian Blog" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:author" content="DJOMATIN AHO Christian" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.featuredImage?.url && <meta name="twitter:image" content={post.featuredImage.url} />}

        {/* JSON-LD Structured Data (SEO + AEO + GEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts adjacentPosts={adjacentPosts} />
            <CommentsForm slug={post.slug} id={post.id} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={categoriesArr.map((category) => category.slug)} relatedPosts={relatedPosts} />
              <Categories categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  const categories = (await getCategories()) || [];

  if (!data) {
    return {
      notFound: true,
    };
  }

  const adjacentPosts = await getAdjacentPosts(data.createdAt, data.slug);
  const categoriesArr = Array.isArray(data.categories) ? data.categories : [data.categories].filter(Boolean);
  const relatedPosts = await getSimilarPosts(categoriesArr.map((category) => category.slug), data.slug);

  return {
    props: {
      post: data,
      categories,
      adjacentPosts: {
        next: adjacentPosts.next || null,
        previous: adjacentPosts.previous || null,
      },
      relatedPosts: relatedPosts || [],
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
