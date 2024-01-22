import CryptoJS from 'crypto-js';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type StoredValue<T> = [T, Dispatch<SetStateAction<T>>];

const ENCRYPTION_KEY = 'sua-chave-de-criptografia';

const encrypt = <T>(value: T): string => {
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), ENCRYPTION_KEY).toString();
  return encryptedValue;
};

const decrypt = <T>(encryptedValue: string): T => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
  const decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
  return decryptedValue;
};

const getInitialValue = <T>(key: string, initialValue: T): T => {
  const storedValue = localStorage.getItem(key);
  if (storedValue !== null) {
    try {
      return decrypt<T>(storedValue);
    } catch (error) {
      console.error(`Error decrypting localStorage value for key "${key}":`, error);
    }
  }
  return initialValue;
};

export const useLocalStorage = <T>(key: string, initialValue: T | null): StoredValue<T | null> => {
  const [value, setValue] = useState<T | null>(() => getInitialValue(key, initialValue));

  useEffect(() => {
    if (value) {
      try {
        const encryptedValue = encrypt(value);
        localStorage.setItem(key, encryptedValue);
      } catch (error) {
        console.error(
          `Error encrypting and storing value in localStorage for key "${key}":`,
          error,
        );
      }
    }
  }, [key, value]);

  return [value, setValue];
};
