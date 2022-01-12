import { FieldValues } from 'react-hook-form';
import { graphql, useMutation } from 'relay-hooks';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import { object, string } from 'yup';
import { Container } from '../ui/Container';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { Message } from '../ui/Message';
import { SubmitButton } from '../ui/SubmitButton';
import { LoginFormMutation } from './__generated__/LoginFormMutation.graphql';

const loginSchema = object().shape({
  username: string().trim().required('Ingrese el usuario.'),
  password: string()
    .trim()
    .min(6, 'El tamaño mínimo de la conrtaseña es seis caracteres.')
    .required('Ingrese la contraseña.')
});

export function LoginForm() {
  const authRedirect = useAuthRedirect();

  const [login, loginResult] = useMutation<LoginFormMutation>(
    graphql`
      mutation LoginFormMutation($input: LoginInput!) {
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

  const form = useYupForm({ schema: loginSchema });

  async function onSubmit(values: FieldValues) {
    login({
      variables: {
        input: {
          username: values.username,
          password: values.password
        }
      }
    });
  }

  return (
    <div className='h-screen'>
      <Container title='Ingresar'>
        <Form form={form} onSubmit={onSubmit}>
          <Message
            type='error'
            title='Ocurrio un error al tratar de ingresar.'
            text={loginResult.error?.message}
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
