import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  GetLocalStorage,
  RemoveLocalStorage,
  SetLocalStorage,
} from '../services/localStorage.service';

type StoredValue<T> = [T, Dispatch<SetStateAction<T>>];

export const useLocalStorage = <T>(key: string, initialValue: T | null): StoredValue<T | null> => {
  const [value, setValue] = useState<T | null>(() => GetLocalStorage(key, initialValue));

  useEffect(() => {
    if (value) {
      SetLocalStorage(key, value);
    } else {
      RemoveLocalStorage(key);
    }
  }, [key, value]);

  return [value, setValue];
};
