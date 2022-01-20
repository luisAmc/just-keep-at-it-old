import { GetServerSideProps } from 'next';
import { authenticatedRoute } from 'src/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export { CreateExercise as default } from 'src/components/Exercises/CreateExercise';
