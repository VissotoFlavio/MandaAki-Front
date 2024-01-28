export interface HttpErrorData {
  message: string;
  statusCode: number;
  statusCodeName: string;
}

export interface HttpResultData<T> {
  success?: T;
  error?: HttpErrorData;
}

export const HttpSuccessWithoutData = (): HttpErrorData => {
  return {
    message: 'Retorno sem conteúdo',
    statusCode: 200,
    statusCodeName: 'Ok',
  };
};
