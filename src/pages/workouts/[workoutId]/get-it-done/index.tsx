import { GetServerSideProps } from 'next';
import { GetItDone, query } from 'src/components/Workouts/GetItDone';
import { preloadQuery } from 'src/utils/apollo';

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  preloadQuery(ctx, { query });

export default GetItDone;