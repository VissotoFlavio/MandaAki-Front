import Button from '../../../components/Button';
import InputText from '../../../components/InputText';
import { Link } from '../../../components/Link';

export const RegisterPage = (): JSX.Element => {
  return (
    <section className="bg-gray-50">
      {/* Logo */}
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <a href="#" className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
          <img className="mr-2 h-16 w-16 rounded-full" src="/assets/images/logo.png" alt="logo" />
          <span className="text-blue-800">MAND</span>
          <span className="text-red-500">AKI</span>
        </a>

        {/* Conteudo */}
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
              Cadastre-se
            </h1>

            {/* Formulario */}
            <div className="flex flex-col md:space-y-4">
              <div className="flex flex-row space-x-2">
                <InputText label="Nome" placeholder="Nome" />
                <InputText label="Sobrenome" placeholder="Sobrenome" />
              </div>
              <div className="flex flex-row space-x-2">
                <InputText label="CPF" placeholder="123.456.789-00" mask="CPF" />
                <InputText
                  label="Telefone"
                  placeholder="(XX) XXXXX-XXXX"
                  mask="Phone"
                  phonelang="Br"
                />
              </div>
              <div className="flex space-x-4">
                <InputText label="Email" placeholder="email@email.com" />
              </div>
              <div className="flex space-x-4">
                <InputText label="Confirme o Email" placeholder="email@email.com" />
              </div>
              <div className="flex space-x-4">
                <InputText label="Senha" type="password" placeholder="Senha" />
                <InputText
                  label="Confirme a Senha"
                  type="password"
                  placeholder="Confirme a senha"
                />
              </div>
              <div className="flex space-x-4">
                <Button label="Cadastrar" />
              </div>
              <p className="text-sm font-light text-gray-500">
                Já tem uma conta? <Link label="Faça o login" href="/login" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
