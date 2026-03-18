import React from 'react';
import { useRouter } from 'next/router';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, SkeletonPostDetail } from '../../components';
import { getPosts, getPostDetails, getCategories, getAdjacentPosts, getSimilarPosts } from '../../services';
import { AdjacentPosts } from '../../sections';

const PostDetails = ({ post, categories, adjacentPosts, relatedPosts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <SkeletonPostDetail />;
  }

  if (!post) {
    return null;
  }

  const categoriesArr = Array.isArray(post.categories) ? post.categories : [post.categories].filter(Boolean);

  return (
    <>
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

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
