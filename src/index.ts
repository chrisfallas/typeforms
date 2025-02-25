import Form from './components/Form';
import Field from './components/Field';
import Input from './components/Input';
import Error from './components/Error';
import { useFormContext } from './contexts/FormContext';
import { useFieldContext } from './contexts/FieldContext';
import { useFieldErrors, useFormErrors } from './hooks/useValidationErrors';
import useFormRef, { FormRefHook } from './hooks/useFormRef';
import useFieldRef, { FieldRefHook } from './hooks/useFieldRef';
import { FormComponent, FormProps } from './types/Form';
import { FieldComponent, FieldComponentProps, FieldProps } from './types/Field';
import { InputComponent, InputProps } from './types/Input';
import { ErrorComponent, ErrorProps } from './types/Error';

interface TypeForm<T extends Record<string, any> = Record<string, any>> {
  Form: FormComponent<T>;
  Field: FieldComponent<T>;
  Input: InputComponent<T>;
  Error: ErrorComponent<T>;
  useFormRef: FormRefHook<T>;
  useFieldRef: FieldRefHook<T>;
}

const TypeForm = <T extends Record<string, any>>(): TypeForm<T> => ({
  Form: Form as TypeForm<T>['Form'],
  Field: Field as TypeForm<T>['Field'],
  Input: Input as TypeForm<T>['Input'],
  Error: Error as TypeForm<T>['Error'],
  useFormRef: useFormRef as TypeForm<T>['useFormRef'],
  useFieldRef: useFieldRef as TypeForm<T>['useFieldRef'],
});

export default TypeForm;

export { useFormContext, useFieldContext, useFormErrors, useFieldErrors };

export type { FormProps, FieldProps, FieldComponentProps, InputProps, ErrorProps };
