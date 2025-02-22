import { FieldContextValues, FieldProviderProps } from './FieldProvider';
import { Child, KeyOf } from './Global';
import { PropsWithChildren } from 'react';

export interface FieldProps<K extends KeyOf = KeyOf, V = any>
  extends FieldProviderProps<K, V> {}

export type FieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T>,
  V = T[K],
>(
  props: PropsWithChildren<FieldProps<K, V>>,
) => Child;

export type FieldComponentProps<K extends KeyOf = KeyOf, V = any> = FieldContextValues<
  K,
  V
>;
