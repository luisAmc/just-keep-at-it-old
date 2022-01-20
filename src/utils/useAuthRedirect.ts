import { useRouter } from 'next/router';

export function useAuthRedirect() {
  const router = useRouter();

  return () => {
    router.push((router.query.redirect as string) ?? '/home');
  };
}
