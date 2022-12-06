import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';

export function useSlideOver() {
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

export interface SlideOverProps {
  title: string;
  open: boolean;
  onClose(): void;
  children: ReactNode;
}

export function SlideOver({ title, open, onClose, children }: SlideOverProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          as='div'
          className='relative z-20'
          open={open}
          onClose={onClose}
        >
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='fixed inset-0 bg-black/40' />
          </motion.div>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <motion.div
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md h-screen'>
                    <div className='flex h-full flex-col overflow-y-scroll bg-slate-800 shadow-xl'>
                      <div className='top-0 sticky z-20 bg-slate-800/70 backdrop-blur-sm px-4 sm:px-6 pt-6 pb-4'>
                        <div className='flex items-start justify-between'>
                          <Dialog.Title className='text-lg font-medium text-slate-200'>
                            {title}
                          </Dialog.Title>
                          <div className='ml-3 flex h-7 items-center'>
                            <button
                              type='button'
                              className='rounded-md bg-slate-700 text-slate-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-500'
                              onClick={onClose}
                            >
                              <XIcon className='h-6 w-6' aria-hidden='true' />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className='relative flex flex-col flex-1 px-4 sm:px-6'>
                        {children}
                      </div>
                    </div>
                  </Dialog.Panel>
                </motion.div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
