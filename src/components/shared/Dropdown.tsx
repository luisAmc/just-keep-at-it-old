import { buttonStyles } from './Button';
import { ComponentType, Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Link from 'next/link';

interface DropdownProps {
  direction?: 'left' | 'right';
  trigger: ReactNode;
  children: ReactNode;
}

export function Dropdown({
  direction = 'left',
  trigger,
  children
}: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={twMerge(
          clsx(
            buttonStyles({ variant: 'ghost' }),
            'inline-block rounded-full p-0.5'
          )
        )}
      >
        {trigger}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            'absolute z-20 mt-2 w-56 origin-top-right divide-y divide-brand-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none',
            direction === 'left' ? 'left-0' : 'right-0'
          )}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

interface DropdownItemProps {
  variant?: 'default' | 'danger';
  label: string;
  href?: string;
  onClick?: () => void;
  icon: ComponentType<any>;
  disabled?: boolean;
}

export function DropdownItem({
  variant = 'default',
  label,
  href,
  onClick,
  icon: Icon,
  disabled = false
}: DropdownItemProps) {
  return (
    <div className="p-1">
      <Menu.Item disabled={disabled}>
        {({ active, disabled }) => {
          const className = clsx(
            'flex w-full items-center rounded-md px-3 py-2.5 text-sm',
            variant === 'danger' && 'text-red-500',
            active && {
              'bg-brand-400': variant === 'default',
              'bg-red-500 text-white': variant === 'danger'
            },
            disabled && 'text-brand-300 cursor-not-allowed'
          );

          return href ? (
            <Link href={href} className={className}>
              <Icon className="mr-1 h-4 w-4" />
              <span>{label}</span>
            </Link>
          ) : (
            <button type="button" onClick={onClick} className={className}>
              <Icon className="mr-1 h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        }}
      </Menu.Item>
    </div>
  );
}
