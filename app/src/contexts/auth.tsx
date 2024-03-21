import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../config/api';
import { userService } from '../services/User';
import { IAuthResponse, ILogin } from '../services/User/IUserService';
import { IUser } from '../interfaces/user';

interface IAuthContextData {
  loading: boolean;
  signed: boolean;
  user: IUser | null;
  loginError: string | null;
  SignIn(data: ILogin): Promise<void>;
  SignOut(): void;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const loadStorageData = async () => {
      const data = localStorage.getItem('@Auth:data');

      const storagedData = data
        ? (JSON.parse(data) as IAuthResponse)
        : undefined;

      if (storagedData) {
        try {
          api.defaults.headers.common.Authorization = `Bearer ${storagedData.accessToken}`;
          const response = await userService.loginToken();

          const { accessToken, user: responseUser } = response;
          setUser(responseUser);
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        } catch (error) {
          localStorage.removeItem('@Auth:data');

          setUser(null);
        }
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const SignIn = async (data: ILogin) => {
    setLoginError(null);
    try {
      const response = await userService.login(data);
      const toStorage = JSON.stringify(response);
      localStorage.setItem('@Auth:data', toStorage);
      const { accessToken, user: responseUser } = response;

      setUser(responseUser);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } catch (error: any) {
      setLoginError(error.response.data.message || 'Erro interno do servidor');
    }
  };

  const SignOut = () => {
    localStorage.removeItem('@Auth:data');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed: !!user,
        user,
        setUser,
        loginError,
        SignIn,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
