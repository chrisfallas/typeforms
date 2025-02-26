import { DetailedHTMLProps, SelectHTMLAttributes, RefObject } from 'react';
import { Child, KeyOf } from './Global';
import { FieldHandlerProps } from './FieldHandler';

type HTMLSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type BannedHTMLSelectProps = 'children' | 'defaultValue' | 'multiple';

interface SelectOwnProps<
  T extends Record<string, any>,
  K extends KeyOf<T, SelectFieldTypes>,
  V extends SelectFieldTypes,
> extends FieldHandlerProps<T, K, V> {
  domRef?: RefObject<HTMLSelectElement>;
  options?: SelectOptions<T[K]>;
}

export interface SelectProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T, SelectFieldTypes> = KeyOf<T, SelectFieldTypes>,
  V extends SelectFieldTypes = T[K],
> extends SelectOwnProps<T, K, V>,
    Omit<HTMLSelectProps, keyof SelectOwnProps<T, K, V> | BannedHTMLSelectProps> {}

export type SelectComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, SelectFieldTypes> = KeyOf<T, SelectFieldTypes>,
  V extends SelectFieldTypes = T[K],
>(
  props: SelectProps<T, K, V>,
) => Child;

export type SelectOptions<V extends SelectFieldTypes = SelectFieldTypes> = Array<{
  value: V | undefined;
  label: string;
}>;

export type SelectFieldTypes = string | number;
