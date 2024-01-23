import { FC, ReactNode } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const LoadingIconVariantsStyle = tv({
  base: 'animate-spin',
  variants: {
    color: {
      default: 'text-white',
      black: 'text-black',
      gray: 'text-gray-500',
    },
    size: {
      default: 'h-5 w-5',
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      lg: 'h-7 w-7',
      xl: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
  },
});

export interface LoadingIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'color'>,
    VariantProps<typeof LoadingIconVariantsStyle> {}

const LoadingIcon: FC<LoadingIconProps> = ({
  size,
  color,
  className,
  ...props
}: LoadingIconProps): ReactNode => {
  return (
    <svg
      className={LoadingIconVariantsStyle({
        size,
        color,
        className,
      })}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default LoadingIcon;
