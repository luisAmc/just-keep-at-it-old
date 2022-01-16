import {
  ArrowRightIcon,
  PlusCircleIcon,
  ZoomInIcon
} from '@heroicons/react/outline';
import { WorkoutStatus } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-hooks';
import { formatDate } from 'src/utils/transforms';
import { ButtonOrLink } from '../ui/ButtonOrLink';
import { Container } from '../ui/Container';
import { Pill } from '../ui/Pill';
import { Table, TableDataCell, TableHeader, TableRow } from '../ui/Table';
import { WorkoutCard } from '../Workouts/WorkoutCard';
import { Home_workout$key } from './__generated__/Home_workout.graphql';

interface Props {
  workouts: Home_workout$key;
}

export function Home({ workouts }: Props) {
  const router = useRouter();

  const data = useFragment(
    graphql`
      fragment Home_workout on Workout @relay(plural: true) {
        id
        name
        status
        createdAt
        workoutExercises {
          exercise {
            id
            type
            muscleGroup
          }
        }
        ...WorkoutCard_workout
      }
    `,
    workouts
  );

  return (
    <div className='h-screen max-w-5xl w-full mx-auto flex sm:pt-12'>
      <div className='flex w-full flex-col space-y-1 sm:space-y-0'>
        {data && (
          <>
            <Container
              size='5xl'
              title='Últimos entrenamientos creados'
              fill={false}
            >
              <div className='flex flex-col space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  <button
                    onClick={() => {
                      router.push('/workouts/create');
                    }}
                    className='w-full sm:max-w-xs p-6 rounded-lg shadow-sm border border-dashed border-stone-300 bg-stone-50 hover:bg-white hover:border-stone-500 group transition-all ease-in-out'
                  >
                    <div className='flex flex-col space-y-4 items-center justify-center text-stone-400 group-hover:text-stone-500'>
                      <PlusCircleIcon className='w-12 h-12' />
                      <p className='text-center font-medium'>
                        Añadir un nuevo entrenamiento
                      </p>
                    </div>
                  </button>

                  {data.length > 0 && <WorkoutCard workout={data[0]} />}

                  {data.length > 1 && <WorkoutCard workout={data[1]} />}
                </div>

                <div className='flex justify-end'>
                  <ButtonOrLink href='/exercises'>
                    <div className='px-2 py-1 flex items-center border-b border-transparent text-brand-600 text-sm font-semibold hover:border-brand-500 hover:cursor-pointer'>
                      <span>Ver los ejercicios creados</span>
                      <ArrowRightIcon className='ml-2 w-4 h-4' />
                    </div>
                  </ButtonOrLink>
                </div>
              </div>
            </Container>

            <Container size='5xl' title='Últimos entrenamientos'>
              <Table
                values={data}
                header={
                  <>
                    <TableHeader label='#' />
                    <TableHeader label='Nombre' />
                    <TableHeader label='Ejercicios' />
                    <TableHeader label='Estado' className='text-center' />
                    <TableHeader label='Creado el' className='text-right' />
                    <TableHeader label='' className='sm:w-5' />
                  </>
                }
              >
                {(workout, i) => (
                  <TableRow key={workout.id}>
                    <TableDataCell>{i + 1}</TableDataCell>
                    <TableDataCell>{workout.name}</TableDataCell>
                    <TableDataCell>
                      {workout.workoutExercises.length} ejercicios
                    </TableDataCell>
                    <TableDataCell className='text-center'>
                      <Pill
                        variant={workout.status as WorkoutStatus}
                        text={
                          workout.status === WorkoutStatus.DRAFTED
                            ? 'Borrador'
                            : 'Completado'
                        }
                      />
                    </TableDataCell>
                    <TableDataCell className='text-right'>
                      {formatDate(workout.createdAt)}
                    </TableDataCell>
                    <TableDataCell>
                      <Link href={`/workouts/${workout.id}`} passHref>
                        <div className='hover:bg-brand-100 hover:text-brand-700 w-10 h-10 flex items-center justify-center rounded-full'>
                          <ZoomInIcon className='w-4 h-4' />
                        </div>
                      </Link>
                    </TableDataCell>
                  </TableRow>
                )}
              </Table>
            </Container>
          </>
        )}
      </div>
    </div>
  );
}
