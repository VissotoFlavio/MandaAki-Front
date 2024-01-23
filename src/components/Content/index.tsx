import { FC, ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
}

const Content: FC<ContainerProps> = (props): JSX.Element => {
  return <div className="mt-14 p-4 sm:ml-64">{props.children}</div>;
};

export default Content;
