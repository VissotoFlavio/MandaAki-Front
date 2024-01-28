import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { STORAGE_CONST } from '../../constants/storage.constants';
import { UserTokenData } from '../../models/auth/token.model';
import { GetLocalStorage } from '../localStorage.service';
import { HttpErrorData } from './request.models';

const createAxiosInstance = (): AxiosInstance => {
  const storagedToken = GetLocalStorage<UserTokenData | null>(STORAGE_CONST.token, null);
  const instanceAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instanceAxios.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: AxiosError) => {
      return Promise.reject(err.response ? (err.response.data as HttpErrorData) : err.message);
    },
  );

  if (storagedToken) {
    instanceAxios.defaults.headers.Authorization = `${storagedToken.token_type} ${storagedToken.access_token}`;
  }

  return instanceAxios;
};

export const http: AxiosInstance = createAxiosInstance();
