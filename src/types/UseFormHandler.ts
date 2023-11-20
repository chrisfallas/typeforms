import { ChangeEvent, FormEvent } from 'react';
import { FormSchemaValidatorFunction, FormSchemaValidatorObject } from './Form';
import { FormElement } from './Element';

export interface UseFormHandlerProps<
  T extends Record<string, any> = Record<string, any>,
> {
  initialValues?: Partial<T>;
  schemaValidation?: FormSchemaValidatorFunction<T> | FormSchemaValidatorObject<T>;
  onChange?: (data: Partial<T>) => Promise<void> | void;
  onSubmit?: (result: { ok: boolean; data: T }) => Promise<void> | void;
}

export interface UseFormHandlerReturn<
  T extends Record<string, any> = Record<string, any>,
> {
  data: Partial<T>;
  getValue: <K extends Extract<keyof T, string>>(name: K) => T[K] | undefined;
  setValue: <K extends Extract<keyof T, string>>(name: K, value: T[K]) => Promise<void>;
  setValues: <K extends Extract<keyof T, string>>(
    values: Array<{ name: K; value: T[K]; validate?: boolean }>,
  ) => Promise<void>;
  onChange: <T extends FormElement = FormElement>(event: ChangeEvent<T>) => Promise<void>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}
