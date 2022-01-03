import { AxiosError } from 'axios';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import { signUp, SignUpInput } from 'src/resolvers/AuthResolver';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import { object, string } from 'yup';
import { Container } from '../ui/Container';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { Message } from '../ui/Message';
import { SubmitButton } from '../ui/SubmitButton';

const signUpSchema = object().shape({
  name: string().trim().required('Ingrese el nombre.'),
  username: string().trim().required('Ingrese el nombre de usuario.'),
  password: string()
    .trim()
    .min(6, 'El tamaño mínimo de la conrtaseña es seis caracteres.')
    .required('Ingrese la contraseña.'),
  confirmPassword: string()
    .trim()
    .test(
      'does-password-match',
      'Las contraseñas no coinciden.',
      function (value) {
        return this.parent.password === value;
      }
    )
});

export function SignUpForm() {
  const authRedirect = useAuthRedirect();

  const signUpMutation = useMutation((input: SignUpInput) => signUp(input), {
    onSuccess: () => {
      authRedirect();
    },
    onError: (error: AxiosError) => {
      setError(error?.response?.data);
    }
  });

  const form = useYupForm({ schema: signUpSchema });
  const [error, setError] = useState('');

  async function onSubmit(values: FieldValues) {
    await signUpMutation.mutateAsync({
      name: values.name,
      username: values.username,
      password: values.password
    });
  }

  return (
    <div className='h-screen'>
      <Container title='Crear Usuario'>
        <Form form={form} onSubmit={onSubmit}>
          <Message
            type='error'
            title='Ocurrio un error al tratar de crear el usuario.'
            text={error}
          />

          <Input
            {...form.register('name')}
            autoFocus
            label='Nombre'
            autoComplete='name'
          />

          <Input
            {...form.register('username')}
            label='Usuario'
            autoComplete='username'
          />

          <Input
            {...form.register('password')}
            label='Contraseña'
            autoComplete='password'
            type='password'
          />

          <Input
            {...form.register('confirmPassword')}
            label='Confirmar Contraseña'
            autoComplete='confirmPassword'
            type='password'
          />

          <SubmitButton>Crear Usuario</SubmitButton>
        </Form>
      </Container>
    </div>
  );
}
