export const PerfilPage = () => {
  return (
    <main className="text-sm">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <div className="flex flex-col space-y-4 rounded-lg bg-white p-4">
        <div className="flex flex-col justify-between gap-y-2 md:flex-row">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-lg"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt=""
            />
            <div className="space-y-2 px-2">
              <h2 className="text-2xl font-semibold capitalize">flavio vissoto</h2>
              <div>
                <p>Data de Cadastro: 29/01/2024</p>
              </div>
            </div>
          </div>
          <div className="flex max-w-72 flex-wrap gap-2">
            <div>
              <p className="w-32 rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-300 via-sky-500 to-sky-700 p-4 text-center text-gray-800 hover:from-sky-200 hover:via-sky-400 hover:to-sky-600">
                Iniciante
              </p>
            </div>
            <div>
              <p className="w-32 rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-300 via-green-500 to-green-700 p-4 text-center text-gray-800 hover:from-green-200 hover:via-green-400 hover:to-green-600">
                Intermediário
              </p>
            </div>
            <div>
              <p className="hover:to_gray-400 w-32 rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300 via-gray-400 to-gray-500 p-4 text-center hover:from-gray-200 hover:via-gray-300 hover:to-gray-400">
                Avançado
              </p>
            </div>
            <div>
              <p className="w-32 rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200 via-yellow-400 to-yellow-700 p-4 text-center text-gray-800 hover:from-yellow-100 hover:via-yellow-300 hover:to-yellow-600">
                Especialista
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-sm text-gray-400">E-mail</p>
          <p className="font-semibold">teste@teste.com</p>
        </div>
        <div className="">
          <p className="text-gray-400">Contatos</p>
          <div className="flex">
            <p className="font-semibold">+55 (11) 91234-4567 / +55 (11) 91234-4567</p>
          </div>
        </div>
      </div>
    </main>
  );
};
