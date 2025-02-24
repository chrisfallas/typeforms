import { MutableRefObject } from 'react';
import { KeyOf } from './Global';

export interface ValidationsHandlerProps<
  T extends Record<string, any> = Record<string, any>,
> {
  validations?: FieldValidationMap<T>;
  validateOnMount?: boolean;
  validateOnSubmit?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface ValidationsHandlerReturn<
  T extends Record<string, any> = Record<string, any>,
> {
  dataRef: MutableRefObject<Partial<T>>;
  validationResultMap: Partial<Record<KeyOf<T>, ValidationResult>>;
  registerFieldValidationData: <K extends KeyOf<T>>(
    key: K,
    validationData: FieldValidationData<T[K]>,
  ) => () => void;
  validate: (options?: {
    keys?: Array<KeyOf<T>>;
    shouldUpdateState?: boolean;
    event?: FieldValidationEvent;
  }) => Promise<Partial<Record<KeyOf<T>, ValidationResult>>>;
}

export type FieldValidationData<V = any> = {
  validation?: FieldValidationCallback<V>;
  validateOnMount?: boolean;
  validateOnSubmit?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
};

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
  | 'manual';
