import { GetServerSideProps } from 'next';
import { ViewWorkout } from 'src/components/Workouts/ViewWorkout';
import { query } from 'src/components/Workouts/ViewWorkout';
import { preloadQuery } from 'src/utils/apollo';

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  preloadQuery(ctx, { query, variables: { id: ctx.params!.workoutId } });

export default ViewWorkout;
