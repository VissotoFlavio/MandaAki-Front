import { FC, InputHTMLAttributes } from 'react';
import { useRandomString } from '../../hooks/useRandomString';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
  label: string;
}

export const Checkbox: FC<CheckboxProps> = (props): JSX.Element => {
  const randomId = useRandomString(10);
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center h-5">
        <input
          id={randomId}
          aria-describedby={props.label}
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
        />
      </div>
      <div className="ml-1 text-sm h-5">
        <label htmlFor={randomId}>{props.label}</label>
      </div>
    </div>
  );
};
