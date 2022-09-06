import { BanIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import { Button } from './Button';
import { Modal, ModalProps } from './Modal';

interface ConfirmationModalProps extends ModalProps {
  onConfirm: () => void;
}

export function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  children
}: ConfirmationModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='flex flex-col space-y-4'>
        <div className='mx-auto flex items-center justify-center bg-red-100 rounded-full w-14 h-14'>
          <BanIcon className='w-8 h-8 text-red-500' />
        </div>

        <div className='text-center font-medium'>{children}</div>

        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <Button color='danger' onClick={onConfirm}>
            <TrashIcon className='w-4 h-4 mr-1' />
            <span>Aceptar</span>
          </Button>

          <Button color='secondary' onClick={onClose}>
            <XIcon className='w-4 h-4 mr-1' />
            <span>Cancelar</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
