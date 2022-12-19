import { gql, useQuery } from '@apollo/client';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'src/components/shared/Button';
import { SlideOver, SlideOverProps } from 'src/components/shared/SlideOver';
import { useWorkoutContext } from '../Workout/WorkoutContext';
import { ExerciseFragment } from '../Workout/WorkoutExercise';
import { useExerciseCategories } from '../Workout/WorkoutUtils';
import { ExerciseCategory } from './ExerciseCategory';
import { AddExerciseSlideOverQuery } from './__generated__/index.generated';

interface Props extends Omit<SlideOverProps, 'title' | 'children'> {
  onConfirm(exerciseId: string): void;
}

export function AddExerciseSlideOver({ onConfirm, open, onClose }: Props) {
  const { addExercise } = useWorkoutContext();

  const { data, loading } = useQuery<AddExerciseSlideOverQuery>(gql`
    query AddExerciseSlideOverQuery {
      viewer {
        id
        exercises {
          ...WorkoutExercise_exercise
        }
      }
    }
    ${ExerciseFragment}
  `);

  const exerciseCategories = useExerciseCategories(data?.viewer?.exercises);

  return (
    <SlideOver title='Anadir un ejercicio' open={open} onClose={onClose}>
      {loading && <div>Cargando...</div>}

      {data && (
        <div className='bg-slate-700 p-2 rounded-lg flex flex-col space-y-4'>
          {exerciseCategories.map((category) => (
            <ExerciseCategory
              key={category.id}
              category={category}
              onClick={(clickedExercise) => {
                addExercise(clickedExercise);
                onConfirm(clickedExercise.id);
                onClose();
              }}
            />
          ))}
        </div>
      )}

      <div className='py-4'>
        <Button href='/exercises/create' color='secondary' variant='dashed'>
          ¿El ejercicio no está en la lista?
        </Button>
      </div>
    </SlideOver>
  );
}
