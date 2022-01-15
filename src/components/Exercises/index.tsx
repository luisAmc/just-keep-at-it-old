import { ExerciseType, MuscleGroup } from '@prisma/client';
import { graphql, useQuery } from 'relay-hooks';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Pill } from '../ui/Pill';
import { Table, TableDataCell, TableHeader, TableRow } from '../ui/Table';
import { ExercisesQuery } from './__generated__/ExercisesQuery.graphql';

export function Exercises() {
  const { data, isLoading, error } = useQuery<ExercisesQuery>(
    graphql`
      query ExercisesQuery {
        exercises {
          id
          name
          type
          muscleGroup
        }
      }
    `,
    {}
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
          (data.exercises.length === 0 ? (
            <p>No se han creado ejercicios.</p>
          ) : (
            <Table
              itemsPerPage={10}
              values={data.exercises}
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
                      variant={exercise.type as keyof typeof ExerciseType}
                      text={
                        exercise.type === ExerciseType.AEROBIC
                          ? 'Aerobico'
                          : 'Fuerza'
                      }
                    />
                  </TableDataCell>
                  <TableDataCell className='text-center'>
                    <Pill
                      variant={exercise.muscleGroup as keyof typeof MuscleGroup}
                      text={
                        {
                          [MuscleGroup.ARMS]: 'Brazos',
                          [MuscleGroup.CHEST]: 'Pecho',
                          [MuscleGroup.BACK]: 'Espalda',
                          [MuscleGroup.LEGS]: 'Piernas',
                          [MuscleGroup.SHOULDERS]: 'Hombros'
                        }[
                          (exercise.muscleGroup as keyof typeof MuscleGroup) ??
                            ''
                        ]
                      }
                    />
                  </TableDataCell>
                </TableRow>
              )}
            </Table>
          ))}
      </Container>
    </div>
  );
}
