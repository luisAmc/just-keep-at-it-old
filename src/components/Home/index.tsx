import { gql, useQuery } from '@apollo/client';
import { LoginForm } from '../Auth/LoginForm';
import { HomeQuery } from './__generated__/index.generated';

export const query = gql`
  query HomeQuery {
    me {
      id
      username
      #   workouts
    }
  }
`;

export function Home() {
  const { data, loading, error } = useQuery<HomeQuery>(query);

  return <div>{data && (data.me ? <div>logged in</div> : <LoginForm />)}</div>;
}
