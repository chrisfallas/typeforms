import { RefObject } from 'react';
import { KeyOf } from './Global';
import { FieldValidationData } from './ValidationsHandler';
import { FieldErrorsReturn } from './ValidationErrors';

export interface FieldHandlerProps<K extends KeyOf = KeyOf, V = any>
  extends FieldValidationData<V> {
  fieldRef?: RefObject<FieldHandlerReturn<K, V>>;
  name: K;
  onChange?: (value: V) => Promise<void> | void;
}

export interface FieldHandlerReturn<K extends KeyOf = KeyOf, V = any> {
  name: K;
  value: V | undefined;
  errors?: FieldErrorsReturn['errors'];
  isValid: FieldErrorsReturn['isValid'];
  setValue: (value: V) => Promise<void>;
  blur: () => void;
}
