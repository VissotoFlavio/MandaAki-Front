import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'sua-chave-de-criptografia';

export const encrypt = <T>(value: T): string => {
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), ENCRYPTION_KEY).toString();
  return encryptedValue;
};

export const decrypt = <T>(encryptedValue: string): T => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
  const decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
  return decryptedValue;
};
