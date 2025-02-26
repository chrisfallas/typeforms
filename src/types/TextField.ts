import { Child, KeyOf } from './Global';
import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react';
import { FieldHandlerProps } from './FieldHandler';

type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface TextFieldOwnProps<K extends KeyOf> extends FieldHandlerProps<K, string> {
  domRef?: RefObject<HTMLInputElement>;
}

export interface TextFieldProps<K extends KeyOf = KeyOf>
  extends TextFieldOwnProps<K>,
    Omit<HTMLInputProps, keyof TextFieldOwnProps<K> | 'children'> {}

export type TextFieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, string> = KeyOf<T, string>,
>(
  props: TextFieldProps<K>,
) => Child;
