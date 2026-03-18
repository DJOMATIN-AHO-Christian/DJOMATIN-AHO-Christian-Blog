import React from 'react';
import Skeleton from './Skeleton';

const SkeletonPostDetail = () => (
    <div className="mb-12">
        <div className="relative w-full h-48 md:h-64 overflow-hidden mb-12">
            <Skeleton width="100%" height="100%" borderRadius="0" />
        </div>
        <div className="max-w-3xl mx-auto px-4 lg:px-0 -mt-20 relative z-10">
            <div className="bg-notion-card w-20 h-20 rounded-2xl border border-notion-border mb-6">
                <Skeleton width="100%" height="100%" borderRadius="16px" />
            </div>
            <Skeleton width="80%" height="48px" className="mb-6" />
            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-notion-border">
                <Skeleton width="20px" height="20px" borderRadius="100%" />
                <Skeleton width="100px" height="16px" />
                <Skeleton width="120px" height="16px" />
            </div>
            <div className="space-y-4">
                <Skeleton width="100%" height="16px" />
                <Skeleton width="95%" height="16px" />
                <Skeleton width="98%" height="16px" />
                <Skeleton width="60%" height="16px" />
                <div className="py-8">
                    <Skeleton width="100%" height="200px" borderRadius="8px" />
                </div>
                <Skeleton width="100%" height="16px" />
                <Skeleton width="90%" height="16px" />
            </div>
        </div>
    </div>
);

export default SkeletonPostDetail;
