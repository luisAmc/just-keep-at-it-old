import {
  NoSymbolIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ComponentType } from 'react';
import { Button } from './Button';
import { Modal, ModalProps } from './Modal';

interface ConfirmationModalProps extends ModalProps {
  type?: 'warning' | 'error';
  onConfirm: () => void;
}

export function ConfirmationModal({
  type = 'error',
  open,
  onClose,
  onConfirm,
  children
}: ConfirmationModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='flex flex-col space-y-4'>
        <div
          className={clsx(
            'mx-auto flex items-center justify-center bg-red-100 rounded-full w-14 h-14',
            {
              'bg-red-200': type === 'error',
              'bg-amber-100': type === 'warning'
            }
          )}
        >
          {type === 'error' ? (
            <NoSymbolIcon className='w-8 h-8 text-red-500' />
          ) : (
            <ExclamationCircleIcon className='w-8 h-8 text-amber-500' />
          )}
        </div>

        <div className='text-center font-medium'>{children}</div>

        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <Button
            color={type === 'error' ? 'danger' : 'primary'}
            onClick={onConfirm}
          >
            {type === 'error' ? (
              <TrashIcon className='w-4 h-4 mr-1' />
            ) : (
              <CheckCircleIcon className='w-4 h-4 mr-1' />
            )}
            <span>Aceptar</span>
          </Button>

          <Button color='secondary' onClick={onClose}>
            <XMarkIcon className='w-4 h-4 mr-1' />
            <span>Cancelar</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
