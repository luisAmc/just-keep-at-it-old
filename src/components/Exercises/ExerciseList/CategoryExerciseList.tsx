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
      className="flex flex-col divide-y divide-brand-400"
    >
      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="group flex items-center justify-between px-5 py-3"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm">{exercise.name}</span>

              <span className="hidden items-center justify-center group-hover:flex">
                <span className="rounded-full bg-slate-300 p-1"></span>
              </span>
            </div>

            <div className="flex space-x-2">
              <Button
                className="rounded-full bg-brand-400 p-1 hover:bg-opacity-50"
                href={`/exercises/${exercise.id}/history`}
              >
                <ChartBarIcon className="h-5 w-5" />
              </Button>

              <Button
                className="rounded-full bg-brand-400 p-1 hover:bg-opacity-50"
                href={`/exercises/${exercise.id}/edit`}
              >
                <PencilSquareIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center space-y-2 rounded-md bg-slate-700 p-6 text-slate-300">
          <SparklesIcon className="h-8 w-8" />
          <p className="text-sm">No hay ejercicios en esta categoría...</p>
        </div>
      )}

      {creatingExercise ? (
        <CreateExercise onClose={() => setCreatingExercise(false)} />
      ) : (
        <Button variant="secondary" onClick={() => setCreatingExercise(true)}>
          <PlusCircleIcon className="mr-1 h-4 w-4" />
          <span>Añadir un ejercicio</span>
        </Button>
      )}
    </div>
  );
}
