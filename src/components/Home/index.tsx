import { useQuery } from '@apollo/client';
import { LoginForm } from '../Auth/LoginForm';
import { Dashboard } from '../Dashboard';
import { LayoutQuery } from '../__generated__/Layout.generated';
import { query } from '../Layout';

export function Home() {
  const { data } = useQuery<LayoutQuery>(query);

  return <>{data && (data.viewer ? <Dashboard /> : <LoginForm />)}</>;

  // if (data?.viewer) {
  //   return <Dashboard />;
  // }

  // return <LoginForm />;
}
