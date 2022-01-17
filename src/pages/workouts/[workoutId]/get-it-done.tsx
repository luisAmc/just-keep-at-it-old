import { GetServerSideProps } from 'next';
import { graphql, useQuery } from 'relay-hooks';
import { GetItDone } from 'src/components/Workouts/GetItDone';
import { WorkoutShimmer } from 'src/components/Workouts/Workout';
import { getItDoneQuery } from './__generated__/getItDoneQuery.graphql';

export const getServerSideProps: GetServerSideProps = async (req) => {
  return {
    props: { id: req.query.workoutId }
  };
};

interface Props {
  id: string;
}

export default function GetItDonePage({ id }: Props) {
  const { data, isLoading } = useQuery<getItDoneQuery>(
    graphql`
      query getItDoneQuery($id: ID!) {
        workout(id: $id) {
          ...GetItDone_workout
        }
      }
    `,
    { id }
  );

  if (isLoading || !data) {
    return <WorkoutShimmer />;
  }

  return <GetItDone workout={data.workout} />;
}
