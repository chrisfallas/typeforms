import { PropsWithChildren } from 'react';
import { LabelProps, RecordKey } from './Global';

export type HTMLInputProps = JSX.IntrinsicAttributes &
  React.InputHTMLAttributes<HTMLInputElement>;

export type InputOwnProps<K extends RecordKey = string, V = any> = {
  name: K;
  onChange?: (value: V | undefined) => void;
};

export type InputProps<
  T extends Record<string, any> = Record<string, any>,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
> = PropsWithChildren<
  InputOwnProps<K, T[K]> & Omit<HTMLInputProps, keyof InputOwnProps> & LabelProps
>;
