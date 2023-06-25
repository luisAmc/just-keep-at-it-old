import { GetServerSideProps } from 'next';
import {
  ExerciseHistory,
  EXERCISES_HISTORY_QUERY
} from 'src/components/Exercises/ExerciseHistory';
import { preloadQuery } from 'src/utils/apollo';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  return preloadQuery(ctx, {
    query: EXERCISES_HISTORY_QUERY,
    variables: { id: ctx.params!.exerciseId }
  });
};

export default ExerciseHistory;
