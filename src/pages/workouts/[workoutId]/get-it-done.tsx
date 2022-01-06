import { GetServerSideProps } from 'next';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { GetItDone as default } from 'src/components/Workout/GetItDone';
