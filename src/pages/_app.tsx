import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { Layout } from 'src/components/Layout';
import { NProgress } from 'src/components/NProgress';
import { Toaster } from 'react-hot-toast';
import { useApollo } from 'src/utils/apollo';
import Head from 'next/head';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-512x512.png" />
        <meta name="theme-color" content="#ffffff" />

        <title>Just keep at it!</title>
      </Head>
      <ApolloProvider client={client}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              padding: '1rem 1.5rem',
              background: 'var(--positive-toast)'
            }
          }}
        />

        <NProgress />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
