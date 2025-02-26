import { DetailedHTMLProps, TextareaHTMLAttributes, RefObject } from 'react';
import { Child, KeyOf } from './Global';
import { FieldHandlerProps } from './FieldHandler';

type HTMLTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface TextAreaOwnProps<T extends Record<string, any>, K extends KeyOf<T, string>>
  extends FieldHandlerProps<T, K, string> {
  domRef?: RefObject<HTMLTextAreaElement>;
}

export interface TextAreaProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T, string> = KeyOf<T, string>,
> extends TextAreaOwnProps<T, K>,
    Omit<HTMLTextAreaProps, keyof TextAreaOwnProps<T, K> | 'children'> {}

export type TextAreaComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, string> = KeyOf<T, string>,
>(
  props: TextAreaProps<T, K>,
) => Child;
