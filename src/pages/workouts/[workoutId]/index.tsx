import { GetServerSideProps } from 'next';
import {
  Workout,
  WorkoutShimmer,
  query
} from 'src/components/Workouts/Workout';
import { useQuery } from 'relay-hooks';
import { WorkoutIdQuery } from 'src/components/Workouts/__generated__/WorkoutIdQuery.graphql';

export const getServerSideProps: GetServerSideProps = async (req) => {
  return {
    props: { id: req.query.workoutId }
  };
};

interface Props {
  id: string;
}

export default function WorkoutPage({ id }: Props) {
  const { data, isLoading } = useQuery<WorkoutIdQuery>(query, { id });

  if (isLoading || !data) {
    return <WorkoutShimmer />;
  }

  return <Workout workout={data.workout} />;
}
