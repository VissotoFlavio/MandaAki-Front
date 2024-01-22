import { z } from 'zod';
import { ERROR_SCHEMA_FIELDS } from '../../../constants/error-schema.constants';

const minPass = 6;

export const LoginFormSchema = z.object({
  email: z.string().min(1, ERROR_SCHEMA_FIELDS.required).email(ERROR_SCHEMA_FIELDS.invalidEmail),
  password: z
    .string()
    .min(1, ERROR_SCHEMA_FIELDS.required)
    .min(minPass, ERROR_SCHEMA_FIELDS.minLength.replace('{minLength}', minPass.toString())),
  rememberpass: z.boolean(),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
