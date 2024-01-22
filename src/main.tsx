import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from './contexts/auth.context.tsx';
import { Routes } from './routers/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
);
