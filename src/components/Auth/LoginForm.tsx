import { gql, useMutation } from '@apollo/client';
import { LockClosedIcon, UserIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import { object, string } from 'zod';
import { ErrorMessage } from '../shared/ErrorMessage';
import { Form, useZodForm } from '../shared/Form';
import { Input } from '../shared/Input';
import { Link } from '../shared/Link';
import { SubmitButton } from '../shared/SubmitButton';
import Image from 'next/image';
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
    <div className='h-screen sm:h-auto flex items-center justi sm:mt-6'>
      <div className='relative mx-auto max-w-md w-full px-1'>
        <div className='absolute hidden sm:block bg-white/[.15] inset-0 -rotate-[3deg] rounded-xl'></div>

        <div className='relative bg-white/[0.8] px-8 py-10 rounded-xl'>
          <div className='flex items-center justify-center'>
            <Image src='/images/login.png' width={237} height={161} />
          </div>

          <div className='pb-6'></div>

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

            <Input
              {...form.register('username')}
              autoFocus
              icon={UserIcon}
              placeholder='Usuario'
            />

            <Input
              {...form.register('password')}
              icon={LockClosedIcon}
              type='password'
              placeholder='Contraseña'
            />

            <SubmitButton>
              <CheckCircleIcon className='w-6 h-6 mr-1' />
              <span>Ingresar</span>
            </SubmitButton>
          </Form>

          <div className='mt-4 flex justify-end'>
            <Link href='/auth/signup'>Crear cuenta</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
