import { GetServerSideProps } from 'next';
import {
  ViewExercise,
  VIEW_EXERCISE_QUERY
} from 'src/components/Exercises/ViewExercise';
import { preloadQuery } from 'src/utils/apollo';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  return preloadQuery(ctx, {
    query: VIEW_EXERCISE_QUERY,
    variables: { id: ctx.params!.exerciseId, limit: 10 }
  });
};

export default ViewExercise;
