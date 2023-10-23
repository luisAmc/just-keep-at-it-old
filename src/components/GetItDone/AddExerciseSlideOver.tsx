import { useQuery } from '@apollo/client';
import { SlideOver, SlideOverProps } from 'src/components/shared/SlideOver';
import { EXERCISES_QUERY } from 'src/components/Exercises';
import {
  ExercisesQuery,
  Exercise_Exercise
} from 'src/components/Exercises/__generated__/index.generated';
import {
  ExerciseCategoryProvider,
  useExerciseCategoryContext
} from 'src/components/Exercises/ExerciseList/useExerciseCategoryContext';
import { CategoryHeader } from 'src/components/Exercises/ExerciseList/CategoryHeader';
import { useState } from 'react';
import { PlusCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { CreateExercise } from 'src/components/Exercises/ExerciseList/CreateExercise';
import { Button } from 'src/components/shared/Button';
import { useWorkoutContext } from './Workout/WorkoutContext';

interface Props extends Omit<SlideOverProps, 'title' | 'children'> {
  onConfirm(exerciseId: string): void;
}

export function AddExerciseSlideOver({ onConfirm, open, onClose }: Props) {
  const { addExercise } = useWorkoutContext();

  const { data, loading } = useQuery<ExercisesQuery>(EXERCISES_QUERY);

  const categories = data?.viewer?.exerciseCategories ?? [];

  return (
    <SlideOver title="Anadir un ejercicio" open={open} onClose={onClose}>
      {loading && <div>Cargando...</div>}

      {data && (
        <div className="flex flex-col space-y-4 pb-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col rounded-lg bg-brand-100 shadow-sm"
            >
              <ExerciseCategoryProvider category={category}>
                <CategoryHeader />

                <ExerciseList
                  addExerciseToWorkout={(clickedExercise) => {
                    addExercise(clickedExercise);
                    onConfirm(clickedExercise.id);
                    onClose();
                  }}
                />
              </ExerciseCategoryProvider>
            </div>
          ))}
        </div>
      )}
    </SlideOver>
  );
}

interface ExerciseListProps {
  addExerciseToWorkout: (exercise: Exercise_Exercise) => void;
}

function ExerciseList({ addExerciseToWorkout }: ExerciseListProps) {
  const { exercises } = useExerciseCategoryContext();

  const [creatingExercise, setCreatingExercise] = useState(false);

  return (
    <div className="flex flex-col divide-brand-300">
      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => addExerciseToWorkout(exercise)}
            className="group flex items-center justify-between px-5 py-3 hover:bg-white/20"
          >
            <div className="flex items-center space-x-2">
              <span className="">{exercise.name}</span>

              <span className="hidden items-center justify-center group-hover:flex">
                <span className="rounded-full bg-brand-600 p-1"></span>
              </span>
            </div>
          </button>
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
