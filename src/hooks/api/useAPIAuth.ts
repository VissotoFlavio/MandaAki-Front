import { STORAGE_CONST } from '../../constants/storage.constants';
import { UserTokenData } from '../../models/auth/token.model';
import { UserInfoData } from '../../models/auth/user.model';
import { http } from '../../services/api/axios.api';
import {
  HttpErrorData,
  HttpResultData,
  HttpSuccessWithoutData,
} from '../../services/api/request.models';
import { GetLocalStorage } from '../../services/localStorage.service';
import { encryptClientSide } from '../../services/security.service';

export const useAPIAuth = () => {
  const baseUrl = '/auth';

  const signIn = async (user: string, pass: string): Promise<HttpResultData<UserTokenData>> => {
    try {
      const res = await http.post<UserTokenData>(baseUrl + '/signIn', {
        login: user,
        pass: encryptClientSide(pass),
      });

      if (res && res.data) {
        res.data.updated = new Date();
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

  const refreshToken = async (): Promise<HttpResultData<UserTokenData>> => {
    try {
      const storagedToken = GetLocalStorage<UserTokenData | null>(STORAGE_CONST.token, null);

      if (storagedToken) {
        const res = await http.post<UserTokenData>(baseUrl + '/refresh-token', {
          token: storagedToken,
        });
        if (res && res.data) {
          res.data.updated = new Date();
          return {
            success: res.data,
          };
        } else {
          return {
            error: HttpSuccessWithoutData(),
          };
        }
      } else {
        return {
          error: {
            message: 'Token inexistente.',
            statusCode: 999,
            statusCodeName: 'Erro Client',
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        error: error as HttpErrorData,
      };
    }
  };

  const userInfo = async (): Promise<UserInfoData | null> => {
    return new Promise<UserInfoData | null>((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Flavio Vissoto',
          email: 'teste@teste.com',
          img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
          perfil: '',
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
