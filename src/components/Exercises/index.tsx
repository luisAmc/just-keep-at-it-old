import { useQuery } from 'react-query';
import { ExerciseType } from 'src/models/Exercise';
import {
  EXERCISE_TYPE,
  getExercises,
  MUSCLE_GROUP
} from 'src/resolvers/ExercisesResolver';
import { CreateExerciseModal } from '../Home/CreateExerciseModal';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { useModal } from '../ui/Modal';
import { Pill } from '../ui/Pill';
import { Table, TableDataCell, TableHeader, TableRow } from '../ui/Table';

export function Exercises() {
  const createModal = useModal();

  const { data, isLoading } = useQuery<{
    exercises: (ExerciseType & { _id: string })[];
  }>('exercises', () => getExercises());

  return (
    <div>
      <Container
        size='2xl'
        title='Ejercicios'
        action={<Button onClick={createModal.open}>Nuevo Ejercicio</Button>}
      >
        {data &&
          (data.exercises.length === 0 ? (
            <p>No se han creado ejercicios.</p>
          ) : (
            <Table
              values={data.exercises ?? []}
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
                <TableRow key={exercise._id}>
                  <TableDataCell>{i + 1}</TableDataCell>
                  <TableDataCell>{exercise.name}</TableDataCell>
                  <TableDataCell className='text-center'>
                    <Pill
                      variant={exercise.type}
                      text={
                        exercise.type === EXERCISE_TYPE.AEROBIC
                          ? 'Aerobico'
                          : 'Fuerza'
                      }
                    />
                  </TableDataCell>
                  <TableDataCell className='text-center'>
                    <Pill
                      variant={exercise.muscleGroup}
                      text={
                        {
                          [MUSCLE_GROUP.ARMS]: 'Brazos',
                          [MUSCLE_GROUP.CHEST]: 'Pecho',
                          [MUSCLE_GROUP.BACK]: 'Espalda',
                          [MUSCLE_GROUP.LEGS]: 'Piernas',
                          [MUSCLE_GROUP.SHOULDERS]: 'Hombros'
                        }[exercise.muscleGroup]
                      }
                    />
                  </TableDataCell>
                </TableRow>
              )}
            </Table>
          ))}
      </Container>

      <CreateExerciseModal {...createModal.props} />
    </div>
  );
}
