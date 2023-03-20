import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  ChartBarIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from 'src/components/shared/Button';
import { IconButton } from 'src/components/shared/IconButton';
import { CreateExercise } from './CreateExercise';
import { useExerciseCategoryContext } from './useExerciseCategoryContext';

export function CategoryExerciseList() {
  const { exercises } = useExerciseCategoryContext();

  const [creatingExercise, setCreatingExercise] = useState(false);
  const [animateParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div
      ref={animateParent}
      className='flex flex-col divide-y divide-slate-600'
    >
      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <div
            key={exercise.id}
            className='px-5 py-3 flex items-center justify-between group'
          >
            <div className='flex items-center space-x-2'>
              <span className='text-sm'>{exercise.name}</span>

              <span className='hidden group-hover:flex items-center justify-center'>
                <span className='rounded-full bg-slate-300 p-1'></span>
              </span>
            </div>

            <div className='flex space-x-2'>
              <IconButton
                icon={ChartBarIcon}
                href={`/exercises/${exercise.id}`}
              />

              <IconButton
                icon={PencilSquareIcon}
                href={`/exercises/${exercise.id}/edit`}
              />
            </div>
          </div>
        ))
      ) : (
        <div className='flex flex-col items-center space-y-2 p-6 bg-slate-700 rounded-md text-slate-300'>
          <SparklesIcon className='w-8 h-8' />
          <p className='text-sm'>No hay ejercicios en esta categoría...</p>
        </div>
      )}

      {creatingExercise ? (
        <CreateExercise onClose={() => setCreatingExercise(false)} />
      ) : (
        <Button variant='secondary' onClick={() => setCreatingExercise(true)}>
          <PlusCircleIcon className='w-4 h-4 mr-1' />
          <span>Añadir un ejercicio</span>
        </Button>
      )}
    </div>
  );
}
