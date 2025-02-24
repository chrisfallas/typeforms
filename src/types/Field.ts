import { PropsWithChildren } from 'react';
import { Child, KeyOf, RenderProp } from './Global';
import { FieldHandlerProps, FieldHandlerReturn } from './FieldHandler';

export interface FieldProps<K extends KeyOf = KeyOf, V = any>
  extends FieldHandlerProps<K, V>,
    PropsWithChildren<{}> {
  component?: RenderProp<FieldHandlerReturn<K, V>>;
}

export type FieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T>,
  V = T[K],
>(
  props: PropsWithChildren<FieldProps<K, V>>,
) => Child;

export type FieldComponentProps<K extends KeyOf = KeyOf, V = any> = FieldHandlerReturn<
  K,
  V
>;
