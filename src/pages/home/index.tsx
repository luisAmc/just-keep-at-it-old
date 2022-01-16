import { GetServerSidePropsContext } from 'next';
import { graphql, useQuery } from 'relay-hooks';
import { Home, HomeShimmer } from 'src/components/Home';
import { resolveSession } from 'src/utils/sessions';
import { homePageQuery } from './__generated__/homePageQuery.graphql';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await resolveSession(ctx);

  if (session) {
    return {
      props: {}
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

export default function HomePage() {
  const { data, isLoading } = useQuery<homePageQuery>(
    graphql`
      query homePageQuery {
        workouts {
          ...Home_workout
        }
      }
    `
  );

  if (isLoading || !data) {
    return <HomeShimmer />;
  }

  return <Home workouts={data.workouts} />;
}

// export default Home;
