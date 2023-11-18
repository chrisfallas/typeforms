import { ReactNode } from 'react';
export type RecordKey = string | number | symbol;
export type JSXElement = ReactNode | null;
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
