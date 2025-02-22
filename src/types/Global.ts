import { JSX } from 'react';

export type Child = JSX.Element | null;

export type Children = Array<Child> | Child;

export type RenderProp<T extends Record<string, any> = Record<string, any>> = <
  P extends T = T,
>(
  props: P,
) => Children;

export type KeyOf<T extends Record<string, any> = Record<string, any>> = Extract<
  keyof T,
  string
>;
