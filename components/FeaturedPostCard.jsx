import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FeaturedPostCard = ({ post }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -3 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="relative flex flex-col h-full rounded-2xl overflow-hidden bg-notion-bg group cursor-pointer border border-notion-border/20 hover:border-notion-border/40 transition-all duration-300 shadow-sm hover:shadow-md"
  >
    {/* Image with Depth layer */}
    <div className="relative aspect-video w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Content */}
    <div className="flex flex-col p-6 flex-grow">
      <p className="text-[12px] font-medium text-notion-secondary mb-2">
        {moment(post.createdAt).format('MMMM DD, YYYY')}
      </p>
      <h3 className="text-notion-text font-semibold text-[17px] leading-snug mb-4 line-clamp-2">
        {post.title}
      </h3>
      <div className="mt-auto flex items-center gap-2 pt-4 border-t border-notion-border/15">
        <div className="relative w-5 h-5 rounded-full overflow-hidden">
          <Image
            unoptimized
            alt={post.author.name}
            layout="fill"
            objectFit="cover"
            src={post.author.photo.url}
          />
        </div>
        <p className="text-[12px] text-notion-secondary font-medium">{post.author.name}</p>
      </div>
    </div>

    <Link href={`/post/${post.slug}`}>
      <span className="absolute inset-0 z-20" />
    </Link>
  </motion.div>
);

export default FeaturedPostCard;
