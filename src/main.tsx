import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from './contexts/auth.context.tsx';
import { ToastProvider } from './contexts/toast.context.tsx';
import { Routes } from './routers/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
);
