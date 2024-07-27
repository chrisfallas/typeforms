import { ReactNode } from 'react';

export type JSXElement = ReactNode | null;

export type KeyOf<T extends Record<string, any> = Record<string, any>> = Extract<
  keyof T,
  string
>;

export type RenderProp<P> = {
  render?: (props: P) => JSXElement;
};
