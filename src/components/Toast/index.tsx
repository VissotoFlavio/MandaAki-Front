import { AlertTriangle, CheckCircle, X, XCircle } from 'lucide-react';
import { FC, useEffect, useRef } from 'react';
import { tv } from 'tailwind-variants';

export interface ToastProps {
  message: string;
  close?: () => void;
  timeout?: number;
  icon?: 'success' | 'error' | 'alert';
}

const VariantsStyle = tv({
  base: 'p-1 rounded',
  variants: {
    type: {
      success: 'bg-green-200 text-green-500',
      error: 'bg-red-200 text-red-500',
      alert: 'bg-yellow-200 text-yellow-600',
    },
  },
  defaultVariants: {
    type: 'success',
  },
});

export const Toast: FC<ToastProps> = (props: ToastProps): JSX.Element => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = props.close;
  }, [props.close]);

  useEffect(() => {
    if (props.timeout === null) {
      return;
    }

    const id = setTimeout(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, props.timeout);

    return () => clearTimeout(id);
  }, [props.timeout]);

  const handleClose = () => {
    if (props.close) {
      props.close();
    }
  };

  return (
    <div className="relative flex min-w-72 items-center justify-center space-x-4 rounded bg-white p-4 text-gray-500 shadow-md">
      <div
        className={VariantsStyle({
          type: props.icon,
        })}>
        {props.icon === 'alert' && <AlertTriangle className="h-4 w-4" />}
        {props.icon === 'error' && <XCircle className="h-4 w-4" />}
        {props.icon === 'success' && <CheckCircle className="h-4 w-4" />}
      </div>
      <div className="inline-flex items-center justify-center rounded">
        <p className="text-sm font-normal">{props.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white p-2 hover:bg-black/10">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
