import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react';
import { Child, KeyOf } from './Global';
import { FieldHandlerProps } from './FieldHandler';

type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type BannedHTMLInputProps = 'children' | 'defaultValue';

interface TextFieldOwnProps<T extends Record<string, any>, K extends KeyOf<T, string>>
  extends FieldHandlerProps<T, K, string> {
  domRef?: RefObject<HTMLInputElement>;
  value?: T[K];
}

export interface TextFieldProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T, string> = KeyOf<T, string>,
> extends TextFieldOwnProps<T, K>,
    Omit<HTMLInputProps, keyof TextFieldOwnProps<T, K> | BannedHTMLInputProps> {}

export type TextFieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, string> = KeyOf<T, string>,
>(
  props: TextFieldProps<T, K>,
) => Child;
