import { decrypt, encrypt } from './security.service';

export const GetLocalStorage = <T>(key: string, initialValue: T): T => {
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

export const SetLocalStorage = <T>(key: string, value: T) => {
  try {
    const encryptedValue = encrypt(value);
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error(`Error encrypting and storing value in localStorage for key "${key}":`, error);
  }
};

export const RemoveLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
