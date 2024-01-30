import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth.context';

export const LogoutPage = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await authContext.signOut();
      navigate('/');
    };
    logout();
  }, []);
  return (
    <>
      <div className="">
        <h1>Logout</h1>
      </div>
    </>
  );
};
