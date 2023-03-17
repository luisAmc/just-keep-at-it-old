import { ButtonOrLink, ButtonOrLinkProps } from './ButtonOrLink';
import { cva, VariantProps } from 'class-variance-authority';

const buttonStyles = cva(
  'w-full text-sm appearance-none inline-flex items-center justify-center relative rounded hover:bg-opacity-80 transition-opacity',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-brand-50',
        secondary: 'bg-slate-500 text-slate-100',
        danger: 'bg-rose-500 text-rose-50',
        floating: 'bg-brand-700 text-brand-50 shadow-xl rounded-full',
        dashed:
          'bg-slate-700 text-slate-300 border-2 border-dashed border-slate-500',
        ghost: 'bg-transparent hover:bg-slate-600 hover:text-slate-100'
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
      className={buttonStyles({ variant, size })}
      {...props}
      type={type || 'button'}
    />
  );
};
