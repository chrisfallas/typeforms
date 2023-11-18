import { FormHTMLAttributes, PropsWithChildren } from 'react';
import { FormProviderProps } from './FormProvider';

export type HTMLFormProps = FormHTMLAttributes<HTMLFormElement>;

export type FormOwnProps<T extends Record<string, any> = Record<string, any>> =
  FormProviderProps<T>;

export type FormProps<T extends Record<string, any> = Record<string, any>> =
  PropsWithChildren<FormOwnProps<T> & Omit<HTMLFormProps, keyof FormOwnProps>>;

export type FormSchemaValidatorFunction<T extends object> = (
  values: Partial<T>,
) =>
  | Record<Extract<keyof T, string>, boolean | string | undefined | void>
  | boolean
  | undefined
  | void;

export type FormSchemaValidatorObject<T extends object> = {
  [K in Extract<keyof T, string>]: (value: T[K]) => void;
};
