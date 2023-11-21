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

export type FormSchemaValidatorFunction<T extends object> = (
  values: Partial<T>,
) => Record<KeyOf<T>, boolean | string | undefined | void> | boolean | undefined | void;

export type FormSchemaValidatorObject<T extends object> = {
  [K in KeyOf<T>]: (value: T[K]) => void;
};
