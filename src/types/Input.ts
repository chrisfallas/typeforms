import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react';
import { Child, KeyOf } from './Global';
import { FieldHandlerProps } from './FieldHandler';

export type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface InputOwnProps<K extends KeyOf = KeyOf, V = any>
  extends FieldHandlerProps<K, V> {
  domRef?: RefObject<HTMLInputElement>;
}

export interface InputProps<K extends KeyOf = KeyOf, V = any>
  extends InputOwnProps<K, V>,
    Omit<HTMLInputProps, keyof InputOwnProps<K, V>> {}

export type InputComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T> = KeyOf<T>,
  V = T[K],
>(
  props: InputProps<K, V>,
) => Child;
