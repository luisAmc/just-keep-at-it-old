import { number } from 'yup';

export const numberShape = number().transform((val) =>
  isNaN(val) ? undefined : val
);
