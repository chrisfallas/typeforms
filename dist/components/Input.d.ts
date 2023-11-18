import { InputHTMLAttributes } from 'react';
import { RenderProp } from '../types/Global';
import { InputProps } from '../types/Input';
declare const Input: <T extends Record<string, any> = Record<string, any>, K extends Extract<keyof T, string> = Extract<keyof T, string>>(props: import("../types/Input").InputOwnProps<K, T[K]> & Omit<import("../types/Input").HTMLInputProps, keyof import("../types/Input").InputOwnProps<string, any>> & import("../types/Global").LabelProps & {
    children?: import("react").ReactNode;
} & RenderProp<InputHTMLAttributes<HTMLInputElement>>) => string | number | boolean | Iterable<import("react").ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
export default Input;
