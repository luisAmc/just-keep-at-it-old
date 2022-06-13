import { GetServerSideProps } from 'next';
import { Exercises, query } from 'src/components/Exercises';
import { preloadQuery } from 'src/utils/apollo';

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  preloadQuery(ctx, { query });

export default Exercises;
