import { RefObject } from 'react';
import { KeyOf } from './Global';
import { FieldValidationData } from './ValidationsHandler';
import { FieldErrors } from './ValidationErrors';
import { FieldContext } from '../contexts/FieldContext';

export interface FieldHandlerProps<K extends KeyOf = KeyOf, V = any>
  extends FieldValidationData<V> {
  fieldRef?: RefObject<FieldContext<K, V>>;
  name: K;
  onChange?: (value: V) => Promise<any> | any;
}

export interface FieldHandlerReturn<K extends KeyOf = KeyOf, V = any> {
  name: K;
  value: V | undefined;
  errors?: FieldErrors['errors'];
  isValid: FieldErrors['isValid'];
  setValue: (value: V, options?: { skipValidation?: boolean }) => Promise<void>;
  validate: () => Promise<FieldErrors>;
  blur: () => void;
}
