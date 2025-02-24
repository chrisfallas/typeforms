import { KeyOf } from './Global';

export interface FormErrors<T extends Record<string, any> = Record<string, any>> {
  isValid: boolean;
  errors: Partial<Record<KeyOf<T>, Array<string>>>;
}

export interface FieldErrors {
  isValid: boolean;
  errors: Array<string>;
}
