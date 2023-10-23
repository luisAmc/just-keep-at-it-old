import { ReactNode, createContext, useContext } from 'react';

interface CurrentUserType {
  username: string;
}

export const CurrentUserContext = createContext<CurrentUserType | undefined>(
  undefined
);

interface CurrentUserProviderProps {
  children: ReactNode;
}

export const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const context: CurrentUserType = {
    username: ''
  };

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error(
      '`useCurrentUser` can only be use inside a CurrentUserProvider.'
    );
  }

  return context;
}
