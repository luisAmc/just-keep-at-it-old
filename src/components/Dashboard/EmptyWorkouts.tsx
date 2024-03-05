import { SparklesIcon } from '@heroicons/react/24/outline';

export function EmptyWorkouts() {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-md bg-brand-100 p-8 text-brand-700">
      <SparklesIcon className="h-10 w-10" />
      <p className="text-sm font-semibold">
        No hay rutinas creadas hasta el momento...
      </p>
    </div>
  );
}
