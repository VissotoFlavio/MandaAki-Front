import { UserTokenData } from '../../models/auth/token.model';
import { UserInfoData } from '../../models/auth/user.model';
import { http } from '../../services/api/axios.api';
import {
  HttpErrorData,
  HttpResultData,
  HttpSuccessWithoutData,
} from '../../services/api/request.models';

export const useAPIAuth = () => {
  const baseUrl = '/auth';

  const signIn = async (user: string, pass: string): Promise<HttpResultData<UserTokenData>> => {
    try {
      const res = await http.post<UserTokenData>(baseUrl + '/signIn', { login: user, pass });

      if (res && res.data) {
        return {
          success: res.data,
        };
      } else {
        return {
          error: HttpSuccessWithoutData(),
        };
      }
    } catch (error) {
      return {
        error: error as HttpErrorData,
      };
    }
  };

  const refreshToken = async (token: UserTokenData): Promise<HttpResultData<UserTokenData>> => {
    try {
      const res = await http.post<UserTokenData>(baseUrl + '/refresh-token', { token });
      if (res && res.data) {
        return {
          success: res.data,
        };
      } else {
        return {
          error: HttpSuccessWithoutData(),
        };
      }
    } catch (error) {
      console.log(error);
      return {
        error: error as HttpErrorData,
      };
    }
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
