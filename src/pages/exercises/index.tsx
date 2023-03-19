import { GetServerSideProps } from 'next';
import { Exercises, EXERCISES_QUERY } from 'src/components/Exercises';
import { preloadQuery } from 'src/utils/apollo';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  return preloadQuery(ctx, { query: EXERCISES_QUERY });
};

export default Exercises;
