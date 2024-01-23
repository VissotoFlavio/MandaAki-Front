import { AlignJustify } from 'lucide-react';
import { FC } from 'react';
import { Link } from '../Link';
import { LogoImg } from '../LogoImg/LogoImg';
import { LogoText } from '../LogoText/LogoText';
import { NavbarUser } from './Navbar-User';
import { NavbarLang } from './Navbar.lang.pt-br';

export interface NavbarProps {
  OnClickMenu: (() => void) | undefined;
}
export const Navbar: FC<NavbarProps> = (props): JSX.Element => {
  const handlerButtonMenu = () => {
    if (props.OnClickMenu) {
      props.OnClickMenu();
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 sm:hidden"
              onClick={handlerButtonMenu}>
              <span className="sr-only">{NavbarLang.MenuButtonText}</span>
              <AlignJustify className="h-6 w-6" />
            </button>
            <Link href="/" className="ms-2 flex items-center md:mr-24">
              <LogoImg />
              <LogoText />
            </Link>
          </div>
          <NavbarUser />
        </div>
      </div>
    </nav>
  );
};
