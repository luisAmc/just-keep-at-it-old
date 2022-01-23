import { FieldValues } from 'react-hook-form';
import { graphql, useMutation } from 'relay-hooks';
import { useAuthRedirect } from 'src/utils/useAuthRedirect';
import { object, string } from 'yup';
import { Container } from '../ui/Container';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { Message } from '../ui/Message';
import { SubmitButton } from '../ui/SubmitButton';
import { SignUpFormMutation } from './__generated__/SignUpFormMutation.graphql';

const signUpSchema = object().shape({
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

  const [signUp, signUpResult] = useMutation<SignUpFormMutation>(
    graphql`
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

  const form = useYupForm({ schema: signUpSchema });

  async function onSubmit(values: FieldValues) {
    signUp({
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
      <Container title='Crear Usuario'>
        <Form form={form} onSubmit={onSubmit}>
          <Message
            type='error'
            title='Ocurrio un error al tratar de crear el usuario.'
            text={signUpResult.error?.message}
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
