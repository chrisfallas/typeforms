import { FormEvent, RefObject } from 'react';
import { KeyOf } from './Global';

export interface FormHandlerProps<T extends Record<string, any> = Record<string, any>> {
  formRef?: RefObject<FormHandlerReturn<T>>;
  initialValues?: Partial<T>;
  onChange?: (data: Partial<T>) => Promise<void> | void;
  onSubmit?: (
    result: OnSubmitResultSuccess | OnSubmitResultError,
  ) => Promise<void> | void;
  onReset?: () => Promise<void> | void;
  debug?: boolean | string;
}

export interface FormHandlerReturn<T extends Record<string, any> = Record<string, any>> {
  data: Partial<T>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  getValue: <K extends KeyOf<T>>(name: K) => T[K] | undefined;
  setValue: <K extends KeyOf<T>>(name: K, value: T[K]) => Promise<void>;
  setValues: <K extends KeyOf<T>>(
    values: Array<{ name: K; value: T[K]; validate?: boolean }>,
  ) => Promise<void>;
  submit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => Promise<void>;
}

type OnSubmitResultSuccess<T extends Record<string, any> = Record<string, any>> = {
  ok: true;
  data: T;
};

type OnSubmitResultError<T extends Record<string, any> = Record<string, any>> = {
  ok: false;
  errors: Record<KeyOf<Partial<T>>, string>;
};
