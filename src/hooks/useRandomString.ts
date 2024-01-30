import { useEffect, useState } from 'react';
import { generateRandomString } from '../services/random-string.service';

export const useRandomString = (length: number): string => {
  const [randomString, setRandomString] = useState<string>('');

  useEffect(() => {
    setRandomString(generateRandomString(length));
  }, [length]);

  return randomString;
};
