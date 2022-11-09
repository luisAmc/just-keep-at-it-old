import { GetServerSideProps } from 'next';
import { ViewWorkout } from 'src/components/Workouts/ViewWorkout';
import { query } from 'src/components/Workouts/ViewWorkout';
import { preloadQuery } from 'src/utils/apollo';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  return preloadQuery(ctx, { query, variables: { id: ctx.params!.workoutId } });
};

export default ViewWorkout;
