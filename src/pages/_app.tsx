import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { relayEnvironment } from 'src/relayEnvironment';
import '../styles.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
