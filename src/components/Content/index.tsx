import { FC, ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
}

const Content: FC<ContainerProps> = (props): JSX.Element => {
  return <div className="min-h-screen flex-1 bg-gray-100 p-4 pt-16 sm:ml-64">{props.children}</div>;
};

export default Content;
