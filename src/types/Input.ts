import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { KeyOf } from './Global';
import { FormElementProps } from './Element';

export type HTMLInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'children'
>;

export interface InputOwnProps<K extends KeyOf = KeyOf, V = any>
  extends FormElementProps<K, V> {}

export interface InputProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T> = KeyOf<T>,
> extends InputOwnProps<K, T[K]>,
    Omit<HTMLInputProps, keyof InputOwnProps> {}
