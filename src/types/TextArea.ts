import { DetailedHTMLProps, TextareaHTMLAttributes, RefObject } from 'react';
import { BasicDataTypes, Child, KeyOf } from './Global';
import { FieldHandlerProps } from './FieldHandler';

type HTMLTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface TextAreaOwnProps<K extends KeyOf = KeyOf, V = any>
  extends FieldHandlerProps<K, V> {
  domRef?: RefObject<HTMLTextAreaElement>;
}

export interface TextAreaProps<K extends KeyOf = KeyOf, V = any>
  extends TextAreaOwnProps<K, V>,
    Omit<HTMLTextAreaProps, keyof TextAreaOwnProps<K, V> | 'children'> {}

export type TextAreaComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, BasicDataTypes> = KeyOf<T, BasicDataTypes>,
  V = T[K],
>(
  props: TextAreaProps<K, V>,
) => Child;
