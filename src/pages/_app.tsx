import type { AppProps } from 'next/app';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { relayEnvironment } from 'src/relayEnvironment';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
