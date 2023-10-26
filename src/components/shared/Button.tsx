import { ButtonOrLink, ButtonOrLinkProps } from './ButtonOrLink';
import { cva, VariantProps } from 'class-variance-authority';

export const buttonStyles = cva(
  [
    'w-full text-sm appearance-none inline-flex items-center justify-center relative rounded hover:bg-opacity-80 transition-opacity',
    'disabled:opacity-60 disabled:pointer-events-none'
  ],
  {
    variants: {
      variant: {
        primary: 'bg-brand-500 text-brand-50 hover:bg-brand-600',
        secondary: 'text-brand-950 hover:bg-brand-200',
        outline:
          'border border-brand-700 text-brand-700 hover:bg-brand-50 transition ease-in-out',
        danger: 'bg-rose-500 text-rose-50',
        floating: 'bg-brand-700 text-brand-50 shadow-xl rounded-full',
        dashed:
          'bg-brand-700 text-brand-300 border-2 border-dashed border-brand-500',
        ghost: 'text-brand-700 border border-transparent hover:border-brand-700'
      },
      size: {
        sm: 'px-2.5 py-1.5',
        md: 'px-4 py-2.5 font-medium'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    ButtonOrLinkProps {
  rounded?: boolean;
}

export const Button = ({
  variant,
  size,
  rounded,
  type,
  ...props
}: ButtonProps) => {
  return (
    <ButtonOrLink
      type={type || 'button'}
      className={buttonStyles({ variant, size })}
      {...props}
    />
  );
};
