import clsx from 'clsx';
import { ButtonOrLink, Props as ButtonOrLinkProps } from './ButtonOrLink';

export interface Props extends ButtonOrLinkProps {
  color?: 'primary' | 'secondary';
  variant?: 'default' | 'outlined' | 'dashed';
}

export function Button({
  color = 'primary',
  variant = 'default',
  ...props
}: Props) {
  return (
    <ButtonOrLink
      type='button'
      className={clsx(
        'flex items-center justify-center px-3 py-2 text-sm rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80 transition ease-in-out',
        variant === 'default' && {
          'bg-brand-700 text-white': color === 'primary',
          'bg-gray-200 text-gray-900 focus:ring-gray-500': color === 'secondary'
        },
        variant === 'outlined' && 'hover:bg-opacity-10',
        variant === 'outlined' && {
          'border border-brand-600 text-brand-900 hover:bg-brand-700':
            color === 'primary',
          'border border-gray-500 text-gray-900 hover:bg-gray-200':
            color === 'secondary'
        },
        variant === 'dashed' && {
          'border border-dashed border-brand-600 font-normal text-sm text-brand-900 hover:bg-brand-700':
            color === 'primary',
          'border border-dashed border-gray-500 font-normal text-sm text-gray-900 hover:bg-gray-100':
            color === 'secondary'
        }
      )}
      {...props}
    />
  );
}
