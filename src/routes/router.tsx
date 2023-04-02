import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from 'src/layout';
import { MessagePage } from 'src/pages';
import LoginPage from '../pages/Login/LoginPage';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <MessagePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);
