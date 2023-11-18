import { PropsWithChildren } from 'react';
import { JSXElement, LabelProps, RecordKey, RenderProp } from './Global';
import Form from '../components/Form';
import { HTMLInputProps, InputOwnProps, InputProps } from './Input';
interface TypeFormReturn<T extends Record<string, any>> {
    Form: typeof Form<T>;
    Input: <K extends Extract<keyof T, string>, V = T[K]>(props: TypeFormInputProps<K, V> & RenderProp<HTMLInputProps>) => JSXElement;
    applyInputTypes: <C extends InputProps>(component: (props: C) => JSXElement) => <K extends Extract<keyof T, string>, V = T[K]>(props: TypeFormInputProps<K, V> & Omit<C, keyof InputProps>) => JSXElement;
}
export type TypeFormInputProps<K extends RecordKey = string, V = any> = PropsWithChildren<InputOwnProps<K, V> & Omit<HTMLInputProps, keyof InputOwnProps> & LabelProps>;
export default TypeFormReturn;
