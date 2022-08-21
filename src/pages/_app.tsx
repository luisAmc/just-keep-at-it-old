import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { useApollo } from 'src/utils/apollo';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
