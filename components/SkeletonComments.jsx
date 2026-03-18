import React from 'react';
import Skeleton from './Skeleton';

const SkeletonComments = () => (
    <div className="bg-notion-card border border-notion-border rounded-lg p-8 pb-12 mb-8">
        <Skeleton width="150px" height="24px" className="mb-8 border-b border-notion-border pb-4" />
        {[1, 2].map((i) => (
            <div key={i} className={`mb-4 pb-4 ${i === 1 ? 'border-b border-notion-border' : ''}`}>
                <div className="flex gap-2 mb-4">
                    <Skeleton width="100px" height="16px" />
                    <Skeleton width="120px" height="16px" />
                </div>
                <div className="space-y-2">
                    <Skeleton width="100%" height="14px" />
                    <Skeleton width="90%" height="14px" />
                </div>
            </div>
        ))}
    </div>
);

export default SkeletonComments;
