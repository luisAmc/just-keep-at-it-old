import { gql, useMutation } from '@apollo/client';
import { CheckIcon } from '@heroicons/react/outline';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import { object, string } from 'zod';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';
import { ErrorMessage } from '../shared/ErrorMessage';
import { Form, useZodForm } from '../shared/Form';
import { Input } from '../shared/Input';
import { SubmitButton } from '../shared/SubmitButton';
import {
  LoginMutation,
  LoginMutationVariables
} from './__generated__/LoginForm.generated';

const LoginSchema = object({
  username: string().min(1, 'Ingrese el nombre de usuario.'),
  password: string().min(6, 'La cantidad miníma es de seis (6) caracteres.')
});

export function LoginForm() {
  const authRedirect = useAuthRedirect();

  const form = useZodForm({ schema: LoginSchema });

  const [login, { error }] = useMutation<LoginMutation, LoginMutationVariables>(
    gql`
      mutation LoginMutation($input: LoginInput!) {
        login(input: $input) {
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
      <Card title='Ingresar'>
        <div className='flex justify-end'>
          <Button href='/auth/signup'>Crear cuenta</Button>
        </div>

        <Form
          form={form}
          onSubmit={(input) =>
            login({
              variables: {
                input: {
                  username: input.username,
                  password: input.password
                }
              }
            })
          }
        >
          <ErrorMessage title='Error de ingreso' error={error} />

          <Input {...form.register('username')} label='Usuario' />

          <Input
            {...form.register('password')}
            type='password'
            label='Contraseña'
          />

          <SubmitButton>
            <CheckIcon className='w-6 h-6 mr-1' />
            <span>Ingresar</span>
          </SubmitButton>
        </Form>
      </Card>
    </div>
  );
}
