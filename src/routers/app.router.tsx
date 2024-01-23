import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/app/home/home.page';
import { LogoutPage } from '../pages/app/logout/logout.page';

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
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/logout',
        element: <LogoutPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
