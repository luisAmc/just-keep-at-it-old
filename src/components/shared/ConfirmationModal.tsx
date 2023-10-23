import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from './Button';
import { Modal, ModalProps } from './Modal';
import clsx from 'clsx';

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
      <div className="flex flex-col space-y-4">
        <div
          className={clsx(
            'mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100',
            {
              'bg-red-200': type === 'error',
              'bg-amber-100': type === 'warning'
            }
          )}
        >
          {type === 'error' ? (
            <TrashIcon className="h-8 w-8 text-red-500" />
          ) : (
            <ExclamationCircleIcon className="h-8 w-8 text-amber-500" />
          )}
        </div>

        <div className="text-center font-medium">{children}</div>

        <div className="grid grid-cols-1 gap-2 pt-4 sm:grid-cols-2">
          <Button
            variant={type === 'error' ? 'danger' : 'primary'}
            onClick={onConfirm}
          >
            {type === 'error' ? (
              <TrashIcon className="mr-1 h-4 w-4" />
            ) : (
              <CheckCircleIcon className="mr-1 h-4 w-4" />
            )}
            <span>Aceptar</span>
          </Button>

          <Button variant="secondary" onClick={onClose}>
            <XMarkIcon className="mr-1 h-4 w-4" />
            <span>Cancelar</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
