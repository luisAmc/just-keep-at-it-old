import { GetServerSideProps } from 'next';
import { Home, query } from 'src/components/Home';
import { preloadQuery } from 'src/utils/apollo';

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  preloadQuery(ctx, { query });

export default Home;
