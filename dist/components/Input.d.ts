import TypeFormInputProps from '../types/TypeFormInput';
export type InputProps<T extends Record<string, any> = Record<string, any>, K extends keyof T = any> = TypeFormInputProps<K, T[K]>;
declare const Input: <T extends Record<string, any> = Record<string, any>, K extends keyof T = any>(props: InputProps<T, K>) => import("react/jsx-runtime").JSX.Element;
export default Input;
