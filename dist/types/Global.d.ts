import { ReactNode } from 'react';
export type JSXElement = ReactNode | null;
export type KeyOf<T extends Record<string, any> = Record<string, any>> = Extract<keyof T, string>;
export type RenderProp<P> = {
    render?: (props: P) => JSXElement;
};
export type LabelProps = {
    label?: string;
    labelId?: string;
    labelClassName?: string;
    labelRef?: React.RefObject<HTMLLabelElement>;
    labelWrap?: 'wrap' | 'nowrap';
    labelPlacement?: 'top' | 'bottom';
};
