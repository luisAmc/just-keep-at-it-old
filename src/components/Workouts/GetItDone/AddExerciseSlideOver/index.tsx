import {
  AddExerciseQuery,
  GetSelectedExerciseLastSession,
  GetSelectedExerciseLastSessionVariables
} from './__generated__/index.generated';
import { Button } from 'src/components/shared/Button';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { SlideOver, SlideOverProps } from 'src/components/shared/SlideOver';
import { useExerciseCategories } from './AddExerciseUtils';
import { ExerciseCategory } from './ExerciseCategory';
import { WorkoutExercise_ExerciseFragment } from '../WorkoutExercise/WorkoutExercise';
import { useWorkoutContext } from '../WorkoutExercise/Contexts/WorkoutContext';
import { ExerciseInfoFragment } from 'src/components/Exercises';

interface Props extends Omit<SlideOverProps, 'title' | 'children'> {
  onConfirm(exercise: { exerciseId: string; name: string; type: string }): void;
}

export function AddExerciseSlideOver({ onConfirm, open, onClose }: Props) {
  const { addExercise } = useWorkoutContext();

  const { data, loading } = useQuery<AddExerciseQuery>(gql`
    query AddExerciseQuery {
      viewer {
        id
        exercises {
          ...Exercise_exercise
        }
      }
    }
    ${ExerciseInfoFragment}
  `);

  const [getLastSessionOfSelectedExercise, { loading: selectedLoading }] =
    useLazyQuery<
      GetSelectedExerciseLastSession,
      GetSelectedExerciseLastSessionVariables
    >(
      gql`
        query GetSelectedExerciseLastSession($id: ID!) {
          exercise(id: $id) {
            ...WorkoutExercise_exercise
          }
        }
        ${WorkoutExercise_ExerciseFragment}
      `,
      {
        onCompleted(data) {
          if (data) {
            onConfirm({
              exerciseId: data.exercise.id,
              name: data.exercise.name,
              type: data.exercise.type
            });

            addExercise(data.exercise);
            onClose();
          }
        }
      }
    );

  const exerciseCategories = useExerciseCategories(data?.viewer?.exercises);

  return (
    <SlideOver title='Anadir un ejercicio' open={open} onClose={onClose}>
      {(loading || selectedLoading) && <div>Cargando...</div>}

      {data && (
        <div className='bg-slate-700 p-2 rounded-lg flex flex-col space-y-4'>
          {exerciseCategories.map((category) => (
            <ExerciseCategory
              key={category.id}
              category={category}
              onClick={(clickedExercise) => {
                getLastSessionOfSelectedExercise({
                  variables: { id: clickedExercise.id }
                });
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
