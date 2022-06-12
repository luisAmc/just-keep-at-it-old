import { GetServerSideProps } from 'next';
import { unauthenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = unauthenticatedRoute;

export { SignUpForm as default } from 'src/components/Auth/SignUpForm';
