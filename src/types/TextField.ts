import { Child, KeyOf } from './Global';
import { InputProps } from './Input';

export interface TextFieldProps<K extends KeyOf = KeyOf>
  extends InputProps<K, string | undefined> {}

export type TextFieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, string> = KeyOf<T, string>,
>(
  props: TextFieldProps<K>,
) => Child;
