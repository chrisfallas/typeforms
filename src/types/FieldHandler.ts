import { RefObject } from 'react';
import { KeyOf } from './Global';

export interface FieldHandlerProps<K extends KeyOf = KeyOf, V = any> {
  fieldRef?: RefObject<FieldHandlerReturn<K, V>>;
  name: K;
  onChange?: (value: V) => Promise<void> | void;
}

export interface FieldHandlerReturn<K extends KeyOf = KeyOf, V = any> {
  name: K;
  value: V | undefined;
  setValue: (value: V) => Promise<void> | void;
}
