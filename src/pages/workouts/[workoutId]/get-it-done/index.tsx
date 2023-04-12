import { GetServerSideProps } from 'next';
import { GetItDone, query } from 'src/components/GetItDone';
import { preloadQuery } from 'src/utils/apollo';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  return preloadQuery(ctx, {
    query,
    variables: { workoutId: ctx.params!.workoutId }
  });
};

export default GetItDone;
