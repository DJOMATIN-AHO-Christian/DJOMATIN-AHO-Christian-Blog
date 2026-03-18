import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';

import { getComments } from '../services';
import SkeletonComments from './SkeletonComments';

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getComments(slug).then((result) => {
      setComments(result);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <SkeletonComments />;

  return (
    <>
      {comments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-notion-card border border-notion-border rounded-lg p-8 pb-12 mb-8 transition-colors"
        >
          <h3 className="text-xl mb-8 font-bold text-notion-text border-b border-notion-border pb-4">
            {comments.length}
            {' '}
            Commentaires
          </h3>
          {comments.map((comment, index) => (
            <div key={index} className={`border-notion-border mb-4 pb-4 ${index === comments.length - 1 ? '' : 'border-b'}`}>
              <p className="mb-4 text-notion-text">
                <span className="font-bold">{comment.name}</span>
                {' '}
                le
                {' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line text-notion-secondary w-full">{parse(comment.comment)}</p>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default Comments;
