import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Page } from 'src/components/shared/Page';
import { LastSessionList } from './LastSessionList';
import { LastSessionsGraphs } from './LastSessionsGraphs';
import { ViewExerciseProvider } from './ViewExerciseContext';
import {
  ViewExerciseQuery,
  ViewExerciseQueryVariables
} from './__generated__/index.generated';

export const ExerciseFragment = gql`
  fragment ViewExercise_exercise on Exercise {
    id
    name
    type
  }
`;

export const ExerciseDoneSessionFragment = gql`
  fragment ViewExercise_doneSession on WorkoutExercise {
    id
    sets {
      id
      mins
      distance
      kcal
      lbs
      reps
    }
    workout {
      name
      completedAt
    }
  }
`;

const ViewExerciseFragment = gql`
  fragment ViewExercise_exerciseWithDoneSession on Exercise {
    id
    ...ViewExercise_exercise
    doneSessions(limit: $limit) {
      ...ViewExercise_doneSession
    }
  }
  ${ExerciseFragment}
  ${ExerciseDoneSessionFragment}
`;

export const VIEW_EXERCISE_QUERY = gql`
  query ViewExerciseQuery($id: ID!, $limit: Int!) {
    exercise(id: $id) {
      id
      ...ViewExercise_exerciseWithDoneSession
    }
  }
  ${ViewExerciseFragment}
`;

export function ViewExercise() {
  const router = useRouter();

  const { data, loading } = useQuery<
    ViewExerciseQuery,
    ViewExerciseQueryVariables
  >(VIEW_EXERCISE_QUERY, {
    variables: {
      id: router.query.exerciseId as string,
      limit: 10
    }
  });

  return (
    <Page href='/exercises' title={data?.exercise.name}>
      {loading && <div>Cargando...</div>}

      {data && (
        <ViewExerciseProvider exercise={data.exercise}>
          <LastSessionsGraphs />
          <LastSessionList />
        </ViewExerciseProvider>
      )}
    </Page>
  );
}
