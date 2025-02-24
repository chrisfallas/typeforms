import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  PropsWithChildren,
  RefObject,
} from 'react';
import { FormProviderProps } from './FormProvider';
import { Child } from './Global';
import { ValidationsProviderProps } from './ValidationsProvider';

export type HTMLFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export interface FormOwnProps<T extends Record<string, any> = Record<string, any>>
  extends FormProviderProps<T>,
    ValidationsProviderProps<T> {
  domRef?: RefObject<HTMLFormElement>;
}

export interface FormProps<T extends Record<string, any> = Record<string, any>>
  extends FormOwnProps<T>,
    Omit<HTMLFormProps, keyof FormOwnProps> {}

export type FormComponent<T extends Record<string, any> = Record<string, any>> = <
  P extends T = T,
>(
  props: PropsWithChildren<FormProps<P>>,
) => Child;
