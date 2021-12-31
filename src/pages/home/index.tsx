import { GetServerSideProps } from 'next';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { Home as default } from 'src/components/Home';
