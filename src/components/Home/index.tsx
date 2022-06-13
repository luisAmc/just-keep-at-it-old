import { gql, useQuery } from '@apollo/client';
import { LoginForm } from '../Auth/LoginForm';
import { Button } from '../shared/Button';
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

  return (
    <div>
      {data &&
        (data.me ? (
          <div>
            <Button href='/workouts/create'>Crear Rutina</Button>
          </div>
        ) : (
          <LoginForm />
        ))}
    </div>
  );
}
