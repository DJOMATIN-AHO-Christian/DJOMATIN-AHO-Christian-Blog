import React from 'react';
import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { grpahCMSImageLoader } from '../util';

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-[22px] font-semibold mb-5 mt-10 text-notion-text">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-6 text-[17px] leading-[1.65] text-notion-text">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-[20px] font-semibold mb-4 mt-8 text-notion-text">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="rounded-xl mb-10 max-w-full"
          />
        );
      default:
        return modifiedText;
    }
  };

  const readingTime = Math.ceil(post.content.raw.children.length / 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <Head>
        <title>{post.title} - DJOMATIN AHO Christian Blog</title>
      </Head>

      {/* Hero Image with Depth blur */}
      <div className="relative w-full h-56 md:h-96 overflow-hidden mb-16">
        <Image
          loader={grpahCMSImageLoader}
          src={post.featuredImage.url}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-notion-bg/30 via-transparent to-notion-bg" />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 lg:px-0 relative z-10">
        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[34px] font-bold text-notion-text mb-8 leading-[1.15] tracking-tight"
        >
          {post.title}
        </motion.h1>

        {/* Metadata bar — Caption size */}
        <div className="flex items-center gap-4 text-[12px] text-notion-secondary mb-16 pb-6 border-b border-notion-border/20">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden">
              <Image
                loader={grpahCMSImageLoader}
                alt={post.author.name}
                layout="fill"
                objectFit="cover"
                src={post.author.photo.url}
              />
            </div>
            <span className="font-medium text-notion-text">{post.author.name}</span>
          </div>
          <span className="text-notion-border">·</span>
          <span>{moment(post.createdAt).format('MMMM DD, YYYY')}</span>
          <span className="text-notion-border">·</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Body — 17px */}
        <div className="text-[17px] leading-[1.65]">
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.05 }}
              >
                {getContentFragment(index, children, typeObj, typeObj.type)}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default PostDetail;
