import { UserTokenData } from '../../models/auth/token.model';
import { UserInfoData } from '../../models/auth/user.model';
import { http } from '../../services/api/axios.api';
import { HttpErrorData, HttpResultData } from '../../services/api/request.models';

export const useAPIAuth = () => {
  const baseUrl = '/auth';

  const signIn = async (user: string, pass: string): Promise<HttpResultData<UserTokenData>> => {
    try {
      const res = await http.post<UserTokenData>(baseUrl + '/signIn', { login: user, pass });

      if (res && res.data) {
        return {
          success: res.data,
        };
      }
    } catch (error) {
      return {
        error: error as HttpErrorData,
      };
    }
  };

  const refreshToken = async (token: UserTokenData): Promise<UserTokenData | null> => {
    return new Promise<UserTokenData | null>((resolve) => {
      setTimeout(() => {
        resolve({
          access_token: 'token',
          expire_in: 300,
          refresh_token: 'refresh',
          token_type: 'bearer',
        });
      }, 2000);
    });
  };

  const userInfo = async (token: UserTokenData): Promise<UserInfoData | null> => {
    return new Promise<UserInfoData | null>((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Flavio Vissoto',
        });
      }, 2000);
    });
  };

  return {
    signIn,
    refreshToken,
    userInfo,
  };
};
