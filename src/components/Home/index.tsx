import { graphql, useQuery } from 'relay-hooks';
import { Button } from '../ui/Button';
import { HomeQuery } from './__generated__/HomeQuery.graphql';

export function Home() {
  const { data } = useQuery<HomeQuery>(
    graphql`
      query HomeQuery {
        workouts {
          id
          name
          workoutExercises {
            id
          }
        }
      }
    `,
    {}
  );
  // const router = useRouter();

  // const { workoutId } = router.query;

  // const createWorkout = useModal();
  // const workoutDetails = useModal();

  // const workoutsQuery = useQuery<{
  //   workouts: Workout[];
  // }>('workouts', () => getWorkouts(), { refetchOnWindowFocus: false });

  // useEffect(() => {
  //   if (workoutId) {
  //     workoutDetails.open();
  //   } else {
  //     workoutDetails.close();
  //   }
  // }, [workoutId, workoutDetails]);

  return (
    <div className='h-screen max-w-5xl w-full mx-auto flex sm:pt-12'>
      <div className='flex w-full flex-col space-y-8 sm:space-y-1'>
        <Button href='/exercises'>Ejercicios</Button>
        <Button href='/workouts/create'>Crear Rutina</Button>
        {/* {workoutsQuery.data && (
          <>
            <Container size='5xl' title='Últimos entrenamientos creados'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                <button
                  onClick={createWorkout.open}
                  className='w-full sm:max-w-xs p-6 rounded-lg shadow-sm border border-dashed border-stone-300 bg-stone-50 hover:bg-white hover:border-stone-500 group transition-all ease-in-out'
                >
                  <div className='flex flex-col space-y-4 items-center justify-center text-stone-400 group-hover:text-stone-500'>
                    <PlusCircleIcon className='w-12 h-12' />
                    <p className='text-center font-medium'>
                      Añadir un nuevo entrenamiento
                    </p>
                  </div>
                </button>

                {workoutsQuery.data.workouts.length > 0 && (
                  <WorkoutCard workout={workoutsQuery.data.workouts[0]} />
                )}

                {workoutsQuery.data.workouts.length > 1 && (
                  <WorkoutCard workout={workoutsQuery.data.workouts[1]} />
                )}
              </div>
            </Container>

            <Container size='5xl' title='Últimos entrenamientos'>
              <Table
                values={workoutsQuery.data.workouts}
                header={
                  <>
                    <TableHeader label='#' />
                    <TableHeader label='Nombre' />
                    <TableHeader label='Ejercicios' />
                    <TableHeader label='Estado' className='text-center' />
                    <TableHeader label='Creado el' className='text-right' />
                  </>
                }
              >
                {(workout, i) => (
                  <TableRow key={workout._id}>
                    <TableDataCell>{i + 1}</TableDataCell>
                    <TableDataCell>{workout.name}</TableDataCell>
                    <TableDataCell>
                      {workout.workoutExercises.length} ejercicios
                    </TableDataCell>
                    <TableDataCell className='text-center'>
                      <Pill
                        variant={workout.status}
                        text={
                          workout.status === WORKOUT_STATUS.DRAFTED
                            ? 'Borrador'
                            : 'Completado'
                        }
                      />
                    </TableDataCell>
                    <TableDataCell className='text-right'>
                      {formatDate(workout.createdAt)}
                    </TableDataCell>
                  </TableRow>
                )}
              </Table>
            </Container>
          </>
        )} */}
      </div>

      {/* <CreateWorkoutModal {...createWorkout.props} />
      <WorkoutDetailsModal {...workoutDetails.props} /> */}
    </div>
  );
}
