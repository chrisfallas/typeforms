import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react';
import { Child, KeyOf } from './Global';
import { FieldHandlerProps } from './FieldHandler';

type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface TextFieldOwnProps<T extends Record<string, any>, K extends KeyOf<T, string>>
  extends FieldHandlerProps<T, K, string> {
  domRef?: RefObject<HTMLInputElement>;
}

export interface TextFieldProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T, string> = KeyOf<T, string>,
> extends TextFieldOwnProps<T, K>,
    Omit<HTMLInputProps, keyof TextFieldOwnProps<T, K> | 'children'> {}

export type TextFieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, string> = KeyOf<T, string>,
>(
  props: TextFieldProps<T, K>,
) => Child;
