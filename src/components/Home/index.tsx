import { gql, useQuery } from '@apollo/client';
import { LoginForm } from '../Auth/LoginForm';
import { Dashboard } from '../Dashboard';
import { HomeQuery } from './__generated__/index.generated';

export const query = gql`
  query HomeQuery {
    viewer {
      id
      username
    }
  }
`;

export function Home() {
  const { data, loading, error } = useQuery<HomeQuery>(query);

  return (
    <div>
      {data &&
        (data.viewer ? (
          <div>
            <Dashboard />
          </div>
        ) : (
          <LoginForm />
        ))}
    </div>
  );
}
