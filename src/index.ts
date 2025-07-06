import TypeFormSettingsProvider from './components/SettingsProvider';
import Form from './components/Form';
import Field from './components/Field';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import NumericField from './components/NumericField';
import Checkbox from './components/Checkbox';
import Select from './components/Select';
import Error from './components/Error';
import { useFormContext, FormContext } from './contexts/FormContext';
import { useFieldContext, FieldContext } from './contexts/FieldContext';
import { useFormErrors } from './hooks/useFormErrors';
import { useFieldErrors } from './hooks/useFieldErrors';
import { FormComponent, FormProps } from './types/Form';
import { FieldComponent, FieldProps } from './types/Field';
import {
  TextFieldComponent,
  TextFieldProps,
  CustomTextFieldProps,
} from './types/TextField';
import { TextAreaComponent, TextAreaProps, CustomTextAreaProps } from './types/TextArea';
import {
  NumericFieldComponent,
  NumericFieldProps,
  CustomNumericFieldProps,
} from './types/NumericField';
import { CheckboxComponent, CheckboxProps, CustomCheckboxProps } from './types/Checkbox';
import { SelectComponent, SelectProps, CustomSelectProps } from './types/Select';
import { ErrorComponent, ErrorProps } from './types/Error';
import { TypeFormsSettings } from './types/Settings';

interface TypeForm<T extends Record<string, any> = Record<string, any>> {
  Form: FormComponent<T>;
  Field: FieldComponent<T>;
  TextField: TextFieldComponent<T>;
  TextArea: TextAreaComponent<T>;
  NumericField: NumericFieldComponent<T>;
  Checkbox: CheckboxComponent<T>;
  Select: SelectComponent<T>;
  Error: ErrorComponent<T>;
}

const TypeForm = <T extends Record<string, any>>(): TypeForm<T> => ({
  Form: Form as TypeForm<T>['Form'],
  Field: Field as TypeForm<T>['Field'],
  TextField: TextField as TypeForm<T>['TextField'],
  TextArea: TextArea as TypeForm<T>['TextArea'],
  NumericField: NumericField as TypeForm<T>['NumericField'],
  Checkbox: Checkbox as TypeForm<T>['Checkbox'],
  Select: Select as TypeForm<T>['Select'],
  Error: Error as TypeForm<T>['Error'],
});

export default TypeForm;

export {
  TypeFormSettingsProvider,
  useFormContext,
  useFieldContext,
  useFormErrors,
  useFieldErrors,
};

export type {
  TypeFormsSettings,
  FormProps,
  FormContext,
  FieldProps,
  FieldContext,
  TextFieldProps,
  CustomTextFieldProps,
  TextAreaProps,
  CustomTextAreaProps,
  NumericFieldProps,
  CustomNumericFieldProps,
  CheckboxProps,
  CustomCheckboxProps,
  SelectProps,
  CustomSelectProps,
  ErrorProps,
};
