import { RefObject } from 'react';
import { KeyOf } from './Global';
import { FieldValidationData } from './ValidationsHandler';
import { FieldErrors } from './ValidationErrors';

export interface FieldHandlerProps<K extends KeyOf = KeyOf, V = any>
  extends FieldValidationData<V> {
  fieldRef?: RefObject<FieldHandlerReturn<K, V>>;
  name: K;
  onChange?: (value: V) => Promise<void> | void;
}

export interface FieldHandlerReturn<K extends KeyOf = KeyOf, V = any> {
  name: K;
  value: V | undefined;
  errors?: FieldErrors['errors'];
  isValid: FieldErrors['isValid'];
  setValue: (value: V) => Promise<void>;
  blur: () => void;
}
