import { GetServerSidePropsContext } from 'next';
import { useQuery } from 'relay-hooks';
import { Home, HomeShimmer, query } from 'src/components/Home';
import { HomeQuery } from 'src/components/Home/__generated__/HomeQuery.graphql';
import { resolveSession } from 'src/utils/sessions';

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
  const { data, isLoading } = useQuery<HomeQuery>(query);

  if (isLoading || !data) {
    return <HomeShimmer />;
  }

  return <Home workouts={data.workouts} />;
}

// export default Home;
