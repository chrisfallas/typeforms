import { DetailedHTMLProps, SelectHTMLAttributes, RefObject } from 'react';
import { Child, KeyOf } from './Global';
import { FieldHandlerProps } from './FieldHandler';

type HTMLSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

interface SelectOwnProps<
  T extends Record<string, any>,
  K extends KeyOf,
  V extends SelectFieldTypes,
> extends FieldHandlerProps<K, V> {
  domRef?: RefObject<HTMLSelectElement>;
  options?: SelectOptions<T[K]>;
  // multiple?: boolean; // TODO: Add support for multiple select (is it possible?)
}

export interface SelectProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf = KeyOf,
  V extends SelectFieldTypes = SelectFieldTypes,
> extends SelectOwnProps<T, K, V>,
    Omit<HTMLSelectProps, keyof SelectOwnProps<T, K, V> | 'multiple' | 'children'> {}

export type SelectComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, SelectFieldTypes> = KeyOf<T, SelectFieldTypes>,
  V extends SelectFieldTypes = T[K],
>(
  props: SelectProps<T, K, V>,
) => Child;

export type SelectOptions<T extends SelectFieldTypes = SelectFieldTypes> = Array<{
  value: T | undefined;
  label: string;
}>;

export type SelectFieldTypes = string | number;
