import { Child, KeyOf } from './Global';
import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react';
import { FieldHandlerProps } from './FieldHandler';

type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface NumericFieldOwnProps<K extends KeyOf> extends FieldHandlerProps<K, number> {
  type?: 'number' | 'range';
  domRef?: RefObject<HTMLInputElement>;
}

export interface NumericFieldProps<K extends KeyOf = KeyOf>
  extends NumericFieldOwnProps<K>,
    Omit<HTMLInputProps, keyof NumericFieldOwnProps<K> | 'children'> {}

export type NumericFieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, number> = KeyOf<T, number>,
>(
  props: NumericFieldProps<K>,
) => Child;
