import React, { useEffect } from 'react';
import Head from 'next/head';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './Header';

const Layout = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        // eslint-disable-next-line no-new
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'fr',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element',
        );
      };
    };

    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addGoogleTranslateScript();
    }
  }, []);

  return (
    <>
      <Head>
        <title>DJOMATIN AHO Christian Blog</title>
        <meta name="description" content="DJOMATIN AHO Christian Blog - Blog de réflexion et de développement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      {children}
    </>
  );
};

export default Layout;
