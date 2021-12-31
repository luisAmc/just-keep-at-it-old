import { GetServerSidePropsContext } from 'next';
import { resolveSession } from 'src/utils/sessions';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await resolveSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      },
      props: {
        data: {
          me: {
            name: session.user.name,
            username: session.user.username
          }
        }
      }
    };
  }

  return { props: {} };
}

export { Home as default } from '../components/Home';
