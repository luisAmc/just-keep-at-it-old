import { CheckCircleIcon } from '@heroicons/react/outline';
import { ExerciseType, MuscleGroup } from '@prisma/client';
import { ExerciseTypeSelector } from './ExerciseTypeSelector';
import { Input } from 'src/components/shared/Input';
import { MuscleGroupSelector } from './MuscleGroupSelector';
import { object, string } from 'zod';
import { SubmitButton } from 'src/components/shared/SubmitButton';
import { Transition } from '@headlessui/react';
import { useFormContext, useWatch } from 'react-hook-form';

export const CreateExerciseSchema = object({
  name: string().min(1, 'Ingrese el nombre.'),
  type: string().min(1, 'Seccione el tipo.'),
  muscleGroup: string().optional()
}).refine(
  (data) => {
    const isStrength = data.type === ExerciseType.STRENGTH;
    const isMuscleGroupSelected = data.muscleGroup !== undefined;

    return (isStrength && isMuscleGroupSelected) || !isStrength;
  },
  {
    message: 'Seleccione el grupo múscular.',
    path: ['muscleGroup']
  }
);

export function CreateExerciseForm() {
  const form = useFormContext();

  const type = useWatch({ control: form.control, name: 'type' });

  return (
    <>
      <Input {...form.register('name')} label='Nombre' />

      <ExerciseTypeSelector
        name='type'
        label='Tipo'
        options={[
          {
            label: 'Aerobico',
            description:
              'Ejercicios para estimular la actividad cardiaca y pulmonar, pueden ser realizados por un periodo extenso de tiempo.',
            value: ExerciseType.AEROBIC
          },
          {
            label: 'Fuerza',
            description:
              'Ejercicios para fortalecer los músculos y aumentar su resistencia, normalmente ejecutados en grupos de repeticiones.',
            value: ExerciseType.STRENGTH
          }
        ]}
      />

      <Transition
        show={type === ExerciseType.STRENGTH}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <MuscleGroupSelector
          name='muscleGroup'
          label='Grupo múscular'
          options={[
            { label: 'Brazos', value: MuscleGroup.ARMS },
            { label: 'Espalda', value: MuscleGroup.BACK },
            { label: 'Pecho', value: MuscleGroup.CHEST },
            { label: 'Piernas', value: MuscleGroup.LEGS },
            { label: 'Hombros', value: MuscleGroup.SHOULDERS }
          ]}
        />
      </Transition>

      <div className='flex-auto'></div>

      <SubmitButton>
        <CheckCircleIcon className='w-4 h-4 mr-1' />
        <span>Crear Ejercicio</span>
      </SubmitButton>
    </>
  );
}
