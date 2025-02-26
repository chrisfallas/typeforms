import { Child, KeyOf } from './Global';
import { InputProps } from './Input';

interface NumericFieldOwnProps {
  type?: InputTypes;
}

export interface NumericFieldProps<K extends KeyOf = KeyOf>
  extends NumericFieldOwnProps,
    Omit<InputProps<K, number | undefined>, 'type' | keyof NumericFieldOwnProps> {}

export type NumericFieldComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, number> = KeyOf<T, number>,
>(
  props: NumericFieldProps<K>,
) => Child;

type InputTypes = 'number' | 'range';
