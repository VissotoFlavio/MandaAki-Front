import { FC, ReactNode } from 'react';
import Content from '../Content';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar/Sidebar';

export interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = (props): JSX.Element => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Content>{props.children}</Content>
    </>
  );
};

export default Container;
