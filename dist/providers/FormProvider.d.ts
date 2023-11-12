import { PropsWithChildren } from 'react';
import { UseFormHandlerProps, UseFormHandlerReturn } from 'hooks/useFormHandler';
export interface FormProviderProps<T extends Record<string, any> = Record<string, any>> extends UseFormHandlerProps<T> {
}
/**
 * Internal context provider to pass down to form elements the form state and handlers.
 * This is not being exported to keep the library API simple and clean.
 */
declare const FormProvider: <T extends Record<string, any> = Record<string, any>>({ initialValues, children, }: PropsWithChildren<FormProviderProps<T>>) => import("react/jsx-runtime").JSX.Element;
export interface FormContextValues<T extends Record<string, any> = Record<string, any>> extends UseFormHandlerReturn<T> {
    formId: string;
}
export declare const FormContext: import("react").Context<FormContextValues<Record<string, any>>>;
export default FormProvider;
