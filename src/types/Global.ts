import { JSX } from 'react';

export type Child = JSX.Element | null;

export type Children = Array<Child> | Child;

export type RenderProp<T extends Record<string, any> = Record<string, any>> = <
  P extends T = T,
>(
  props: P,
) => Children;

export type KeyOf<T extends Record<string, any> = Record<string, any>, V = any> = Extract<
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T],
  string
>;
