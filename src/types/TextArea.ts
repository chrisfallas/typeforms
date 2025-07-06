import { DetailedHTMLProps, TextareaHTMLAttributes, RefObject } from 'react';
import { Child, KeyOf } from './Global';
import { FieldHandlerProps, FieldHandlerReturn } from './FieldHandler';

type HTMLTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type BannedHTMLTextAreaProps = 'children' | 'defaultValue';

interface TextAreaOwnProps<T extends Record<string, any>, K extends KeyOf<T, string>>
  extends FieldHandlerProps<T, K, string> {
  domRef?: RefObject<HTMLTextAreaElement>;
  value?: T[K];
}

export interface TextAreaProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T, string> = KeyOf<T, string>,
> extends TextAreaOwnProps<T, K>,
    Omit<HTMLTextAreaProps, keyof TextAreaOwnProps<T, K> | BannedHTMLTextAreaProps> {}

export type TextAreaComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T, string> = KeyOf<T, string>,
>(
  props: TextAreaProps<T, K>,
) => Child;

interface CustomTextAreaOwnProps {
  domRef?: RefObject<HTMLTextAreaElement>;
  value?: string;
  fieldContext: FieldHandlerReturn<string>;
}

export interface CustomTextAreaProps
  extends CustomTextAreaOwnProps,
    Omit<HTMLTextAreaProps, keyof CustomTextAreaOwnProps | BannedHTMLTextAreaProps> {}
