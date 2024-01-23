import { FC, InputHTMLAttributes, forwardRef } from 'react';
import { useRandomString } from '../../hooks/useRandomString';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'class' | 'type'> {
  label: string;
}

export const Checkbox: FC<CheckboxProps> = forwardRef(
  (props, ref: React.LegacyRef<HTMLInputElement>): JSX.Element => {
    const randomId = useRandomString(10);
    return (
      <div className="flex items-center justify-center">
        <div className="flex h-5 items-center">
          <input
            {...props}
            ref={ref}
            id={randomId}
            aria-describedby={props.label}
            type="checkbox"
            className="h-4 w-4 rounded border border-gray-300 bg-gray-50"
          />
        </div>
        <div className="ml-1 h-5 text-sm">
          <label htmlFor={randomId}>{props.label}</label>
        </div>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
