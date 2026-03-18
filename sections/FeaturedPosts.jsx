import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { FeaturedPostCard, SkeletonFeaturedPost } from '../components';
import { getFeaturedPosts } from '../services';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = ({ posts }) => {
  const [featuredPosts, setFeaturedPosts] = useState(posts || []);
  const [dataLoaded, setDataLoaded] = useState(!!posts);

  useEffect(() => {
    if (!posts) {
      getFeaturedPosts().then((result) => {
        setFeaturedPosts(result);
        setDataLoaded(true);
      });
    }
  }, [posts]);

  const customLeftArrow = (
    <div className="absolute left-0 z-40 ml-2 group">
      <div className="flex items-center justify-center w-9 h-9 cursor-pointer bg-notion-bg/90 backdrop-blur-md border border-notion-border/30 rounded-full hover:bg-notion-hover transition-all shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-notion-text group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    </div>
  );

  const customRightArrow = (
    <div className="absolute right-0 z-40 mr-2 group">
      <div className="flex items-center justify-center w-9 h-9 cursor-pointer bg-notion-bg/90 backdrop-blur-md border border-notion-border/30 rounded-full hover:bg-notion-hover transition-all shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-notion-text group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="mb-16">
      <h2 className="text-[12px] font-semibold text-notion-secondary uppercase tracking-[0.15em] mb-10 text-center">Featured</h2>
      <Carousel infinite customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} responsive={responsive} itemClass="px-4">
        {dataLoaded ? featuredPosts.map((post, index) => (
          <FeaturedPostCard key={index} post={post} />
        )) : [1, 2, 3, 4, 5].map((i) => (
          <SkeletonFeaturedPost key={i} />
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
