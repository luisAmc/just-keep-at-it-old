import { GetServerSideProps } from 'next';
import { Workout } from 'src/components/Workouts/Workout';
import { WorkoutIdQuery } from './__generated__/WorkoutIdQuery.graphql';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';

export const getServerSideProps: GetServerSideProps = async (req) => {
  return {
    props: { id: req.query.workoutId }
  };
};

interface Props {
  id: string;
}

export default function WorkoutPage({ id }: Props) {
  const { data, isLoading } = useQuery<WorkoutIdQuery>(
    graphql`
      query WorkoutIdQuery($id: ID!) {
        workout(id: $id) {
          ...Workout_workout
        }
      }
    `,
    { id }
  );

  if (isLoading || !data) {
    return <div>Cargando...</div>;
  }

  return <Workout workout={data.workout} />;
}
