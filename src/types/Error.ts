import { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react';
import { Child, KeyOf, RenderProp } from './Global';

export type HTMLErrorProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export interface ErrorOwnProps<K extends KeyOf = KeyOf> {
  domRef?: RefObject<HTMLSpanElement>;
  htmlFor: K;
  index?: number;
  alwaysVisible?: boolean;
  render?: RenderProp<{ isValid: boolean; errors: Array<string> }>;
}

export interface ErrorProps<K extends KeyOf = KeyOf>
  extends ErrorOwnProps<K>,
    Omit<HTMLErrorProps, keyof ErrorOwnProps<K>> {}

export type ErrorComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T> = KeyOf<T>,
>(
  props: ErrorProps<K>,
) => Child;
