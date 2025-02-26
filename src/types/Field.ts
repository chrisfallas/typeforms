import { PropsWithChildren } from 'react';
import { Child, KeyOf, RenderProp } from './Global';
import { FieldHandlerProps } from './FieldHandler';
import { FieldContext } from '../contexts/FieldContext';

export interface FieldProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T> = KeyOf<T>,
  V = T[K],
> extends FieldHandlerProps<T, K, V> {
  component?: RenderProp<FieldContext<V>>;
}

export type FieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T> = KeyOf<T>,
  V = T[K],
>(
  props: PropsWithChildren<FieldProps<T, K, V>>,
) => Child;
