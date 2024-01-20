import axios, { AxiosInstance } from 'axios';
import { useAuth } from '../../contexts/auth.context';

const apiInstanseBase = axios.create({
  baseURL: '',
});

apiInstanseBase.interceptors.request.use((config) => {
  console.log('Configurações da requisição: ', config);
  return config;
});

export const useApiBase = () => {
  const authProvider = useAuth();

  const api = (): AxiosInstance | null => {
    if (!authProvider.token) {
      return null;
    }
    apiInstanseBase.defaults.headers.Authorization = `${authProvider.token.token_type} ${authProvider.token.access_token}`;
    apiInstanseBase.defaults.headers.Accept = 'application/json, text/plain, */*';
    return apiInstanseBase;
  };

  return {
    api,
  };
};
