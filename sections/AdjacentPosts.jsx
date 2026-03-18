import React from 'react';

import { AdjacentPostCard } from '../components';

const AdjacentPosts = ({ adjacentPosts }) => (
  <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
    {adjacentPosts && (
      <>
        {adjacentPosts.previous && (
          <div className={`${adjacentPosts.next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
            <AdjacentPostCard post={adjacentPosts.previous} position="LEFT" />
          </div>
        )}
        {adjacentPosts.next && (
          <div className={`${adjacentPosts.previous ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
            <AdjacentPostCard post={adjacentPosts.next} position="RIGHT" />
          </div>
        )}
      </>
    )}
  </div>
);

export default AdjacentPosts;
