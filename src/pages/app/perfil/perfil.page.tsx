export const PerfilPage = () => {
  return (
    <main>
      <div className="py-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <div className="rounded-lg bg-white p-4">
        <div className="flex">
          <img
            className="h-24 w-24 rounded-lg"
            src="https://flowbite.com/application-ui/demo/images/users/jese-leos-2x.png"
            alt=""
          />
          <div className="space-y-2 px-2">
            <h2 className="text-2xl font-semibold capitalize">flavio vissoto</h2>
            <div>
              <p className="font-semibold">teste@teste.com</p>
              <p>Data de Cadastro: 29/01/2024</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
