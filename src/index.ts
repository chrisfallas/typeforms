import useFormContext from './hooks/useFormContext';
import useFieldContext from './hooks/useFieldContext';
import Form from './components/Form';
import Field from './components/Field';
import { FormProps } from './types/Form';
import { FieldComponentProps, FieldProps } from './types/Field';
import TypeFormReturn from './types/TypeForm';

const TypeForm = <T extends Record<string, any>>(): TypeFormReturn<T> => ({
  Form,
  Field,
});

export default TypeForm;

export { useFormContext, useFieldContext };

export type { FormProps, FieldProps, FieldComponentProps };
