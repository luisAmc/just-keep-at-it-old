import { GetServerSideProps } from 'next';
import { DASHBOARD_QUERY, Dashboard } from 'src/components/Dashboard';
import { preloadQuery } from 'src/utils/apollo';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = await authenticatedRoute(ctx);
  if ('redirect' in auth) {
    return auth;
  }

  return preloadQuery(ctx, { query: DASHBOARD_QUERY });
};

export default Dashboard;
