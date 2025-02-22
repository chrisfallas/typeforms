import { KeyOf, RenderProp } from './Global';
import { FieldHandlerProps, FieldHandlerReturn } from './FieldHandler';

export interface FieldProviderProps<K extends KeyOf = KeyOf, V = any>
  extends FieldHandlerProps<K, V> {
  component?: RenderProp<FieldContextValues<K, V>>;
}

export interface FieldContextValues<K extends KeyOf = KeyOf, V = any>
  extends FieldHandlerReturn<K, V> {}
