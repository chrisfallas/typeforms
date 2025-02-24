import { FormEvent, RefObject } from 'react';
import { KeyOf } from './Global';
import { FormErrors } from './ValidationErrors';
import { FormContext } from '../contexts/FormContext';

export interface FormHandlerProps<T extends Record<string, any> = Record<string, any>> {
  formRef?: RefObject<FormContext<T>>;
  initialValues?: Partial<T>;
  onChange?: (data: Partial<T>) => Promise<any> | any;
  onSubmit?: (
    result: OnSubmitResultSuccess<T> | OnSubmitResultError<T>,
  ) => Promise<any> | any;
  onReset?: () => Promise<any> | any;
  debug?: boolean | string;
}

export interface FormHandlerReturn<T extends Record<string, any> = Record<string, any>> {
  data: Partial<T>;
  errors: FormErrors<T>['errors'];
  isValid: FormErrors<T>['isValid'];
  isDirty: boolean;
  isSubmitting: boolean;
  getValue: <K extends KeyOf<T>>(name: K) => T[K] | undefined;
  setValue: <K extends KeyOf<T>>(
    name: K,
    value: T[K],
    options?: { skipValidation?: boolean },
  ) => Promise<void>;
  setValues: <K extends KeyOf<T>>(
    values: Array<{ name: K; value: T[K]; skipValidation?: boolean }>,
  ) => Promise<void>;
  validate: <K extends KeyOf<T> = KeyOf<T>>(options?: {
    keys?: Array<K>;
    skipStateUpdate?: boolean;
  }) => Promise<FormErrors<T>>;
  submit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => Promise<void>;
}

type OnSubmitResultSuccess<T extends Record<string, any> = Record<string, any>> = {
  ok: true;
  data: T;
};

type OnSubmitResultError<T extends Record<string, any> = Record<string, any>> = {
  ok: false;
  errors: FormErrors<T>['errors'];
};
