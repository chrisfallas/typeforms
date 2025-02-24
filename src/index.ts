import Form from './components/Form';
import Field from './components/Field';
import Input from './components/Input';
import Error from './components/Error';
import { useFormContext } from './contexts/FormContext';
import { useFieldContext } from './contexts/FieldContext';
import { useFieldErrors, useFormErrors } from './hooks/useValidationErrors';
import { FormComponent, FormProps } from './types/Form';
import { FieldComponent, FieldComponentProps, FieldProps } from './types/Field';
import { InputComponent, InputProps } from './types/Input';
import { ErrorComponent, ErrorProps } from './types/Error';

const TypeForm = <T extends Record<string, any>>() => ({
  Form: Form as FormComponent<T>,
  Field: Field as FieldComponent<T>,
  Input: Input as InputComponent<T>,
  Error: Error as ErrorComponent<T>,
});

export default TypeForm;

export { useFormContext, useFieldContext, useFormErrors, useFieldErrors };

export type { FormProps, FieldProps, FieldComponentProps, InputProps, ErrorProps };
