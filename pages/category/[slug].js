import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, SkeletonPostCard } from '../../components';

const CategoryPost = ({ posts, categories }) => {
  const router = useRouter();
  const categoryName = router.query.slug ? router.query.slug.charAt(0).toUpperCase() + router.query.slug.slice(1) : '';

  if (router.isFallback) {
    return (
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {[1, 2, 3].map((i) => <SkeletonPostCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{categoryName} — DJOMATIN AHO Christian Blog</title>
        <meta name="description" content={`Découvrez tous les articles de la catégorie ${categoryName} sur le blog de DJOMATIN AHO Christian.`} />
        <meta property="og:title" content={`${categoryName} — DJOMATIN AHO Christian Blog`} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <Categories categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = (await getCategoryPost(params.slug)) || [];
  const categories = (await getCategories()) || [];

  if (!posts.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts, categories },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
