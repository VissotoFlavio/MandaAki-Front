import { ChevronDown, LogOut, icons } from 'lucide-react';
import { FC, useState } from 'react';
import { MenuDetail } from '../../models/user/menu.model';
import { Link } from '../Link';
import { SideBarLang } from './Sidebar.lang.pt-br';

export interface MenuItensProps {
  itens: MenuDetail[] | null;
}

const renderSubItem = (item: MenuDetail) => {
  return (
    <li key={item.id}>
      <Link
        href={item.link}
        className="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-100">
        {item.label}
      </Link>
    </li>
  );
};

const RenderPrincipalWithSub = (item: MenuDetail) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const LucideIcon = icons[item.icon ? item.icon : 'PanelLeftOpen'];
  const idDropdown = `dropdown-${item.id}`;

  const handleToggleSubmenu = () => {
    setShowSubmenu((prevValue) => !prevValue);
  };

  return (
    <div>
      <button
        type="button"
        className="group flex w-full items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-gray-100"
        onClick={handleToggleSubmenu}>
        <LucideIcon className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
        <span className="ms-3 flex-1 whitespace-nowrap text-left rtl:text-right">{item.label}</span>
        <ChevronDown className={'h-5 w-5 duration-200 ' + (showSubmenu ? 'rotate-180' : '')} />
      </button>
      <ul
        id={idDropdown}
        data-show={showSubmenu}
        className="space-y-2 py-2 data-[show=false]:hidden">
        {item &&
          item.subs &&
          item.subs.map((x: MenuDetail) => {
            return renderSubItem(x);
          })}
      </ul>
    </div>
  );
};

const RenderPrincipal = (item: MenuDetail) => {
  const LucideIcon = icons[item.icon ? item.icon : 'PanelLeftOpen'];
  return (
    <div>
      <Link
        href={item.link}
        className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
        <LucideIcon className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
        <span className="ms-3 flex-1 whitespace-nowrap">{item.label}</span>
        {item.count && (
          <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800">
            {item.count}
          </span>
        )}
      </Link>
    </div>
  );
};

const RenderItem = (item: MenuDetail): JSX.Element => {
  return (
    <>{item.subs && item.subs.length > 0 ? RenderPrincipalWithSub(item) : RenderPrincipal(item)}</>
  );
};

export const MenuItens: FC<MenuItensProps> = (props): JSX.Element => {
  return (
    <ul className="space-y-2 font-medium">
      {props.itens?.map((item: MenuDetail) => {
        return <li key={item.id}>{RenderItem(item)}</li>;
      })}

      <li>
        <Link
          href="/logout"
          className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
          <LogOut className="h-5 w-5 text-gray-500 transition duration-75" />
          <span className="ms-3 flex-1 whitespace-nowrap">{SideBarLang.MenuLogoutText}</span>
        </Link>
      </li>
    </ul>
  );
};
