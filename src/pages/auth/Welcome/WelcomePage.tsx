export const WelcomePage = (): JSX.Element => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
        <img className="mr-2 h-16 w-16 rounded-full" src="/assets/images/logo.png" alt="logo" />
        <span className="text-blue-800">MAND</span>
        <span className="text-red-500">AKI</span>
      </div>
    </div>
  );
};
