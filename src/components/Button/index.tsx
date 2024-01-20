import { ButtonHTMLAttributes, FC } from 'react';
import { useRandomString } from '../../hooks/useRandomString';

export type ButtonType = 'button' | 'submit';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'class' | 'type'> {
  label: string;
  type?: ButtonType;
}

export const Button: FC<ButtonProps> = (props): JSX.Element => {
  const randomId = useRandomString(10);
  return (
    <button
      id={randomId}
      type="button"
      {...props}
      className="w-full text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      {props.label}
    </button>
  );
};
