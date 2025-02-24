import Form from './components/Form';
import Field from './components/Field';
import Input from './components/Input';
import Error from './components/Error';
import { useFormContext, FormContext } from './contexts/FormContext';
import { useFieldContext, FieldContext } from './contexts/FieldContext';
import { useFieldErrors, useFormErrors } from './hooks/useValidationErrors';
import useFormRef, { FormRefHook } from './hooks/useFormRef';
import useFieldRef, { FieldRefHook } from './hooks/useFieldRef';
import { FormComponent, FormProps } from './types/Form';
import { FieldComponent, FieldComponentProps, FieldProps } from './types/Field';
import { InputComponent, InputProps } from './types/Input';
import { ErrorComponent, ErrorProps } from './types/Error';

const TypeForm = <T extends Record<string, any>>() => ({
  Form: Form as FormComponent<T>,
  Field: Field as FieldComponent<T>,
  Input: Input as InputComponent<T>,
  Error: Error as ErrorComponent<T>,
  useFormRef: useFormRef as FormRefHook<T>,
  useFieldRef: useFieldRef as FieldRefHook<T>,
});

export default TypeForm;

export { useFormContext, useFieldContext, useFormErrors, useFieldErrors };

export type {
  FormProps,
  FormContext,
  FieldProps,
  FieldContext,
  FieldComponentProps,
  InputProps,
  ErrorProps,
};
