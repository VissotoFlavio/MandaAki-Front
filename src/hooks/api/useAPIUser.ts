import { UserMenuData } from '../../models/user/menu.model';
import { http } from '../../services/api/axios.api';
import {
  HttpErrorData,
  HttpResultData,
  HttpSuccessWithoutData,
} from '../../services/api/request.models';

export const useAPIUser = () => {
  const baseUrl = '/user';

  const menus = async (): Promise<HttpResultData<UserMenuData[]>> => {
    try {
      const res = await http.get(baseUrl + '/menu');
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

  return {
    menus,
  };
};
