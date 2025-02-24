import Form from './components/Form';
import Field from './components/Field';
import Input from './components/Input';
import Error from './components/Error';
import { useFormContext } from './providers/FormProvider';
import { useFieldContext } from './providers/FieldProvider';
import { useFormErrors } from './hooks/useValidationErrors';
import { useFieldErrors } from './hooks/useValidationErrors';
import { FormProps } from './types/Form';
import { FieldComponentProps, FieldProps } from './types/Field';
import { InputProps } from './types/Input';
import { ErrorProps } from './types/Error';
import TypeFormReturn from './types/TypeForm';

const TypeForm = <T extends Record<string, any>>(): TypeFormReturn<T> => ({
  Form,
  Field,
  Input,
  Error,
});

export default TypeForm;

export { useFormContext, useFieldContext, useFormErrors, useFieldErrors };

export type { FormProps, FieldProps, FieldComponentProps, InputProps, ErrorProps };
