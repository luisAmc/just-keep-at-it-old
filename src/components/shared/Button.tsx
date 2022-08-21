import clsx from 'clsx';
import { ButtonOrLink, ButtonOrLinkProps } from './ButtonOrLink';

export interface Props extends ButtonOrLinkProps {
  variant?: 'primary' | 'secondary' | 'danger';
  rounded?: boolean;
  floating?: boolean;
}

export function Button({
  variant = 'primary',
  rounded,
  floating,
  type,
  ...props
}: Props) {
  return (
    <ButtonOrLink
      className={clsx(
        'flex items-center justify-center px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80',
        rounded ? 'rounded-xl py-2' : 'rounded',
        floating && ' shadow-xl',
        {
          'bg-brand-500 text-white': variant === 'primary',
          'bg-gray-200 text-gray-900 focus:ring-gray-500':
            variant === 'secondary',
          'bg-red-500 text-white focus:ring-red-500': variant === 'danger'
        }
      )}
      type={type || 'button'}
      {...props}
    />
  );
}
