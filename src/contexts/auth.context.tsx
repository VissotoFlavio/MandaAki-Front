'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { STORAGE_CONST } from '../constants/storage.constants';
import { useAPIAuth } from '../hooks/api/useAPIAuth';
import { UserTokenData } from '../models/auth/token.model';
import { UserInfoData } from '../models/auth/user.model';
import { CookieManager } from '../services/cookie.service';

export interface AuthContextData {
  signed: boolean;
  token: UserTokenData | null;
  user: UserInfoData | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props): React.JSX.Element => {
  const apiAuth = useAPIAuth();

  const [userToken, setUserToken] = useState<UserTokenData | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const cookieToken = getTokenCookie();
      if (cookieToken) {
        const userInfo = await apiAuth.userInfo(cookieToken);
        setUserInfo(userInfo);
      }
      setLoading(false);
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
        (userToken.expire_in - 60 * 1) * 1000,
      );
    }
  }, [userToken]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const resToken = await apiAuth.signIn(email, password);
    if (resToken) {
      setUserToken(resToken);
      console.log('Token: ', resToken);
      CookieManager().setCookie(STORAGE_CONST.token, JSON.stringify(resToken), resToken.expire_in);
      if (resToken) {
        const userInfo = await apiAuth.userInfo(resToken);
        setUserInfo(userInfo);
      }
    }

    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUserToken(null);
    CookieManager().deleteCookie(STORAGE_CONST.token);
    setLoading(false);
  };

  const getTokenCookie = (): UserTokenData | null => {
    const token = CookieManager().getCookie(STORAGE_CONST.token);
    if (token) {
      return JSON.parse(token) as UserTokenData;
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!userToken, token: userToken, user: userInfo, loading, signIn, signOut }}>
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
