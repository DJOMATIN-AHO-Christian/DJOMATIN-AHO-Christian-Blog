import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AdjacentPostCard = ({ post, position }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="relative flex flex-col h-full w-full group overflow-hidden rounded-lg border border-notion-border bg-notion-card notion-card cursor-pointer transition-colors"
  >
    <div className="relative h-44 w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
      />
      <div
        className={[
          'absolute top-4 z-30 opacity-80 bg-notion-card/80 backdrop-blur-sm',
          'px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest',
          'text-notion-secondary border border-notion-border transition-colors',
          position === 'LEFT' ? 'left-4' : 'right-4',
        ].join(' ')}
      >
        {position === 'LEFT' ? 'Précédent' : 'Suivant'}
      </div>
    </div>

    <div className="flex flex-col p-5 flex-grow">
      <p className="text-notion-secondary font-medium text-[10px] uppercase tracking-[0.15em] mb-2 opacity-80 text-center">
        {moment(post.createdAt).format('MMM DD, YYYY')}
      </p>
      <h3 className="text-notion-text font-bold text-lg text-center leading-snug line-clamp-2 h-[2.8rem] flex items-center justify-center px-2">
        {post.title}
      </h3>
    </div>

    <Link href={`/post/${post.slug}`}>
      <motion.span
        whileHover={{ backgroundColor: 'rgba(55, 53, 47, 0.02)' }}
        className="z-20 absolute inset-0 transition-colors duration-300"
      />
    </Link>

    <div className={`absolute bottom-32 ${position === 'LEFT' ? 'left-4' : 'right-4'} z-30`}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="notion-button p-2 rounded-full shadow-md bg-notion-card border border-notion-border transition-colors"
      >
        {position === 'LEFT' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-notion-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-notion-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </motion.div>
    </div>
  </motion.div>
);

export default AdjacentPostCard;
