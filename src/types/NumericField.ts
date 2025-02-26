import { Child, KeyOf } from './Global';
import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react';
import { FieldHandlerProps } from './FieldHandler';

type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type BannedHTMLInputProps = 'children' | 'defaultValue';

interface NumericFieldOwnProps<T extends Record<string, any>, K extends KeyOf<T, number>>
  extends FieldHandlerProps<T, K, number> {
  domRef?: RefObject<HTMLInputElement>;
  type?: 'number' | 'range' | 'radio';
  value?: T[K];
}

export interface NumericFieldProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T, number> = KeyOf<T, number>,
> extends NumericFieldOwnProps<T, K>,
    Omit<HTMLInputProps, keyof NumericFieldOwnProps<T, K> | BannedHTMLInputProps> {}

export type NumericFieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, number> = KeyOf<T, number>,
>(
  props: NumericFieldProps<T, K>,
) => Child;
