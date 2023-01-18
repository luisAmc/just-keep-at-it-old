import { ComponentType } from 'react';
import { ButtonOrLink, ButtonOrLinkProps } from './ButtonOrLink';

interface Props extends ButtonOrLinkProps {
  icon: ComponentType<any>;
}

export function IconButton({ icon: Icon, ...props }: Props) {
  return (
    <ButtonOrLink
      type='button'
      className='inline-flex items-center justify-center rounded-full p-2 active:bg-slate-600'
      {...props}
    >
      <Icon className='w-4 h-4' />
    </ButtonOrLink>
  );
}
