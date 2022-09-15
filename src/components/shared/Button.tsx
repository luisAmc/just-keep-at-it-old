import { ButtonOrLink, ButtonOrLinkProps } from './ButtonOrLink';
import clsx from 'clsx';

export interface Props extends ButtonOrLinkProps {
  color?: 'primary' | 'secondary' | 'danger';
  variant?: 'default' | 'dashed';
  rounded?: boolean;
  floating?: boolean;
}

export const Button = ({
  variant = 'default',
  color = 'primary',
  rounded,
  floating,
  type,
  ...props
}: Props) => {
  return (
    <ButtonOrLink
      className={clsx(
        'appearance-none w-full flex items-center justify-center px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80',
        rounded ? 'rounded-full' : 'rounded',
        floating && ' shadow-xl',
        variant === 'default' && {
          'bg-brand-600 text-white': color === 'primary',
          'bg-gray-200 text-gray-900': color === 'secondary',
          'bg-red-500 text-white': color === 'danger'
        },
        variant === 'dashed' && 'border-2 border-dashed',
        variant === 'dashed' && {
          'border-brand-300 text-brand-600 hover:bg-brand-50':
            color === 'primary',
          'border-gray-300 text-gray-600 hover:bg-gray-100':
            color === 'secondary'
        }
      )}
      type={type || 'button'}
      {...props}
    />
  );
};
