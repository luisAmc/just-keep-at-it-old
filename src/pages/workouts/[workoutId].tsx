import { GetServerSideProps } from 'next';
import { query, ViewWorkout } from 'src/components/Workouts/ViewWorkout';
import { preloadQuery } from 'src/utils/apollo';

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  preloadQuery(ctx, { query });

export default ViewWorkout;
