import { Child, KeyOf } from './Global';
import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react';
import { FieldHandlerProps } from './FieldHandler';

type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface CheckboxOwnProps<K extends KeyOf> extends FieldHandlerProps<K, boolean> {
  type?: 'checkbox';
  domRef?: RefObject<HTMLInputElement>;
}

export interface CheckboxProps<K extends KeyOf = KeyOf>
  extends CheckboxOwnProps<K>,
    Omit<HTMLInputProps, keyof CheckboxOwnProps<K> | 'children'> {}

export type CheckboxComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, boolean> = KeyOf<T, boolean>,
>(
  props: CheckboxProps<K>,
) => Child;
