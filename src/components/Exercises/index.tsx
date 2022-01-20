import { ExerciseType, MuscleGroup } from '@prisma/client';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-hooks';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Pill } from '../ui/Pill';
import { Table, TableDataCell, TableHeader, TableRow } from '../ui/Table';
import { Exercises_exercise$key } from './__generated__/Exercises_exercise.graphql';

export const query = graphql`
  query ExercisesQuery {
    exercises {
      ...Exercises_exercise
    }
  }
`;

interface Props {
  exercises: Exercises_exercise$key;
}

export function Exercises({ exercises }: Props) {
  const data = useFragment(
    graphql`
      fragment Exercises_exercise on Exercise @relay(plural: true) {
        id
        name
        type
        muscleGroup
      }
    `,
    exercises
  );

  return (
    <div>
      <Container
        href='/'
        size='2xl'
        title='Ejercicios'
        action={<Button href='/exercises/create'>Nuevo Ejercicio</Button>}
      >
        {data &&
          (data.length === 0 ? (
            <p>No se han creado ejercicios.</p>
          ) : (
            <Table
              itemsPerPage={10}
              values={data}
              header={
                <>
                  <TableHeader label='#' />
                  <TableHeader label='Nombre' />
                  <TableHeader label='Tipo' className='text-center' />
                  <TableHeader label='Grupo múscular' className='text-center' />
                </>
              }
            >
              {(exercise, i) => (
                <TableRow key={exercise.id}>
                  <TableDataCell>{i + 1}</TableDataCell>
                  <TableDataCell>{exercise.name}</TableDataCell>
                  <TableDataCell className='text-center'>
                    <Pill
                      variant={exercise.type as ExerciseType}
                      text={
                        exercise.type === ExerciseType.AEROBIC
                          ? 'Aerobico'
                          : 'Fuerza'
                      }
                    />
                  </TableDataCell>
                  <TableDataCell className='text-center'>
                    {exercise.muscleGroup ? (
                      <Pill
                        variant={exercise.muscleGroup as MuscleGroup}
                        text={
                          {
                            [MuscleGroup.ARMS]: 'Brazos',
                            [MuscleGroup.CHEST]: 'Pecho',
                            [MuscleGroup.BACK]: 'Espalda',
                            [MuscleGroup.LEGS]: 'Piernas',
                            [MuscleGroup.SHOULDERS]: 'Hombros'
                          }[(exercise.muscleGroup as MuscleGroup) ?? '']
                        }
                      />
                    ) : (
                      '-'
                    )}
                  </TableDataCell>
                </TableRow>
              )}
            </Table>
          ))}
      </Container>
    </div>
  );
}
