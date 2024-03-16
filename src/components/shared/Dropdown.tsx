import { buttonStyles } from './Button';
import { ComponentType, useState, type ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { cn } from 'src/utils/cn';
import {
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles
} from '@floating-ui/react';

interface DropdownProps {
  direction?: 'left' | 'right';
  trigger: ReactNode;
  children: ReactNode;
}

export function Dropdown({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const { refs, context, floatingStyles } = useFloating({
    placement: 'bottom-end',
    open,
    onOpenChange: setOpen,
    middleware: [offset(4), flip(), shift({ padding: 4 })]
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)
  ]);

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 100,
    initial: { opacity: 0 }
  });

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        {...getReferenceProps({ ref: refs.setReference })}
        className={twMerge(
          cn(
            buttonStyles({ variant: 'ghost' }),
            'inline-block rounded-full p-0.5'
          )
        )}
      >
        {trigger}
      </Menu.Button>

      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              className={cn(
                'absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none'
              )}
              style={{
                ...transitionStyles,
                ...floatingStyles
              }}
              {...getFloatingProps()}
            >
              <Menu.Items>{children}</Menu.Items>
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
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
    <Menu.Item disabled={disabled}>
      {({ active, disabled }) => {
        const className = cn(
          'flex w-full items-center rounded-md px-3 py-2.5 text-sm',
          variant === 'danger' && 'text-red-600',
          active && 'bg-gray-100',
          disabled && 'text-gray-300 cursor-not-allowed'
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
  );
}

interface DropdownGroupProps {
  title?: string;
  children: ReactNode;
}

export function DropdownGroup({ title, children }: DropdownGroupProps) {
  return (
    <div className="p-1">
      {title && (
        <div className="px-2 py-1.5 text-xs font-medium text-brand-700">
          {title}
        </div>
      )}

      {children}
    </div>
  );
}
