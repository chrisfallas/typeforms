import {
  DetailedHTMLProps,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  RefObject,
} from 'react';
import { BasicDataTypes, Child, KeyOf } from './Global';
import { FieldHandlerProps } from './FieldHandler';

export type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface InputOwnProps<K extends KeyOf = KeyOf, V = any>
  extends FieldHandlerProps<K, V> {
  type: V extends boolean
    ? BooleanInputTypes
    : V extends number
      ? NumericInputTypes
      : StringInputTypes;
  domRef?: RefObject<HTMLInputElement>;
}

export interface InputProps<K extends KeyOf = KeyOf, V = any>
  extends InputOwnProps<K, V>,
    Omit<HTMLInputProps, keyof InputOwnProps<K, V> | 'children'> {}

export type InputComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, BasicDataTypes> = KeyOf<T, BasicDataTypes>,
  V = T[K],
>(
  props: InputProps<K, V>,
) => Child;

type NumericInputTypes = 'number' | 'range';

type BooleanInputTypes = 'checkbox';

type StringInputTypes =
  | Omit<HTMLInputTypeAttribute, NumericInputTypes | BooleanInputTypes>
  | undefined;
