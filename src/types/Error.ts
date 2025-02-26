import { DetailedHTMLProps, HTMLAttributes, RefObject } from 'react';
import { Child, KeyOf, RenderProp } from './Global';
import { FieldErrors } from './Validations';

type HTMLErrorProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

interface ErrorOwnProps<T extends Record<string, any>, K extends KeyOf<T>> {
  domRef?: RefObject<HTMLSpanElement>;
  htmlFor: K;
  index?: number;
  alwaysVisible?: boolean;
  render?: RenderProp<FieldErrors>;
}

export interface ErrorProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T> = KeyOf<T>,
> extends ErrorOwnProps<T, K>,
    Omit<HTMLErrorProps, keyof ErrorOwnProps<T, K>> {}

export type ErrorComponent<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T> = KeyOf<T>,
>(
  props: ErrorProps<T, K>,
) => Child;
