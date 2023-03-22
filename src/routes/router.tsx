import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from 'src/layout';
import { MessagePage } from 'src/pages';
import LoginPage from '../pages/Login/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <MessagePage /> },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);
