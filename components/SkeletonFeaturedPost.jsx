import React from 'react';
import Skeleton from './Skeleton';

const SkeletonFeaturedPost = () => (
    <div className="relative flex flex-col h-full rounded-lg border border-notion-border overflow-hidden bg-notion-card">
        <div className="relative h-44 w-full overflow-hidden">
            <Skeleton width="100%" height="100%" borderRadius="0" />
        </div>
        <div className="flex flex-col p-5 flex-grow">
            <Skeleton width="80px" height="10px" className="mb-2" />
            <Skeleton width="100%" height="24px" className="mb-2" />
            <Skeleton width="90%" height="24px" className="mb-4" />
            <div className="mt-auto flex items-center pt-3 border-t border-notion-border/10">
                <Skeleton width="18px" height="18px" borderRadius="100%" />
                <Skeleton width="80px" height="10px" className="ml-2" />
            </div>
        </div>
    </div>
);

export default SkeletonFeaturedPost;
