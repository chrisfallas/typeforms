import { DetailedHTMLProps, TextareaHTMLAttributes, RefObject } from 'react';
import { Child, KeyOf } from './Global';
import { FieldHandlerProps } from './FieldHandler';

type HTMLTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface TextAreaOwnProps<K extends KeyOf> extends FieldHandlerProps<K, string> {
  domRef?: RefObject<HTMLTextAreaElement>;
}

export interface TextAreaProps<K extends KeyOf = KeyOf>
  extends TextAreaOwnProps<K>,
    Omit<HTMLTextAreaProps, keyof TextAreaOwnProps<K> | 'children'> {}

export type TextAreaComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, string> = KeyOf<T, string>,
>(
  props: TextAreaProps<K>,
) => Child;
