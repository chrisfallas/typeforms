import { JSX, RefObject } from 'react';

export type JSXElement = JSX.Element | null;

export type KeyOf<T extends Record<string, any> = Record<string, any>> = Extract<
  keyof T,
  string
>;

export type RenderProp<P> = {
  render?: (props: P) => JSXElement;
};

export type RefProp<T> = {
  domRef?: RefObject<T>;
};
