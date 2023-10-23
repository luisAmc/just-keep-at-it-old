import { Button } from 'src/components/shared/Button';
import {
  ChevronUpIcon,
  PlusIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';
import { ExerciseType } from '@prisma/client';
import { gql } from '@apollo/client';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useWorkoutExerciseContext } from './WorkoutExerciseContext';
import { WorkoutExerciseActions } from './WorkoutExerciseActions';
import { WorkoutExerciseSet } from './WorkoutExerciseSet';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import clsx from 'clsx';

export const WorkoutSetFragment = gql`
  fragment WorkoutExercise_workoutSet on WorkoutSet {
    id
    mins
    distance
    kcal
    lbs
    reps
  }
`;

export const LastSessionFragment = gql`
  fragment WorkoutExercise_lastSession on WorkoutExercise {
    sets {
      ...WorkoutExercise_workoutSet
    }
  }
  ${WorkoutSetFragment}
`;

export const ExerciseFragment = gql`
  fragment WorkoutExercise_exercise on Exercise {
    id
    name
    type
    lastSession {
      ...WorkoutExercise_lastSession
    }
  }
  ${LastSessionFragment}
`;

export const WorkoutExerciseFragment = gql`
  fragment WorkoutExercise_workoutExercise on WorkoutExercise {
    id
    exerciseIndex
    exercise {
      ...WorkoutExercise_exercise
    }
    sets {
      ...WorkoutExercise_workoutSet
    }
  }
  ${ExerciseFragment}
  ${WorkoutSetFragment}
`;

export function WorkoutExercise() {
  const workoutExercise = useWorkoutExerciseContext();

  const [animateParent] = useAutoAnimate<HTMLDivElement>();

  const form = useFormContext();

  const sets = useFieldArray({
    control: form.control,
    name: `${workoutExercise.formFieldName}.sets`
  });

  useEffect(() => {
    if (
      workoutExercise.mostRecentSession &&
      workoutExercise.mostRecentSession.sets.length > sets.fields.length
    ) {
      const differenceInSets =
        workoutExercise.mostRecentSession.sets.length - sets.fields.length;

      Array.from({ length: differenceInSets }).forEach((_) => addSet());
    }
  }, []);

  function addSet() {
    sets.append({ mins: '', distance: '', kcal: '', reps: '', lbs: '' });
  }

  function removeSet(index: number) {
    sets.remove(index);
  }

  return (
    <div ref={animateParent}>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <div className="flex items-center space-x-4">
              <div className="flex w-full items-center justify-between">
                <Button
                  onClick={() => workoutExercise.onSelect(workoutExercise.id)}
                  className="rounded px-2 py-1 text-left transition hover:bg-white/10"
                >
                  {workoutExercise.name}
                </Button>

                <Disclosure.Button className="flex items-center space-x-2 rounded-lg px-2 py-1 transition hover:bg-white/5">
                  <span className="whitespace-nowrap text-sm">
                    {sets.fields.length} sets
                  </span>

                  <ChevronUpIcon
                    className={clsx('h-4 w-4', open && 'rotate-180 transform')}
                  />
                </Disclosure.Button>
              </div>

              <WorkoutExerciseActions />
            </div>

            <Disclosure.Panel className="pt-4">
              {sets.fields.map((field, index) => (
                <WorkoutExerciseSet
                  key={field.id}
                  index={index}
                  type={workoutExercise.type as ExerciseType}
                  onRemove={() => removeSet(index)}
                />
              ))}

              {sets.fields.length === 0 ? (
                <button
                  type="button"
                  className="group flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-brand-600 py-5 text-brand-500 hover:border-brand-300"
                  onClick={addSet}
                >
                  <SparklesIcon className="h-6 w-6 group-hover:text-brand-700" />
                  <span className="font-semibold group-hover:text-brand-700">
                    Comenzar
                  </span>
                </button>
              ) : (
                <Button variant="ghost" onClick={addSet}>
                  <PlusIcon className="mr-1 h-4 w-4" />
                  <span>Añadir set</span>
                </Button>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
