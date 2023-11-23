import { PropsWithChildren } from 'react';
import { FormContextValues } from '../types/FormProvider';
import { FormProviderProps } from '../types/FormProvider';
import { RenderProp } from '../types/Global';
export declare const FormContext: import("react").Context<FormContextValues<Record<string, any>>>;
/**
 * Internal context provider to pass down to form elements the form state and handlers.
 * This is not being exported to keep the library API simple and clean.
 */
declare const FormProvider: <T extends Record<string, any> = Record<string, any>>({ customFormId, initialValues, validateOnSubmit, validateOnChange, validateOnBlur, schemaValidation, onChange, onSubmit, render, children, }: PropsWithChildren<FormProviderProps<T> & RenderProp<FormContextValues<T>>>) => import("react/jsx-runtime").JSX.Element;
export default FormProvider;
