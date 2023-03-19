import { GetServerSideProps } from 'next';
import { GetItDone } from 'src/components/GetItDone';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default GetItDone;
