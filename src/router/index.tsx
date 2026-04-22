import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/Home';
import ToolPage from '../pages/ToolPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'tool/:toolId',
        element: <ToolPage />,
      },
      {
        path: '*',
        element: <Home />,
      },
    ],
  },
]);