import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { AjudaPage } from '../pages/app/ajuda/cadastrar.page';
import { DestinatarioCadastrarPage } from '../pages/app/destinatario/cadastrar/cadastrar.page';
import { DestinatarioListarPage } from '../pages/app/destinatario/listar/listar.page';
import { EnviosPage } from '../pages/app/envios/financeiro.page';
import { FinanceiroPage } from '../pages/app/financeiro/financeiro.page';
import { HomePage } from '../pages/app/home/home.page';
import { LogoutPage } from '../pages/app/logout/logout.page';
import { PerfilPage } from '../pages/app/perfil/perfil.page';
import { Error404NotFoundPage } from '../pages/errors/notfound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/financeiro',
        element: <FinanceiroPage />,
      },
      {
        path: '/destinatarios',
        children: [
          {
            path: '',
            index: true,
            element: <DestinatarioCadastrarPage />,
          },
          {
            path: 'cadastrar',
            element: <DestinatarioCadastrarPage />,
          },
          {
            path: 'listar',
            element: <DestinatarioListarPage />,
          },
        ],
      },
      {
        path: '/perfil',
        element: <PerfilPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/envios',
        element: <EnviosPage />,
      },
      {
        path: '/ajuda',
        element: <AjudaPage />,
      },
      {
        path: '/logout',
        element: <LogoutPage />,
      },
      {
        path: '*',
        element: <Error404NotFoundPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
