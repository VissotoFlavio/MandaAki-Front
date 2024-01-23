import { FC } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const StyleVariantsStyle = tv({
  base: '',
  variants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-20 w-20',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface LogoImgProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'color'>,
    VariantProps<typeof StyleVariantsStyle> {}

export const LogoImg: FC<LogoImgProps> = (props): JSX.Element => {
  return (
    <img
      src="assets/images/logo.png"
      className={StyleVariantsStyle({ size: props.size })}
      alt="Logo"
    />
  );
};
