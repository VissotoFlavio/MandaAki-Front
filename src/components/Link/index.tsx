import { AnchorHTMLAttributes, FC } from 'react';
import { useRandomString } from '../../hooks/useRandomString';

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'class'> {
  label: string;
}

export const Link: FC<LinkProps> = (props): JSX.Element => {
  const randomId = useRandomString(25);
  return (
    <a id={randomId} {...props} className="text-sm font-medium text-primary-600 hover:underline">
      {props.label}
    </a>
  );
};
