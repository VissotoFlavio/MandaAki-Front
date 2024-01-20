import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox';
import { InputText } from '../../components/InputText';
import { Link } from '../../components/Link';
export const LoginPage = (): JSX.Element => {
  return (
    <section className="bg-gray-50">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-16 h-16 mr-2 rounded-full" src="/assets/images/logo.png" alt="logo" />
          <span className="text-blue-800">MAND</span>
          <span className="text-red-500">AKI</span>
        </a>

        {/* Conteudo */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Faça login na sua conta
            </h1>

            {/* Dica */}
            <div>
              <p>Utilize para acessar:</p>
              <p>
                Email: <span className="font-bold">teste@teste.com</span>{' '}
              </p>
              <p>
                Senha: <span className="font-bold">segredo</span>{' '}
              </p>
            </div>

            {/* Formulario */}
            <form className="space-y-4 md:space-y-6" action="#">
              <InputText label="Email" placeholder="email@email.com" />
              <InputText label="Senha" placeholder="••••••••" type="password" />
              <div className="flex items-center justify-between">
                <Checkbox label="Lembrar" />
                <Link label="Esqueceu a senha?" href="#" />
              </div>
              <Button label="Acessar" />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Não tem conta? <Link label="Cadastre-se" href="#" />
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
