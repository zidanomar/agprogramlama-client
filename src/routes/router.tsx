import { createBrowserRouter } from 'react-router-dom';
import { MessagePage } from 'src/pages';
import LoginPage from '../pages/Login/LoginPage';

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
