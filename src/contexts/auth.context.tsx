import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { STORAGE_CONST } from '../constants/storage.constants';
import { useAPIAuth } from '../hooks/api/useAPIAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserTokenData } from '../models/auth/token.model';
import { UserInfoData } from '../models/auth/user.model';
import { HttpResultData } from '../services/api/request.models';
import { diffEmMilissegundos } from '../services/data.service';
import { useToast } from './toast.context';

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
  const toast = useToast();

  const [userToken, setUserToken] = useLocalStorage<UserTokenData>(STORAGE_CONST.token, null);
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const refreshTokenTimeout = useRef<number>();

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
      refreshToken();
    } else {
      clearTimeout(refreshTokenTimeout.current);
    }
  }, [userToken]);

  const signIn = async (
    email: string,
    password: string,
  ): Promise<HttpResultData<UserTokenData>> => {
    setLoading(true);
    const resToken = await apiAuth.signIn(email, password);

    if (resToken && resToken.success) {
      setUserToken(resToken.success);
      // const userInfo = await apiAuth.userInfo(resToken.success);
      setUserInfo(userInfo);
    }
    setLoading(false);
    return resToken;
  };

  const signOut = () => {
    setLoading(true);
    setUserToken(null);
    setLoading(false);
  };

  const refreshToken = () => {
    if (userToken) {
      clearTimeout(refreshTokenTimeout.current);
      refreshTokenTimeout.current = setTimeout(async () => {
        if (userToken) {
          try {
            const response = await apiAuth.refreshToken();
            if (response && response.success) {
              setUserToken(response.success);
            } else {
              toast.open({
                message: 'Sua sessão expirou. Realize o login novamente.',
                icon: 'alert',
              });
              signOut();
            }
          } catch (error) {
            toast.open({
              message: 'Sua sessão expirou. Realize o login novamente.',
              icon: 'alert',
            });
            signOut();
          }
        }
      }, getTimeRefreshToken(userToken));
    }
  };

  const getTimeRefreshToken = (token: UserTokenData): number => {
    if (token.expire_in === 0 || !token.updated) {
      return 0;
    }
    const dateRefesh = new Date(new Date().setSeconds(token.expire_in - 60));
    const result = diffEmMilissegundos(token.updated, dateRefesh);
    return result > 0 ? result : 0;
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
