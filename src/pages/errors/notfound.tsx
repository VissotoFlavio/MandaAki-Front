import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

export const Error404NotFoundPage = () => {
  const navigate = useNavigate();

  const handlerButton = () => {
    navigate('/');
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-black">Página não encontrada</h1>
      <p className="max-w-96">
        Sentimos muito pelo inconveniente. Parece que você está tentando acessar uma página que foi
        excluída ou que nunca existiu.
      </p>
      <Button label="Ir para tela inicial" onClick={handlerButton} />
    </div>
  );
};
