import { GetServerSideProps } from 'next';
import { useQuery } from 'relay-hooks';
import { Exercises, query } from 'src/components/Exercises';
import { ExercisesQuery } from 'src/components/Exercises/__generated__/ExercisesQuery.graphql';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default function ExercisesPage() {
  const { data, isLoading } = useQuery<ExercisesQuery>(query);

  if (isLoading || !data) {
    return <p>Cargando...</p>;
  }

  return <Exercises exercises={data.exercises} />;
}
