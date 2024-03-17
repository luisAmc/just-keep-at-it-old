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

type ACTION_TYPE =
  | { type: 'addExercise' }
  | { type: 'changeExercise'; changeIndex: number };

export function useAddExerciseSlideOver() {
  const [action, setAction] = useState<ACTION_TYPE | null>(null);

  return {
    open: (action: ACTION_TYPE) => {
      setAction(action);
    },
    close: () => setAction(null),
    props: {
      action: action,
      open: action !== null,
      onClose() {
        setAction(null);
      }
    }
  };
}

interface Props extends Omit<SlideOverProps, 'title' | 'children'> {
  action: ACTION_TYPE | null;
  onConfirm(exerciseId: string): void;
  onChange(exerciseId: string, exerciseIndex: number): void;
}

export function AddExerciseSlideOver({
  action,
  open,
  onConfirm,
  onChange,
  onClose
}: Props) {
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
                    if (!action) {
                      return;
                    }

                    if (action.type === 'addExercise') {
                      addExercise(clickedExercise);
                      onConfirm(clickedExercise.id);
                      onClose();
                    } else if (action.type === 'changeExercise') {
                      addExercise(clickedExercise);
                      onChange(clickedExercise.id, action.changeIndex);
                      onClose();
                    }
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
    <div className="p-2">
      {exercises.length > 0 ? (
        exercises.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => addExerciseToWorkout(exercise)}
            className="w-full rounded-md p-3 hover:bg-brand-300"
          >
            <div className="flex items-center space-x-2 text-sm">
              <span className="">{exercise.name}</span>
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
