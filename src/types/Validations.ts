import { MutableRefObject } from 'react';
import { KeyOf } from './Global';

export interface ValidationsHandlerProps<
  T extends Record<string, any> = Record<string, any>,
> extends ValidationEventFlags {
  validations?: FormValidationCallback<T> | FieldValidationMap<T>;
}

export interface ValidationsHandlerReturn<
  T extends Record<string, any> = Record<string, any>,
> {
  dataRef: MutableRefObject<Partial<T>>;
  validationResultMap: Partial<Record<KeyOf<T>, ValidationResult>>;
  fieldsBeingValidated: Partial<Record<KeyOf<T>, boolean>>;
  registerFieldValidationData: <K extends KeyOf<T>>(
    key: K,
    validationData: FieldValidationData<T[K]>,
  ) => () => void;
  validate: (options?: {
    keys?: Array<KeyOf<T>>;
    skipStateUpdate?: boolean;
    event?: FieldValidationEvent;
  }) => Promise<Partial<Record<KeyOf<T>, ValidationResult>>>;
  cleanErrors: (keys?: Array<KeyOf<T>>) => void;
}

export interface FieldValidationData<V = any> extends ValidationEventFlags {
  validation?: FieldValidationCallback<V>;
}

export type FormValidationCallback<T extends Record<string, any> = Record<string, any>> =
  (data: Partial<T>) => FieldValidationMap<T>;

export type FieldValidationMap<
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T> = KeyOf<T>,
> = { [key in K]?: FieldValidationCallback<T[key]> };

export type FieldValidationCallback<V = any> = (
  value?: V,
) => Promise<ValidationResult> | ValidationResult;

export type ValidationResult = boolean | string | Array<string>;

export type FieldValidationEvent =
  | 'onMount'
  | 'onSubmit'
  | 'onChange'
  | 'onBlur'
  | 'onReset'
  | 'manual';

export interface ValidationEventFlags {
  validateOnMount?: boolean;
  validateOnSubmit?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface FieldErrors {
  isValid: boolean;
  isValidating: boolean;
  errors: Array<string>;
}

export interface FormErrors<T extends Record<string, any> = Record<string, any>> {
  isValid: boolean;
  isValidating: boolean;
  errors: Partial<Record<KeyOf<T>, Array<string>>>;
}
