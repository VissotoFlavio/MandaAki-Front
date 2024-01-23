import { AnchorHTMLAttributes, FC, ReactNode } from 'react';
import { Link as LinkDom } from 'react-router-dom';
import { useRandomString } from '../../hooks/useRandomString';

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'class' | 'href'> {
  children: ReactNode;
  href: string;
}

export const Link: FC<LinkProps> = (props): JSX.Element => {
  const randomId = useRandomString(25);
  return (
    <LinkDom id={randomId} to={props.href} {...props}>
      {props.children}
    </LinkDom>
  );
};
