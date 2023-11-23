import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { FormProviderProps } from './FormProvider';
import { KeyOf } from './Global';

export type HTMLFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export interface FormOwnProps<T extends Record<string, any> = Record<string, any>>
  extends FormProviderProps<T> {}

export interface FormProps<T extends Record<string, any> = Record<string, any>>
  extends FormOwnProps<T>,
    Omit<HTMLFormProps, keyof FormOwnProps> {}

export type FormSchemaValidationFunction<T extends object> = (
  values: Partial<T>,
) => Promise<FormSchemaValidationResult<T>> | FormSchemaValidationResult<T>;

export type FormSchemaValidationObject<T extends object> = Partial<{
  [K in KeyOf<T>]: (
    value: T[K] | undefined,
  ) => Promise<FormSchemaValidationError> | FormSchemaValidationError;
}>;

export type FormSchemaValidationResult<
  T extends Record<string, any> = Record<string, any>,
> = Partial<{ [K in KeyOf<T>]: FormSchemaValidationError }>;

export type FormSchemaValidationError = string | Array<string> | undefined;
