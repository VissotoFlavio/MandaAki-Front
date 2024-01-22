import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/app/home/homePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
