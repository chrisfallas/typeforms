import Form, { FormProps } from './components/Form';
import Input, { InputProps } from './components/Input';
import NestedForm, { NestedFormProps } from './components/NestedForm';
import Select, { SelectProps } from './components/Select';
import TextArea, { TextAreaProps } from './components/TextArea';
import useFormContext from './hooks/useFormContext';
import useFormElement, { UseFormElementReturn } from './hooks/useFormElement';
import { FormContextValues } from './providers/FormProvider';
import TypeFormTypes from './types/TypeForm';

const TypeForm = <T extends Record<string, any>>() => ({
  Form: Form<T>,
  Input: Input as TypeFormTypes<T>['Input'],
});

export default TypeForm;

export { Form, NestedForm, Input, TextArea, Select, useFormContext, useFormElement };

export type {
  FormProps,
  NestedFormProps,
  InputProps,
  TextAreaProps,
  SelectProps,
  FormContextValues,
  UseFormElementReturn,
};
