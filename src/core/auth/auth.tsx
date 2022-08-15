import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type User = {
  email: string;
};

export type UserCredential = {
  email: string;
  password: string;
};

export interface AuthContextType {
  isAuthenticated: boolean;
  loggedInUser: User;
  login: (user: UserCredential) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(null!);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const login = (user: UserCredential) => {
    setUser(user);
    setIsAuthenticated(true);
  };
  const value = { loggedInUser: user, isAuthenticated, logout, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
