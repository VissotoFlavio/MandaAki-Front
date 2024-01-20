import { useEffect, useState } from 'react';

export const useRandomString = (length: number): string => {
  const [randomString, setRandomString] = useState<string>('');

  useEffect(() => {
    const generateRandomString = (): string => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    };

    setRandomString(generateRandomString());
  }, [length]);

  return randomString;
};
