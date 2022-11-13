import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment, ReactNode, useState } from 'react';

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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/40' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
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
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
