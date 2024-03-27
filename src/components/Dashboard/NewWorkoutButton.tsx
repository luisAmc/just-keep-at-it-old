import { gql, useMutation } from '@apollo/client';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Button } from '../shared/Button';
import {
  NewWorkoutMutation,
  NewWorkoutMutationVariables
} from './__generated__/NewWorkoutButton.generated';
import toast from 'react-hot-toast';

export function NewWorkoutButton() {
  const router = useRouter();

  const [createWorkout, { loading }] = useMutation<
    NewWorkoutMutation,
    NewWorkoutMutationVariables
  >(
    gql`
      mutation NewWorkoutMutation($input: CreateWorkoutInput!) {
        createWorkout(input: $input) {
          id
        }
      }
    `,
    {
      variables: {
        input: {
          name: 'Nueva rutina'
        }
      },
      onCompleted(data) {
        router.replace(`/workouts/${data.createWorkout.id}/get-it-done`);
      }
    }
  );

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.promise(createWorkout(), {
          loading: 'Creando rútina...',
          success: '¡Rútina creada!',
          error: 'No se pudo creada la rútina.'
        })
      }
    >
      {loading && (
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      <PlusCircleIcon className="mr-1 h-4 w-4" />
      <span>Continuar con una nueva rutina</span>
    </Button>
  );
}
