import { Child, KeyOf } from './Global';
import { DetailedHTMLProps, InputHTMLAttributes, RefObject } from 'react';
import { FieldHandlerProps } from './FieldHandler';

type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type BannedHTMLInputProps = 'children' | 'value' | 'defaultValue';

interface CheckboxOwnProps<T extends Record<string, any>, K extends KeyOf<T, boolean>>
  extends FieldHandlerProps<T, K, boolean> {
  domRef?: RefObject<HTMLInputElement>;
  type?: 'checkbox';
}

export interface CheckboxProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T, boolean> = KeyOf<T, boolean>,
> extends CheckboxOwnProps<T, K>,
    Omit<HTMLInputProps, keyof CheckboxOwnProps<T, K> | BannedHTMLInputProps> {}

export type CheckboxComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, boolean> = KeyOf<T, boolean>,
>(
  props: CheckboxProps<T, K>,
) => Child;
