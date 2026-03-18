import React from 'react';

const Skeleton = ({ className, width, height, borderRadius = '4px' }) => (
    <div
        className={`skeleton ${className}`}
        style={{ width, height, borderRadius }}
    />
);

export default Skeleton;
