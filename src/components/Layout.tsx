import {
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  IdentificationIcon,
  QueueListIcon
} from '@heroicons/react/24/outline';
import { Dropdown, DropdownItem } from './shared/Dropdown';
import { gql, useMutation, useQuery } from '@apollo/client';
import { LayoutQuery } from './__generated__/Layout.generated';
import { Link } from './shared/Link';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';

interface LayoutProps {
  children: React.ReactNode;
}

export const query = gql`
  query LayoutQuery {
    viewer {
      id
      username
    }
  }
`;

export function Layout({ children }: LayoutProps) {
  const authRedirect = useAuthRedirect();
  const { data } = useQuery<LayoutQuery>(query);

  const [logout] = useMutation(
    gql`
      mutation LayoutLogoutMutation {
        logout
      }
    `,
    {
      onCompleted() {
        authRedirect();
      }
    }
  );

  return (
    <div className="relative mx-auto h-full w-full max-w-xl">
      {data?.viewer && (
        <nav className="sticky top-0 z-10 flex items-center justify-end bg-white/75 p-4 backdrop-blur">
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-400 to-brand-700 bg-clip-text text-xl font-semibold tracking-tight text-transparent"
          >
            Just keep at it!
          </Link>

          <Dropdown
            direction="right"
            trigger={<IdentificationIcon className="h-6 w-6" />}
          >
            <DropdownItem
              label="Bocetos"
              href="/templates"
              icon={DocumentTextIcon}
            />

            <DropdownItem
              label="Ejercicios"
              href="/exercises"
              icon={QueueListIcon}
            />

            <DropdownItem
              variant="danger"
              label="Cerrar sesión"
              onClick={logout}
              icon={ArrowLeftOnRectangleIcon}
            />
          </Dropdown>
        </nav>
      )}

      <div className="relative flex flex-1 flex-col gap-y-4 px-2 pb-2">
        {children}
      </div>
    </div>
  );
}
