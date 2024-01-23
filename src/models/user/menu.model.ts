import { icons } from 'lucide-react';

export interface MenuDetail {
  id: string;
  link: string;
  label: string;
  icon?: keyof typeof icons;
  count?: number;
  selected?: boolean;
  subs?: MenuDetail[];
}

export interface UserMenuData {
  itens: MenuDetail[];
}
