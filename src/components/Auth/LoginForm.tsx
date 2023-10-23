import { gql, useMutation } from '@apollo/client';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
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
      },
      onError() {
        form.reset();
      }
    }
  );

  return (
    <div className="mx-2 mt-4 flex flex-1 items-center justify-center sm:mt-6">
      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute inset-0 hidden -rotate-[3deg] rounded-xl bg-white/[.15] sm:block"></div>

        <div className="relative h-full rounded-xl bg-white/[0.8]">
          <div className="flex items-center justify-center">
            <Image
              src="/images/login.png"
              width={222}
              height={250}
              alt="login illustration"
            />
          </div>

          <div className="pb-6"></div>

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
            <ErrorMessage title="Error de ingreso" error={error} />

            <Input
              {...form.register('username')}
              autoFocus
              autoCapitalize="off"
              icon={UserIcon}
              placeholder="Usuario"
              color="light"
            />

            <Input
              {...form.register('password')}
              icon={LockClosedIcon}
              type="password"
              placeholder="Contraseña"
              color="light"
            />

            <SubmitButton>Ingresar</SubmitButton>
          </Form>

          <div className="mt-4 flex justify-end">
            <Link href="/auth/signup">Crear cuenta</Link>
          </div>

          <p className="mt-4 text-center text-xs font-medium">
            Illustration by{' '}
            <a href="https://icons8.com/illustrations/author/HzkZD6h9f9qm">
              AsIa Vitalyevna
            </a>{' '}
            from <a href="https://icons8.com/illustrations">Ouch!</a>
          </p>
        </div>
      </div>
    </div>
  );
}
