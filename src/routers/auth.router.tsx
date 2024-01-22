import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { WelcomePage } from '../pages/auth/Welcome/WelcomePage';
import { LoginPage } from '../pages/auth/login/login.page';
import { RegisterPage } from '../pages/auth/register/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        element: <RegisterPage />,
      },
    ],
  },
]);

export const AuthRouter = () => {
  return <RouterProvider router={router} />;
};
