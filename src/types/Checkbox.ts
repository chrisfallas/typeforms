import { Child, KeyOf } from './Global';
import { InputProps } from './Input';

export interface CheckboxOwnProps {}

export interface CheckboxProps<K extends KeyOf = KeyOf>
  extends CheckboxOwnProps,
    Omit<InputProps<K, boolean | undefined>, 'type' | keyof CheckboxOwnProps> {}

export type CheckboxComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, boolean> = KeyOf<T, boolean>,
>(
  props: CheckboxProps<K>,
) => Child;

type InputTypes = 'checkbox';
