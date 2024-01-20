import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { RequireAuth } from '../contexts/auth.context';
import { HomePage } from './home/homePage';
import { LoginPage } from './login/loginPage';
import { RegisterPage } from './register/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },
      {
        path: 'home',
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
