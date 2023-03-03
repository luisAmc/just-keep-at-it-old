import { Button } from 'src/components/shared/Button';
import { ExerciseCategory } from './ExerciseCategory';
import { ExerciseFragment } from '../Workout/WorkoutExercise';
import { gql, useQuery } from '@apollo/client';
import { SlideOver, SlideOverProps } from 'src/components/shared/SlideOver';
import { useExerciseCategories } from '../Workout/WorkoutUtils';
import { useWorkoutContext } from '../Workout/WorkoutContext';
import { AddExerciseSlideOverQuery } from './__generated__/index.generated';

interface Props extends Omit<SlideOverProps, 'title' | 'children'> {
  onConfirm(exerciseId: string): void;
}

export const AddExerciseSlideOverQuery_query = gql`
  query AddExerciseSlideOverQuery {
    viewer {
      id
      exercises {
        ...WorkoutExercise_exercise
      }
    }
  }
  ${ExerciseFragment}
`;

export function AddExerciseSlideOver({ onConfirm, open, onClose }: Props) {
  const { addExercise } = useWorkoutContext();

  const { data, loading } = useQuery<AddExerciseSlideOverQuery>(
    AddExerciseSlideOverQuery_query
  );

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
