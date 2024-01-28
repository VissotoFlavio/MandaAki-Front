// import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// declare module 'axios' {
//   export interface AxiosRequestConfig {
//     raw?: boolean;
//     silent?: boolean;
//   }
// }

// type HttpErrorType = Error | AxiosError | null;

// interface ErrorHandlerObject {
//   after?(error?: HttpErrorType, options?: ErrorHandlerObject): void;
//   before?(error?: HttpErrorType, options?: ErrorHandlerObject): void;
//   message?: string;
// }

// type ErrorHandlerFunction = (error?: HttpErrorType) => ErrorHandlerObject | boolean | undefined;

// interface HttpData {
//   code: string;
//   description?: string;
//   status: number;
// }

// type ErrorHandlerFunction = (error?: HttpErrorType) => ErrorHandlerObject | boolean | undefined;

// type ErrorHandler = ErrorHandlerFunction | ErrorHandlerObject | string;

// interface ErrorHandlerMany {
//   [key: string]: ErrorHandler;
// }

// const responseHandler = (response: AxiosResponse<any>) => {
//   const { config } = response;

//   if (config.raw) {
//     return response;
//   }

//   if (response.status === 200) {
//     const data = response?.data;
//     if (!data) {
//       throw new HttpError('Erro na API. Resposta sem dados!');
//     }
//     return data;
//   }
//   throw new HttpError('Erro na API. Codigo de status invalido!');
// };

// const isErrorHandlerObject = (value: ErrorHandlerObject) => {
//   if (typeof value === 'object') {
//     return ['message', 'after', 'before'].some((x: string) => x in value);
//   }
//   return false;
// };

// class ErrorHandlerRegistry {
//   private handlers = new Map<string, ErrorHandler>();

//   private parent: ErrorHandlerRegistry | null = null;

//   constructor(parent?: ErrorHandlerRegistry, input?: ErrorHandlerMany) {
//     if (typeof parent !== 'undefined') {
//       this.parent = parent;
//     }

//     if (typeof input !== 'undefined') {
//       this.registerMany(input);
//     }
//   }

//   register(key: string, handler: ErrorHandler) {
//     this.handlers.set(key, handler);
//     return this;
//   }

//   unregister(key: string) {
//     this.handlers.delete(key);
//     return this;
//   }

//   find(seek: string): ErrorHandler | undefined {
//     const handler = this.handlers.get(seek);
//     if (handler) {
//       return handler;
//     }
//     return this.parent?.find(seek);
//   }

//   registerMany(input: ErrorHandlerMany) {
//     for (const [key, value] of Object.entries(input)) {
//       this.register(key, value);
//     }
//     return this;
//   }

//   handlerError(
//     this: ErrorHandlerRegistry,
//     seek: (string | undefined)[] | string,
//     error: HttpErrorType,
//   ): boolean {
//     if (Array.isArray(seek)) {
//       return seek.some((key) => {
//         if (key !== 'undefined') {
//           return this.handlerError(String(key), error);
//         }
//         return undefined;
//       });
//     }

//     const handler = this.handlers.get(String(seek));

//     if (!handler) {
//       return false;
//     } else if (typeof handler === 'string') {
//       return this.handlerErrorObject(error, {
//         message: handler,
//       });
//     } else if (typeof handler === 'function') {
//       const result = handler(error) as ErrorHandlerObject;
//       if (isErrorHandlerObject(result)) {
//         return this.handlerErrorObject(error, result);
//       }
//       return !!result;
//     } else if (isErrorHandlerObject(handler)) {
//       return this.handlerErrorObject(error, handler);
//     }
//     return false;
//   }

//   handlerErrorObject(error: HttpErrorType, options: ErrorHandlerObject = {}) {
//     options?.before?.(error, options);
//     // Exibir algum toast de erro
//     return true;
//   }

//   responseErrorHandler(this: ErrorHandlerRegistry, error: HttpErrorType, direct?: boolean) {
//     if (error === null) {
//       throw new Error('Unrecoverrable error!!! Error is null');
//     }

//     if (axios.isAxiosError(error)) {
//       const { response, config } = error;
//       const data = response?.data as HttpData;

//       if (!direct && config?.raw) {
//         throw error;
//       }

//       const seekers = [
//         data?.code,
//         error?.code,
//         error?.name,
//         String(data?.status),
//         String(response?.status),
//       ];

//       const result = this.handlerError(seekers, error);

//       if (!result) {
//         if (data?.code && data?.description) {
//           return this.handlerErrorObject(error, {
//             message: data?.description,
//           });
//         }
//       }
//     } else if (error instanceof Error) {
//       return this.handlerError(error.name, error);
//     }

//     throw error;
//   }
// }

// const globalHandlers = new ErrorHandlerRegistry();
// // registerGlobalError(globalHandlers);

// export class HttpError extends Error {
//   constructor(message?: string) {
//     super(message); // 'Error' breaks prototype chain here
//     this.name = 'HttpError';
//     Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
//   }
// }

// export const registerError = (key: string, handler: ErrorHandler) => {
//   globalHandlers.register(key, handler);
// };

// export const dealWith = (solutions: ErrorHandlerMany, ignoreGlobal: boolean) => {
//   let global;
//   if (!ignoreGlobal) {
//     global = globalHandlers;
//   }
//   const localHandler = new ErrorHandlerRegistry(global, solutions);

//   return (error: HttpErrorType) => localHandler.responseErrorHandler(error, true);
// };

// const createHttpInstance = (): AxiosInstance => {
//   const instance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//   });

//   //   if (authProvider.token) {
//   //     instance.defaults.headers.Authorization = `${authProvider.token.token_type} ${authProvider.token.access_token}`;
//   //     instance.defaults.headers.Accept = 'application/json, text/plain, */*';
//   //   }

//   const responseError = (error: HttpErrorType) => globalHandlers.responseErrorHandler(error);
//   instance.interceptors.response.use(responseHandler, responseError);
//   return instance;
// };

// export const http: AxiosInstance = createHttpInstance();
