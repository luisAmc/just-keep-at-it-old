import { GetServerSidePropsContext } from 'next';
import { resolveSession } from 'src/utils/sessions';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await resolveSession(ctx);

  if (session) {
    return {
      props: {
        data: {
          me: {
            // name: session.user.name,
            // username: session.user.username
          }
        }
      }
    };
  }

  return {
    redirect: {
      destination: '/auth/login',
      permanent: false
    },
    props: {}
  };
}

export { Home as default } from 'src/components/Home';
