import { GetServerSideProps } from 'next';
import { graphql, useQuery } from 'relay-hooks';
import { Exercises } from 'src/components/Exercises';
import { authenticatedRoute } from 'src/utils/redirects';
import { exercisesPageQuery } from './__generated__/exercisesPageQuery.graphql';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default function ExercisesPage() {
  const { data, isLoading } = useQuery<exercisesPageQuery>(graphql`
    query exercisesPageQuery {
      exercises {
        ...Exercises_exercise
      }
    }
  `);

  if (isLoading || !data) {
    return <p>Cargando...</p>;
  }

  return <Exercises exercises={data.exercises} />;
}
