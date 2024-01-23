import { Outlet } from 'react-router-dom';
import './App.css';
import Container from './components/Container';

export const App = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
