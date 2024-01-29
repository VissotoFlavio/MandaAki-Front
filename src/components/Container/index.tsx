import { FC, ReactNode, useState } from 'react';
import { Backdrop } from '../Backdrop/Backdrop';
import Content from '../Content';
import { Navbar } from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

export interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = (props): JSX.Element => {
  const [openMenu, SetOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    SetOpenMenu((prevValue) => !prevValue);
  };

  return (
    <>
      <Navbar OnClickMenu={handleToggleMenu} />
      <Sidebar showMenu={openMenu} />
      <Content>{props.children}</Content>
      {openMenu && <Backdrop show={openMenu} onClick={handleToggleMenu} />}
    </>
  );
};

export default Container;
