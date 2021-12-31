import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';
import Lazy from 'yup/lib/Lazy';
import { ComponentProps } from 'react';

interface UseYupFormProps extends UseFormProps {
  schema: AnyObjectSchema | Lazy<AnyObjectSchema>;
}

export const useYupForm = ({ schema, ...formConfig }: UseYupFormProps) => {
  return useForm({
    ...formConfig,
    mode: 'all',
    resolver: yupResolver(schema)
  });
};

interface FieldErrorProps {
  name?: string;
}

export function FieldError({ name }: FieldErrorProps) {
  const {
    formState: { errors }
  } = useFormContext();

  if (!name) return null;

  const isNestedField = name.includes('.');

  let error = isNestedField
    ? name.split('.').reduce((error, key) => error && error[key], errors)
    : errors[name];

  if (!error) return null;

  return (
    <div className='text-sm text-red-500 font-semibold'>{error.message}</div>
  );
}

interface Props<T extends FieldValues = any>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  submitted?: boolean;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  submitted = false,
  ...props
}: Props<T>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <fieldset
          className='flex flex-col space-y-4'
          disabled={form.formState.isSubmitting || submitted}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};
