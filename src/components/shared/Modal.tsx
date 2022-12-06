import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';

export function useModal() {
  const [open, setOpen] = useState(false);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    props: {
      open,
      onClose() {
        setOpen(false);
      }
    }
  };
}

export interface ModalProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function Modal({ title, open, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          as='div'
          className='relative z-10'
          onClose={onClose}
        >
          <motion.div
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='fixed inset-0 bg-black bg-opacity-40' />
          </motion.div>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center my-4 text-center'>
              <motion.div
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Dialog.Panel className='flex flex-col space-y-4 w-full max-w-md transform rounded-xl bg-slate-600 p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex items-center justify-between'>
                    <Dialog.Title
                      as='h3'
                      className='text-xl font-medium leading-6 text-slate-50'
                    >
                      {title}
                    </Dialog.Title>

                    <button
                      type='button'
                      className='rounded-full bg-slate-600 text-slate-50 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-400'
                      onClick={onClose}
                    >
                      <XIcon className='h-6 w-6' />
                    </button>
                  </div>

                  <div className='mt-2'>{children}</div>
                </Dialog.Panel>
              </motion.div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
