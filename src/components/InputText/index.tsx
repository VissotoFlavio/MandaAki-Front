import { FC, InputHTMLAttributes } from 'react';
import { useRandomString } from '../../hooks/useRandomString';

export type InputTextType =
  | 'email'
  | 'hidden'
  | 'month'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'time'
  | 'url';

export interface InputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
  label?: string;
  type?: InputTextType;
}

export const InputText: FC<InputTextProps> = (props): JSX.Element => {
  const randomId = useRandomString(10);
  return (
    <div>
      <label htmlFor={randomId} className="block mb-2 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <input
        id={randomId}
        type="text"
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
    </div>
  );
};
