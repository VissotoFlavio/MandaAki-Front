import { FC } from 'react';

export const LogoText: FC = (): JSX.Element => {
  return (
    <p className="flex items-center text-2xl font-semibold">
      <span className="text-blue-800">MAND</span>
      <span className="text-red-500">AKI</span>
    </p>
  );
};
