import { RefObject } from 'react';
import { KeyOf } from './Global';
import { FieldErrors, FieldValidationData } from './Validations';
import { FieldContext } from '../contexts/FieldContext';

export interface FieldHandlerProps<K extends KeyOf = KeyOf, V = any>
  extends FieldValidationData<V> {
  fieldRef?: RefObject<FieldContext>;
  name: K;
  onChange?: (value: V | undefined) => Promise<any> | any;
}

export interface FieldHandlerReturn<K extends KeyOf = KeyOf, V = any> {
  name: K;
  value: V | undefined;
  errors?: FieldErrors['errors'];
  isValid: FieldErrors['isValid'];
  setValue: (
    value: V | undefined,
    options?: { skipValidation?: boolean },
  ) => Promise<void>;
  validate: () => Promise<FieldErrors>;
  cleanErrors: () => void;
  blur: () => void;
}
