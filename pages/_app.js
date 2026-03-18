import React from 'react';
import { Layout } from '../components';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
