import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { useApollo } from 'src/utils/apollo';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState);

  return (
    <ApolloProvider client={client}>
      <div className='absolute inset-0'>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
