import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { FormProviderProps } from './FormProvider';
import { RefProp } from './Global';

export type HTMLFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export interface FormOwnProps<T extends Record<string, any> = Record<string, any>>
  extends FormProviderProps<T>,
    RefProp<HTMLFormElement> {}

export interface FormProps<T extends Record<string, any> = Record<string, any>>
  extends FormOwnProps<T>,
    Omit<HTMLFormProps, keyof FormOwnProps> {}
