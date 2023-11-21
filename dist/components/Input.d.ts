/// <reference types="react" />
import { KeyOf, RenderProp } from '../types/Global';
import { HTMLInputProps, InputProps } from '../types/Input';
declare const Input: <T extends Record<string, any> = Record<string, any>, K extends KeyOf<T> = KeyOf<T>>(props: InputProps<T, K> & RenderProp<HTMLInputProps>) => string | number | boolean | Iterable<import("react").ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
export default Input;
