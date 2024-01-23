import { FC } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const StyleVariantsStyle = tv({
  base: 'fixed inset-0 z-30 bg-gray-900/70 transition-opacity opacity-0 duration-500',
  variants: {
    show: {
      true: 'opacity-100',
    },
  },
});

interface BackdropProps extends VariantProps<typeof StyleVariantsStyle> {
  onClick?: () => void;
}

export const Backdrop: FC<BackdropProps> = (props): JSX.Element => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <div
      className={StyleVariantsStyle({
        show: props.show,
      })}
      onClick={handleClick}
    />
  );
};
