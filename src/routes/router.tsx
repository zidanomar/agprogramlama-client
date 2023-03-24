import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from 'src/layout';
import { MessagePage } from 'src/pages';
import LoginPage from '../pages/Login/LoginPage';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MessagePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
