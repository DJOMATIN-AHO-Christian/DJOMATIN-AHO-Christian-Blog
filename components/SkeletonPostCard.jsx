import React from 'react';
import Skeleton from './Skeleton';

const SkeletonPostCard = () => (
    <div className="p-6 mb-10 bg-notion-card border border-notion-border/50 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-none w-full md:w-64 h-48">
                <Skeleton width="100%" height="100%" borderRadius="8px" />
            </div>
            <div className="flex-grow flex flex-col pt-1">
                <div className="flex gap-2 mb-3">
                    <Skeleton width="50px" height="18px" />
                    <Skeleton width="40px" height="18px" />
                </div>
                <Skeleton width="90%" height="28px" className="mb-3" />
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Skeleton width="20px" height="20px" borderRadius="100%" />
                        <Skeleton width="80px" height="14px" />
                    </div>
                    <Skeleton width="100px" height="14px" />
                </div>
                <div className="space-y-2">
                    <Skeleton width="100%" height="14px" />
                    <Skeleton width="95%" height="14px" />
                </div>
            </div>
        </div>
    </div>
);

export default SkeletonPostCard;
