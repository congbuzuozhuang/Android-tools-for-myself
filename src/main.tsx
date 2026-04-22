import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme';
import { AppProvider } from './store/AppContext';
import { router } from './router';
import './styles/global.css';
import './tools/tools.css';
import './tools/calculator';
import './tools/countdown';
import './tools/notepad';
import './tools/template';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);