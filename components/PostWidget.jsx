import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { grpahCMSImageLoader } from '../util';
import { getSimilarPosts, getRecentPosts } from '../services';
import Skeleton from './Skeleton';

const PostWidget = ({ categories, slug, relatedPosts: initialRelatedPosts }) => {
  const [relatedPosts, setRelatedPosts] = useState(initialRelatedPosts || []);
  const [loading, setLoading] = useState(!initialRelatedPosts);

  useEffect(() => {
    if (!initialRelatedPosts) {
      setLoading(true);
      if (slug) {
        getSimilarPosts(categories, slug).then((result) => {
          setRelatedPosts(result);
          setLoading(false);
        });
      } else {
        getRecentPosts().then((result) => {
          setRelatedPosts(result);
          setLoading(false);
        });
      }
    } else {
      setRelatedPosts(initialRelatedPosts);
      setLoading(false);
    }
  }, [slug, initialRelatedPosts]);

  if (loading) {
    return (
      <div className="bg-notion-card border border-notion-border rounded p-6 mb-8 transition-colors">
        <Skeleton width="100px" height="18px" className="mb-6" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center w-full p-2">
              <div className="w-8 flex-none">
                <Skeleton width="32px" height="32px" borderRadius="4px" />
              </div>
              <div className="flex-grow ml-3">
                <Skeleton width="40px" height="10px" className="mb-1" />
                <Skeleton width="100%" height="14px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent border border-notion-border/20 rounded-2xl p-6 mb-10">
      <h3 className="text-[12px] font-semibold text-notion-secondary uppercase tracking-[0.15em] mb-6 select-none">
        {slug ? 'Related Articles' : 'Recent Posts'}
      </h3>
      <div className="flex flex-col gap-1">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center w-full cursor-pointer p-3 rounded-xl hover:bg-notion-hover transition-colors"
          >
            <div className="w-12 h-12 flex-none relative rounded-lg overflow-hidden">
              <Image
                loader={grpahCMSImageLoader}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                unoptimized
                src={post.featuredImage.url}
              />
            </div>
            <div className="flex-grow ml-4 overflow-hidden">
              <p className="text-notion-secondary text-[12px] font-medium mb-0.5">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <Link href={`/post/${post.slug}`} className="text-[17px] text-notion-text font-medium line-clamp-1 truncate block hover:opacity-70 transition-opacity">
                {post.title}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PostWidget;
