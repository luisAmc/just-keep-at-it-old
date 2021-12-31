import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export { LoginForm as default } from 'src/components/Auth/LoginForm';
