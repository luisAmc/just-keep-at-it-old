import { buttonStyles } from './Button';
import { ComponentType, Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

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
            'z-20 absolute mt-2 w-56 origin-top-right divide-y divide-brand-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none',
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
  label: string;
  href?: string;
  onClick?: () => void;
  icon: ComponentType<any>;
  disabled?: boolean;
}

export function DropdownItem({
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
            active && 'bg-brand-400',
            disabled && 'text-brand-300 cursor-not-allowed'
          );

          return href ? (
            <a href={href} className={className}>
              <Icon className="mr-1 h-4 w-4" />
              <span>{label}</span>
            </a>
          ) : (
            <button onClick={onClick} className={className}>
              <Icon className="mr-1 h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        }}
      </Menu.Item>
    </div>
  );
}