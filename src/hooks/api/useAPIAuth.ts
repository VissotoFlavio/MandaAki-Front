import { UserTokenData } from '../../models/auth/token.model';
import { UserInfoData } from '../../models/auth/user.model';

export const useAPIAuth = () => ({
  signIn: async (user: string, pass: string): Promise<UserTokenData | null> => {
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
  },

  refreshToken: async (token: UserTokenData): Promise<UserTokenData | null> => {
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
  },

  userInfo: async (token: UserTokenData): Promise<UserInfoData | null> => {
    return new Promise<UserInfoData | null>((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Flavio Vissoto',
        });
      }, 2000);
    });
  },
});
