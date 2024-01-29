import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { STORAGE_CONST } from '../../constants/storage.constants';
import { UserTokenData } from '../../models/auth/token.model';
import { GetLocalStorage } from '../localStorage.service';
import { HttpErrorData } from './request.models';

const createAxiosInstance = (): AxiosInstance => {
  const instanceAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instanceAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const storagedToken = GetLocalStorage<UserTokenData | null>(STORAGE_CONST.token, null);
    if (storagedToken) {
      config.headers.Authorization = `${storagedToken.token_type} ${storagedToken.access_token}`;
    }
    return config;
  });

  instanceAxios.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: AxiosError) => {
      return Promise.reject(err.response ? (err.response.data as HttpErrorData) : err.message);
    },
  );

  return instanceAxios;
};

export const http: AxiosInstance = createAxiosInstance();
