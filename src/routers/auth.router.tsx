import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Auth } from '../Auth';
import { WelcomePage } from '../pages/auth/Welcome/WelcomePage';
import { LoginPage } from '../pages/auth/login/login.page';
import { RecoverPassword } from '../pages/auth/recover-password/RecoverPassword';
import { RegisterPage } from '../pages/auth/register/RegisterPage';
import { Error404NotFoundPage } from '../pages/errors/notfound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/welcome',
        element: <WelcomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/recover-password',
        element: <RecoverPassword />,
      },
      {
        path: '*',
        element: <Error404NotFoundPage />,
      },
    ],
  },
]);

export const AuthRouter = () => {
  return <RouterProvider router={router} />;
};
