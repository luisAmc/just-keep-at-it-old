import { PlusIcon, SparklesIcon } from '@heroicons/react/outline';
import { ExerciseType } from '@prisma/client';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'src/components/shared/Button';
import { RepetitionSet } from './RepetitionSet';
import { TimeSet } from './TimeSet';
import { GetItDoneQuery } from './__generated__/index.generated';

interface ExerciseSetInputProps {
  workoutExerciseId: string;
  exercise: GetItDoneQuery['workout']['workoutExercises'][0]['exercise'];
  lastSession: GetItDoneQuery['workout']['workoutExercises'][0]['lastSession'];
  isDisabled: boolean;
}

export function ExerciseSetInput({
  workoutExerciseId,
  exercise,
  lastSession,
  isDisabled
}: ExerciseSetInputProps) {
  const { control } = useFormContext();

  const sets = useFieldArray({
    control,
    name: `workoutExercises.${workoutExerciseId}.sets`
  });

  const isAerobic = exercise.type === ExerciseType.AEROBIC;

  return (
    <div className='px-4 py-4 rounded-lg bg-gray-100 text-gray-700'>
      <div className='flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='font-medium'>{exercise.name}</h2>

          <span className='font-medium text-sm'>{sets.fields.length} sets</span>
        </div>

        {sets.fields.length > 0 &&
          (isAerobic ? (
            <div className='flex flex-col divide-y divide-gray-300 bg-gray-200 p-2 rounded-lg'>
              {sets.fields.map((field, index) => (
                <TimeSet
                  key={field.id}
                  setId={index}
                  exerciseId={workoutExerciseId}
                  isDisabled={isDisabled}
                  remove={() => sets.remove(index)}
                />
              ))}
            </div>
          ) : (
            <div className='flex flex-col divide-y divide-gray-300 bg-gray-200 p-2 rounded-lg'>
              {sets.fields.map((field, index) => (
                <RepetitionSet
                  key={field.id}
                  setId={index}
                  exerciseId={workoutExerciseId}
                  isDisabled={isDisabled}
                  remove={() => sets.remove(index)}
                />
              ))}
            </div>
          ))}

        {!isDisabled &&
          (sets.fields.length === 0 ? (
            <button
              type='button'
              className='flex flex-col items-center justify-center py-5 text-gray-500 border-2 border-dashed border-gray-300 group hover:border-gray-400 rounded-lg'
              onClick={() =>
                sets.append({
                  mins: '',
                  distance: '',
                  kcal: '',
                  reps: '',
                  lbs: ''
                })
              }
            >
              <SparklesIcon className='w-6 h-6 group-hover:text-gray-600' />
              <span className='font-semibold group-hover:text-gray-600'>
                Comenzar
              </span>
            </button>
          ) : (
            <Button
              color='secondary'
              onClick={() =>
                sets.append({
                  mins: '',
                  distance: '',
                  kcal: '',
                  reps: '',
                  lbs: ''
                })
              }
            >
              <PlusIcon className='w-4 h-4 mr-1' />
              <span>Añadir set</span>
            </Button>
          ))}

        {lastSession && lastSession.sets.length > 0 && (
          <div className='flex flex-col divide-y divide-gray-300 bg-gray-200 p-2 rounded-lg'>
            {lastSession.sets.map((set) => (
              <div key={set.id} className='flex items-center justify-center'>
                {lastSession.exercise.type === ExerciseType.AEROBIC ? (
                  <AerobicSet
                    mins={set.mins}
                    distance={set.distance}
                    kcal={set.kcal}
                  />
                ) : (
                  <StrengthSet lbs={set.lbs} reps={set.reps} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface AerobicSetProps {
  mins?: number | null;
  distance?: number | null;
  kcal?: number | null;
}

function AerobicSet({ mins, distance, kcal }: AerobicSetProps) {
  return (
    <div className='grid grid-cols-3 gap-6'>
      <span>
        <span className='text-lg font-medium'>{mins}</span>
        <span className='text-sm ml-1'>mins</span>
      </span>

      <span>
        <span className='text-lg font-medium'>{distance}</span>
        <span className='text-sm ml-1'>dist</span>
      </span>

      <span>
        <span className='text-lg font-medium'>{kcal}</span>
        <span className='text-sm ml-1'>kcal</span>
      </span>
    </div>
  );
}

interface StrengthSetProps {
  lbs?: number | null;
  reps?: number | null;
}

function StrengthSet({ lbs, reps }: StrengthSetProps) {
  return (
    <div className='grid grid-cols-2 gap-6'>
      <span>
        <span className='text-lg font-medium'>{lbs}</span>
        <span className='text-sm ml-1'>lbs</span>
      </span>

      <span>
        <span className='text-lg font-medium'>{reps}</span>
        <span className='text-sm ml-1'>reps</span>
      </span>
    </div>
  );
}
