import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from 'src/layout';
import ConversationLayout from 'src/layout/ConversationLayout';
import { ConversationPage, HomePage, MessagePage } from 'src/pages';
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
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/conversations',
        element: <ConversationLayout />,
        children: [
          {
            index: true,
            element: <ConversationPage />,
          },
          {
            path: ':conversationId',
            element: <MessagePage />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);
