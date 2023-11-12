import { FormProviderProps } from '../providers/FormProvider';
import { PropsWithChildren } from 'react';
export interface FormProps<T extends Record<string, any> = Record<string, any>> extends FormProviderProps<T> {
}
declare const Form: <T extends Record<string, any> = Record<string, any>>(props: PropsWithChildren<FormProps<T>>) => import("react/jsx-runtime").JSX.Element;
export default Form;
