import { gql, useQuery } from '@apollo/client';
import { Dashboard } from './Dashboard';
import { LoginForm } from './Auth/LoginForm';
import { HomeQuery } from './__generated__/Home.generated';
import { AnimatePresence, motion } from 'framer-motion';

export const query = gql`
  query HomeQuery {
    viewer {
      id
      username
    }
  }
`;

export function Home() {
  const { data } = useQuery<HomeQuery>(query);

  return (
    <>
      <AnimatePresence mode="wait">
        {data ? (
          <motion.div
            key="after-data"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {data && (data.viewer ? <Dashboard /> : <LoginForm />)}
          </motion.div>
        ) : (
          <motion.div
            key="before-data"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 grid h-dscreen place-items-center"
          >
            <img src="/images/login.webp" className="animate-swaying" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
