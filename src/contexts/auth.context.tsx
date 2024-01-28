import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { STORAGE_CONST } from '../constants/storage.constants';
import { useAPIAuth } from '../hooks/api/useAPIAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserTokenData } from '../models/auth/token.model';
import { UserInfoData } from '../models/auth/user.model';
import { HttpResultData } from '../services/api/request.models';

export interface AuthContextData {
  signed: boolean;
  showWelcome: boolean;
  token: UserTokenData | null;
  user: UserInfoData | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<HttpResultData<UserTokenData>>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props): React.JSX.Element => {
  const apiAuth = useAPIAuth();

  const [userToken, setUserToken] = useLocalStorage<UserTokenData>(STORAGE_CONST.token, null);
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      setLoading(true);
      if (userToken) {
        const userInfo = await apiAuth.userInfo(userToken);
        setUserInfo(userInfo);
      }
      setLoading(false);
      setShowWelcome(false);
    };
    loadStorageData();
  }, []);

  useEffect(() => {
    if (userToken) {
      setTimeout(
        async () => {
          console.log('refreshToken', new Date());
          const newToken = await apiAuth.refreshToken(userToken);
          setUserToken(newToken);
        },
        (userToken.expire_in - 60 * 4.7) * 1000,
      );
    }
  }, [userToken]);

  const signIn = async (
    email: string,
    password: string,
  ): Promise<HttpResultData<UserTokenData>> => {
    setLoading(true);
    const resToken = await apiAuth.signIn(email, password);

    if (resToken) {
      console.log('Token: ', resToken);
      if (resToken && resToken.success) {
        setUserToken(resToken.success);
        const userInfo = await apiAuth.userInfo(resToken.success);
        setUserInfo(userInfo);
      }
    }
    return resToken;
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUserToken(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!userToken,
        token: userToken,
        user: userInfo,
        loading,
        signIn,
        signOut,
        showWelcome,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  if (!auth.signed) {
    if (window.location.pathname !== 'login') {
      return (
        <Navigate to={'/login?redirect=' + window.location.pathname + window.location.search} />
      );
    } else {
      return <Navigate to={'/login'} />;
    }
  }
  return children;
};
