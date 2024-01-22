import { ButtonHTMLAttributes, ElementType, FC } from 'react';
import { VariantProps, tv } from 'tailwind-variants';
import { useRandomString } from '../../hooks/useRandomString';
import { Icons } from '../Svg';

export type ButtonType = 'button' | 'submit';

const ButtonVariantsStyle = tv({
  base: 'flex justify-center text-white font-medium rounded-lg text-sm',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      success: 'bg-green-700 hover:bg-green-800',
      danger: 'bg-red-600 hover:bg-red-700',
      warning: 'bg-yellow-400 hover:bg-yellow-500',
      info: 'bg-sky-400 hover:bg-sky-500',
      light: 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700',
    },
    size: {
      default: 'px-5 py-2.5 text-sm',
      xs: 'px-3 py-2 text-xs',
      sm: 'px-3 py-2 text-sm',
      lg: 'px-5 py-3 text-base',
      xl: 'px-6 py-3.5 text-base',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'primary',
  },
});

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'class' | 'type' | 'color'>,
    VariantProps<typeof ButtonVariantsStyle> {
  label: string;
  type?: ButtonType;
  loading?: boolean;
  icon?: ElementType;
}

const Button: FC<ButtonProps> = (props): JSX.Element => {
  const randomId = useRandomString(10);
  return (
    <button
      id={randomId}
      type="button"
      {...props}
      className={ButtonVariantsStyle({
        size: props.size,
        color: props.color,
        className: props.className,
      })}>
      {props.loading ? <Icons.Loading /> : props.label}
    </button>
  );
};

export default Button;
