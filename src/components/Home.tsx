import { useQuery } from '@apollo/client';
import { Dashboard } from './Dashboard';
import { LoginForm } from './Auth/LoginForm';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutQuery } from './__generated__/Layout.generated';
import { LAYOUT_QUERY } from './Layout';

export function Home() {
  const { data } = useQuery<LayoutQuery>(LAYOUT_QUERY);

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
