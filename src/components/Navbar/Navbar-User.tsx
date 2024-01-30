import { FC, JSX, useState } from 'react';
import { useAuth } from '../../contexts/auth.context';
import { useScreenSize } from '../../hooks/useScreenSize';
import { Link } from '../Link';

interface RenderProps {
  href: string;
  label: string;
}
const renderItemLink: FC<RenderProps> = (props: RenderProps): JSX.Element => {
  return (
    <li>
      <Link
        href={props.href}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
        {props.label}
      </Link>
    </li>
  );
};

export const NavbarUser = (): JSX.Element => {
  const apiAuth = useAuth();
  const resize = useScreenSize();

  const [showMenu, setShowMenu] = useState(false);

  const handleButtonUser = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      <div className="ms-3 flex items-center">
        <div>
          <button
            type="button"
            className="flex rounded-full bg-gray-800 text-sm"
            onClick={handleButtonUser}>
            <span className="sr-only">Abrir menu do usuário</span>
            <img className="h-8 w-8 rounded-full" src={apiAuth.user?.img} alt="user photo" />
          </button>
        </div>
        <div
          data-show={showMenu}
          className="absolute z-50 my-4 block w-[200px] list-none divide-y divide-gray-100 rounded bg-white text-base shadow data-[show=false]:hidden"
          style={{
            inset: '0px auto auto 0px',
            position: 'absolute',
            margin: 0,
            transform: 'translate(' + (resize.width - 205) + 'px, 50px)',
          }}>
          <div className="px-4 py-3" role="none">
            <p className="text-sm text-gray-900 dark:text-white" role="none">
              {apiAuth.user?.name}
            </p>
            <p
              className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
              role="none">
              {apiAuth.user?.email}
            </p>
          </div>
          <ul className="py-1" role="none">
            {renderItemLink({
              href: '/',
              label: 'Dashboard',
            })}
            {renderItemLink({
              href: '/perfil',
              label: 'Perfil',
            })}
            {renderItemLink({
              href: '/logout',
              label: 'Sair',
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
