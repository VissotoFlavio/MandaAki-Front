import { UserMenuData } from '../../models/user/menu.model';

export const useAPIUser = () => ({
  menus: async (): Promise<UserMenuData | null> => {
    return new Promise<UserMenuData | null>((resolve) => {
      setTimeout(() => {
        resolve({
          itens: [
            {
              id: 'id01',
              link: 'home',
              icon: 'PieChart',
              label: 'Dashboard',
            },
            {
              id: 'id02',
              label: 'Financeiro',
              link: 'financeiro',
              icon: 'CircleDollarSign',
            },
            {
              id: 'id03',
              label: 'Destinatários',
              link: 'destinatarios',
              icon: 'Send',
              subs: [
                {
                  id: 'id03-01',
                  label: 'Listar',
                  link: 'listar',
                },
                {
                  id: 'id03-02',
                  label: 'Cadastrar',
                  link: 'cadastrar',
                },
              ],
            },
            {
              id: 'id04',
              label: 'Envios',
              link: 'envios',
              count: 3,
              icon: 'BarChart4',
            },
            {
              id: 'id05',
              label: 'Central de Ajuda',
              link: 'help',
              icon: 'HelpCircle',
            },
          ],
        });
      }, 1000);
    });
  },
});
