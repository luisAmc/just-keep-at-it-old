import { GetServerSideProps } from 'next';
import { useQuery } from 'relay-hooks';
import { GetItDone, query } from 'src/components/Workouts/GetItDone';
import { GetItDoneQuery } from 'src/components/Workouts/GetItDone/__generated__/GetItDoneQuery.graphql';
import { WorkoutShimmer } from 'src/components/Workouts/Workout';

export const getServerSideProps: GetServerSideProps = async (req) => {
  return {
    props: { id: req.query.workoutId }
  };
};

interface Props {
  id: string;
}

export default function GetItDonePage({ id }: Props) {
  const { data, isLoading } = useQuery<GetItDoneQuery>(query, { id });

  if (isLoading || !data) {
    return <WorkoutShimmer />;
  }

  return <GetItDone workout={data.workout} />;
}
