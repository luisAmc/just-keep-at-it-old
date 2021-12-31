import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

export function useAuthRedirect() {
  const client = useQueryClient();
  const router = useRouter();

  return () => {
    client.clear();
    router.push((router.query.redirect as string) ?? '/home');
  };
}
