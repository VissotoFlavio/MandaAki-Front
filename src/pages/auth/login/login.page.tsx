import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import InputText from '../../../components/InputText';
import { Link } from '../../../components/Link';
import { useAuth } from '../../../contexts/auth.context';
import { useToast } from '../../../contexts/toast.context';
import { LoginFormSchema, LoginFormType } from './logins.schema';

export const LoginPage = (): JSX.Element => {
  const authContext = useAuth();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    values: {
      email: 'teste@teste.com',
      password: 'segredo',
      rememberpass: true,
    },
  });

  const handleLogin = async (data: LoginFormType) => {
    setIsLoading(true);

    /** TODO: Realizar tratativa do login com sucesso ou erro */
    const result = await authContext.signIn(data.email, data.password);

    if (result.error) {
      toast.open({
        message: result.error.message,
        icon: 'error',
      });
    }

    setIsLoading(false);
  };

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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
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
            <FormProvider {...loginForm}>
              <div className="space-y-4 md:space-y-4">
                <InputText
                  {...loginForm.register('email', { required: true })}
                  label="Email"
                  error={{
                    show: !!loginForm.formState.errors.email,
                    message: loginForm.formState.errors.email?.message,
                  }}
                  placeholder="email@email.com"
                />

                <InputText
                  label="Senha"
                  {...loginForm.register('password', { required: true })}
                  placeholder="••••••••"
                  error={{
                    show: !!loginForm.formState.errors.password,
                    message: loginForm.formState.errors.password?.message,
                  }}
                  type="password"
                />
                <div className="flex items-center justify-between">
                  <Checkbox
                    {...loginForm.register('rememberpass', { required: true })}
                    label="Lembrar"
                  />
                  <Link href="/recover-password" className="text-sm font-light text-gray-500">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Button
                  label="Acessar"
                  color="primary"
                  className="w-full"
                  loading={isLoading}
                  onClick={loginForm.handleSubmit(handleLogin)}
                />
                <p className="text-sm font-light text-gray-500">
                  Não tem conta? <Link href="/register">Cadastre-se</Link>
                </p>
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  );
};
