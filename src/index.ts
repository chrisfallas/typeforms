import { FormProps } from './types/Form';
import { InputProps, HTMLInputProps } from './types/Input';
import TypeFormReturn from './types/TypeForm';
import { FormElementProps } from './types/Element';
import Form from './components/Form';
import Input from './components/Input';
import useFormContext from './hooks/useFormContext';
import useFormElement from './hooks/useFormElement';

const TypeForm = <T extends Record<string, any>>(): TypeFormReturn<T> => ({
  Form: Form as TypeFormReturn<T>['Form'],
  Input: Input as TypeFormReturn<T>['Input'],
  applyTypes: ((component) => component) as TypeFormReturn<T>['applyTypes'],
});

export default TypeForm;

export { useFormContext, useFormElement };

export type { FormProps, FormElementProps, InputProps, HTMLInputProps };
