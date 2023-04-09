import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';
import { useUserStore } from './store';

export default function App() {
  return <RouterProvider router={router} />;
}
