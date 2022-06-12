import { object, string } from 'zod';
import { Form, useZodForm } from '../shared/Form';
import { Input } from '../shared/Input';
import { SubmitButton } from '../shared/SubmitButton';
import { CheckIcon } from '@heroicons/react/outline';
import { gql, useMutation } from '@apollo/client';
import {
  SignUpFormMutation,
  SignUpFormMutationVariables
} from './__generated__/SignUpForm.generated';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import { Card } from '../shared/Card';

const SignUpSchema = object({
  username: string().min(1, 'Ingrese el nombre de usuario.'),
  password: string().min(6, 'La cantidad miníma es de seis (6) caracteres.'),
  confirmPassword: string().min(
    6,
    'La cantidad miníma es de seis (6) caracteres.'
  )
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword']
});

export function SignUpForm() {
  const authRedirect = useAuthRedirect();

  const form = useZodForm({ schema: SignUpSchema });

  const [signUp] = useMutation<SignUpFormMutation, SignUpFormMutationVariables>(
    gql`
      mutation SignUpFormMutation($input: SignUpInput!) {
        signUp(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        authRedirect();
      }
    }
  );

  return (
    <div className='mt-6'>
      <Card title='Crear Usuario'>
        <Form
          form={form}
          onSubmit={(input) =>
            signUp({
              variables: {
                input: {
                  username: input.username,
                  password: input.password
                }
              }
            })
          }
        >
          <Input {...form.register('username')} label='Usuario' />

          <Input
            {...form.register('password')}
            type='password'
            label='Contraseña'
          />

          <Input
            {...form.register('confirmPassword')}
            type='password'
            label='Confirmar contraseña'
          />

          <SubmitButton>
            <CheckIcon className='w-6 h-6 mr-1' />
            <span>Crear</span>
          </SubmitButton>
        </Form>
      </Card>
    </div>
  );
}
