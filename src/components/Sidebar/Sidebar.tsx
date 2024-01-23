import { FC, useEffect, useState } from 'react';
import { useAPIUser } from '../../hooks/api/useAPIUser';
import { MenuDetail } from '../../models/user/menu.model';
import Button from '../Button';
import { Icons } from './../Svg';
import { Highlight } from './Sidebar-Highlight';
import { MenuItens } from './Sidebar-MenuItens';
import { SideBarLang } from './Sidebar.lang.pt-br';
const Sidebar: FC = (): JSX.Element => {
  const apiUser = useAPIUser();

  const [menus, setMenus] = useState<MenuDetail[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMenu, setIsErrorMenu] = useState(false);

  const highlight = {
    title: 'Titulo',
    message: 'Aqui você pode escolher uma mensagem para que seja exibida nesse bloco em destaque.',
    link: {
      label: 'Acesse aqui para navegar',
      href: '#',
    },
  };

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async () => {
    setIsErrorMenu(false);
    setIsLoading(true);
    setMenus(null);
    try {
      const res = await apiUser.menus();
      if (res?.itens) {
        setMenus(res.itens);
      }
      setIsErrorMenu(false);
    } catch (error) {
      console.log(error);
      setIsErrorMenu(true);
    }
    setIsLoading(false);
  };

  const handleTryAgain = () => {
    setIsErrorMenu(false);
    getMenu();
  };

  const idSidebarApp = 'IdSidebarApp';
  return (
    <aside
      id={idSidebarApp}
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full pt-14 transition-transform sm:translate-x-0"
      aria-label="Sidebar">
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4">
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <Icons.Loading size="xl" color="gray" />
          </div>
        )}
        {isErrorMenu && (
          <div className="flex h-full items-center justify-center">
            <Button label={SideBarLang.ButtonTryAgain} onClick={handleTryAgain} />
          </div>
        )}
        {menus && (
          <>
            <MenuItens itens={menus} />
            <Highlight {...highlight} />
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
