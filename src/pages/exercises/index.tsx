import { GetServerSideProps } from 'next';
import { Exercises } from 'src/components/Exercises';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default Exercises;
