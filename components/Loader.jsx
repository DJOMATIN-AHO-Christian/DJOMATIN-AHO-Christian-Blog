import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center py-10">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-notion-border border-t-notion-blue animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-notion-blue rounded-full animate-pulse" />
        </div>
      </div>
      <p className="text-xs font-bold text-notion-secondary uppercase tracking-widest animate-pulse">
        Loading
      </p>
    </div>
  </div>
);

export default Loader;
