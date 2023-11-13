/// <reference types="react" />
import Form, { FormProps } from './components/Form';
import Input, { InputProps } from './components/Input';
import NestedForm, { NestedFormProps } from './components/NestedForm';
import Select, { SelectProps } from './components/Select';
import TextArea, { TextAreaProps } from './components/TextArea';
import useFormContext from './hooks/useFormContext';
import useFormElement, { UseFormElementReturn } from './hooks/useFormElement';
import { FormContextValues } from './providers/FormProvider';
declare const TypeForm: <T extends Record<string, any>>() => {
    Form: (props: import("react").PropsWithChildren<FormProps<T>>) => import("react/jsx-runtime").JSX.Element;
    Input: <K extends keyof T, V = T[K]>(props: import("./types/TypeFormInput").default<K, V>) => import("./types/Global").JSXElement;
};
export default TypeForm;
export { Form, NestedForm, Input, TextArea, Select, useFormContext, useFormElement };
export type { FormProps, NestedFormProps, InputProps, TextAreaProps, SelectProps, FormContextValues, UseFormElementReturn, };
