import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  PropsWithChildren,
  RefObject,
} from 'react';
import { Child, RenderProp } from './Global';
import { FormHandlerProps, FormHandlerReturn } from './FormHandler';
import { ValidationsHandlerProps } from './ValidationsHandler';

export type HTMLFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export interface FormOwnProps<T extends Record<string, any> = Record<string, any>>
  extends FormHandlerProps<T>,
    ValidationsHandlerProps<T>,
    PropsWithChildren<{}> {
  render?: RenderProp<FormHandlerReturn<T>>;
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
