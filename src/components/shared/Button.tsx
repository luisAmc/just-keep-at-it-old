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
        ghost: 'bg-transparent hover:bg-brand-100 hover:text-brand-900'
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
      // className={clsx(
      //   'appearance-none w-full flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80',
      //   {
      //     'px-2.5 py-1.5 text-xs': size === 'small',
      //     'px-4 py-2': size === 'medium'
      //   },
      //   rounded ? 'rounded-full' : 'rounded',
      //   floating && ' shadow-xl',
      //   variant === 'default' && {
      //     'bg-brand-600 text-white': color === 'primary',
      //     'bg-slate-500 text-slate-50': color === 'secondary',
      //     'bg-red-500 text-white': color === 'danger'
      //   },
      //   variant === 'dashed' && 'border-2 border-dashed',
      //   variant === 'dashed' && {
      //     'border-brand-300 text-brand-600 hover:bg-brand-50':
      //       color === 'primary',
      //     'bg-slate-700 text-slate-400 border-slate-500': color === 'secondary'
      //   }
      // )}
    />
  );
};
