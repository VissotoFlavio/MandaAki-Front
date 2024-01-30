import { createContext, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toast, ToastProps } from '../components/Toast';
import { generateRandomString } from '../utils/random-string.utils.';

interface ToastPropsProvider extends ToastProps {
  id: string;
}

export interface ToastContextType {
  open: (props: ToastProps) => void;
  close: (id: string) => void;
}

export const ToastProvider = ({ children }: { children: JSX.Element }) => {
  const [toasts, setToasts] = useState<ToastPropsProvider[]>([]);

  function open(props: ToastProps): void {
    setToasts((currentToasts: ToastPropsProvider[]) => {
      return [
        ...currentToasts,
        {
          id: generateRandomString(),
          message: props.message,
          timeout: props.timeout ?? 7000,
          icon: props.icon,
        },
      ];
    });
  }

  const close = (id: string): void => {
    setToasts((currentToasts: ToastPropsProvider[]) => {
      return currentToasts.filter((toast) => toast.id !== id);
    });
  };

  const contextValue = useMemo(() => ({ open, close }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div className="z-9999 fixed bottom-2 left-1/2 mx-auto my-0 w-auto -translate-x-1/2 space-y-2">
          {toasts.map((x: ToastPropsProvider) => (
            <Toast
              key={x.id}
              message={x.message}
              close={() => close(x.id)}
              timeout={x.timeout}
              icon={x.icon}
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  return context;
};
