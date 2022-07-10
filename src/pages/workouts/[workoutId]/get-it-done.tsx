import { GetServerSideProps } from 'next';
import { GetItDone } from 'src/components/Workouts/GetItDone';
import { query } from 'src/components/Workouts/ViewWorkout';
import { preloadQuery } from 'src/utils/apollo';

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  preloadQuery(ctx, { query });

export default GetItDone;
