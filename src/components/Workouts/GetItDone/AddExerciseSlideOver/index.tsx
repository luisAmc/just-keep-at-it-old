import { AddExerciseQuery } from './__generated__/index.generated';
import { Button } from 'src/components/shared/Button';
import { ExerciseInfoFragment } from 'src/components/Exercises';
import { gql, useQuery } from '@apollo/client';
import { SlideOver, SlideOverProps } from 'src/components/shared/SlideOver';
import { useMemo } from 'react';
import { useExerciseCategories } from './AddExerciseUtils';
import { ExerciseCategory } from './ExerciseCategory';

interface Props extends Omit<SlideOverProps, 'title' | 'children'> {
  onConfirm(exercise: { exerciseId: string; name: string; type: string }): void;
}

export function AddExerciseSlideOver({ onConfirm, ...slideOverProps }: Props) {
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

  const exerciseCategories = useExerciseCategories(data?.viewer?.exercises);

  return (
    <SlideOver title='Anadir un ejercicio' {...slideOverProps}>
      {loading && <div>Cargando...</div>}

      {data && (
        <div className='bg-slate-700 p-2 rounded-lg flex flex-col space-y-4'>
          {exerciseCategories.map((category) => (
            <ExerciseCategory
              key={category.id}
              category={category}
              onClick={(clickedExercise) => {
                onConfirm(clickedExercise);
                slideOverProps.onClose();
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
