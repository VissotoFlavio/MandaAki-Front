import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from './contexts/auth.context.tsx';
import { AppRouter } from './pages/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>,
);
