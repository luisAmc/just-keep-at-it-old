import { GetServerSideProps } from 'next';
import { query } from 'src/components/Workouts/CreateWorkout';
import { preloadQuery } from 'src/utils/apollo';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  return preloadQuery(ctx, { query });
};

export { CreateWorkout as default } from 'src/components/Workouts/CreateWorkout';
