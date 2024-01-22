import { useAuth } from '../contexts/auth.context';
import { WelcomePage } from '../pages/auth/Welcome/WelcomePage';
import { AppRouter } from './app.router';
import { AuthRouter } from './auth.router';

export const Routes = () => {
  const authContext = useAuth();

  if (authContext.loading && authContext.showWelcome) {
    return <WelcomePage />;
  }

  if (authContext.signed) {
    return <AppRouter />;
  } else {
    return <AuthRouter />;
  }
};
