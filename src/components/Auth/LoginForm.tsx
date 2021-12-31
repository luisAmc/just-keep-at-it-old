import { AxiosError } from 'axios';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import { login, LoginInput } from 'src/resolvers/AuthResolver';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import { object, string } from 'yup';
import { Container } from '../ui/Container';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { Message } from '../ui/Message';
import { SubmitButton } from '../ui/SubmitButton';

const loginSchema = object().shape({
  username: string().required('Ingrese el usuario.'),
  password: string()
    .min(6, 'El tamaño mínimo de la conrtaseña es seis caracteres.')
    .required('Ingrese la contraseña.')
});

export function LoginForm() {
  const authRedirect = useAuthRedirect();

  const loginMutation = useMutation((input: LoginInput) => login(input), {
    onSuccess: () => {
      authRedirect();
    },
    onError: (error: AxiosError) => {
      setError(error?.response?.data);
    }
  });

  const form = useYupForm({ schema: loginSchema });
  const [error, setError] = useState('');

  async function onSubmit(values: FieldValues) {
    await loginMutation.mutateAsync({
      username: values.username,
      password: values.password
    });
  }

  return (
    <div className='h-screen'>
      <Container title='Ingresar'>
        <Form form={form} onSubmit={onSubmit}>
          <Message
            type='error'
            title='Ocurrio un error al tratar de ingresar.'
            text={error}
          />

          <Input
            {...form.register('username')}
            autoFocus
            label='Usuario'
            autoComplete='username'
          />

          <Input
            {...form.register('password')}
            label='Contraseña'
            autoComplete='password'
            type='password'
          />

          <SubmitButton>Iniciar Sesión</SubmitButton>
        </Form>
      </Container>
    </div>
  );
}
