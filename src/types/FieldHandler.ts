import { RefObject } from 'react';
import { KeyOf } from './Global';
import { FieldErrors, FieldValidationData } from './Validations';
import { FieldContext } from '../contexts/FieldContext';

export interface FieldHandlerProps<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T> = KeyOf<T>,
  V = T[K],
> extends FieldValidationData<V> {
  fieldRef?: RefObject<FieldContext<T[K]>>;
  name: K;
  onChange?: (value: V | undefined) => Promise<any> | any;
}

export interface FieldHandlerReturn<V = any> {
  name: KeyOf;
  value: V | undefined;
  isValidating: boolean;
  isValid: FieldErrors['isValid'];
  errors?: FieldErrors['errors'];
  setValue: (
    value: V | undefined,
    options?: { skipValidation?: boolean },
  ) => Promise<void>;
  validate: () => Promise<Omit<FieldErrors, 'isValidating'>>;
  cleanErrors: () => void;
  blur: () => void;
}
