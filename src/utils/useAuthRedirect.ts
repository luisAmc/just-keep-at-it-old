import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function useAuthRedirect() {
  const client = useApolloClient();
  const router = useRouter();

  return useCallback(() => {
    client.resetStore();
    router.push((router.query.redirect as string) ?? '/');
  }, [client, router]);
}
