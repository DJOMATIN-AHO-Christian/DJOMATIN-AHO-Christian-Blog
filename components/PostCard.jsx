import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { grpahCMSImageLoader } from '../util';

const PostCard = ({ post }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="py-8 border-b border-notion-border/20 last:border-b-0"
  >
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <Link href={`/post/${post.slug}`}>
        <div className="relative overflow-hidden rounded-xl flex-none w-full md:w-64 h-40 cursor-pointer">
          <Image
            loader={grpahCMSImageLoader}
            src={post.featuredImage.url}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex-grow flex flex-col pt-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[12px] font-medium text-notion-secondary">
            {moment(post.createdAt).format('MMM DD, YYYY')}
          </span>
          <span className="text-notion-border select-none">·</span>
          <span className="text-[12px] font-medium text-notion-secondary">
            {post.author.name}
          </span>
        </div>

        <h2 className="text-left mb-3 cursor-pointer hover:opacity-70 transition-opacity text-[17px] font-semibold text-notion-text leading-snug">
          <Link href={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-left text-[17px] text-notion-secondary font-normal mb-5 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <Link href={`/post/${post.slug}`}>
          <span className="text-[12px] font-semibold text-notion-blue hover:opacity-70 transition-opacity cursor-pointer">
            Read More →
          </span>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default PostCard;
