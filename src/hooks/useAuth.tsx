import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { UserAuth } from 'src/types';

interface AuthContextProps {
  user: UserAuth | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const initialUser: AuthContextProps = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext(initialUser);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
