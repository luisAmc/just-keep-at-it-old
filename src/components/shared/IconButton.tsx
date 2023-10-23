import { ComponentType, ReactNode } from 'react';
import { ButtonOrLink, ButtonOrLinkProps } from './ButtonOrLink';
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from './Button';
import clsx from 'clsx';

interface Props extends ButtonOrLinkProps {
  icon: ComponentType<any>;
}

export function IconButton({ icon: Icon, ...props }: Props) {
  return (
    <ButtonOrLink
      type="button"
      className={twMerge(
        clsx(
          buttonStyles({ variant: 'ghost' }),
          'inline-block rounded-full p-0.5'
        )
      )}
      {...props}
    >
      <Icon />
    </ButtonOrLink>
  );
}
