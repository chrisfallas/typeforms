import { useRef, RefObject } from 'react';
import { KeyOf } from '../types/Global';
import { FieldContext } from '../contexts/FieldContext';

export type FieldRefHook<T extends Record<string, any> = Record<string, any>> = <
  K extends KeyOf<T>,
>() => RefObject<FieldContext<K, T[K]>>;

const useFieldRef: FieldRefHook = <K extends KeyOf, V = any>() =>
  useRef<FieldContext<K, V>>(null);

export default useFieldRef;
