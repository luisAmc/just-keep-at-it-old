import { SparklesIcon } from '@heroicons/react/24/outline';

export function EmptyWorkouts() {
  return (
    <div className='flex flex-col items-center space-y-2 p-8 bg-slate-700 rounded-md text-slate-300'>
      <SparklesIcon className='w-10 h-10' />
      <p className='font-semibold text-sm'>
        No hay rutinas creadas hasta el momento...
      </p>
    </div>
  );
}
