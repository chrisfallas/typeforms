import { KeyOf } from './Global';

export interface FormErrorsReturn<T extends Record<string, any> = Record<string, any>> {
  isValid: boolean;
  errors: Partial<Record<KeyOf<T>, Array<string>>>;
}

export interface FieldErrorsReturn {
  isValid: boolean;
  errors: Array<string>;
}
