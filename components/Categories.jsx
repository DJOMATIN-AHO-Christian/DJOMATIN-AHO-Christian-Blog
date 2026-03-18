import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = ({ categories: staticCategories }) => {
  const [categories, setCategories] = useState(staticCategories || []);

  useEffect(() => {
    if (!staticCategories) {
      getCategories().then((newCategories) => {
        setCategories(newCategories);
      });
    }
  }, [staticCategories]);

  return (
    <div className="bg-notion-card border border-notion-border rounded p-6 mb-8 transition-colors">
      <h3 className="text-sm font-bold text-notion-secondary uppercase tracking-widest mb-6 pb-2 border-b border-notion-border">
        Catégories
      </h3>
      <div className="flex flex-col gap-1">
        {categories.map((category, index) => (
          <Link key={index} href={`/category/${category.slug}`}>
            <span className="notion-block cursor-pointer block text-notion-text px-3 py-2 ml-1 text-sm font-medium transition-all group">
              <div className="block-grip !left-[-16px]">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor">
                  <circle cx="2" cy="2" r="1" /><circle cx="2" cy="5" r="1" /><circle cx="2" cy="8" r="1" />
                  <circle cx="8" cy="2" r="1" /><circle cx="8" cy="5" r="1" /><circle cx="8" cy="8" r="1" />
                </svg>
              </div>
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
