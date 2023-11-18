import { DetailedHTMLProps, LabelHTMLAttributes, PropsWithChildren } from 'react';
export type HTMLLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
export interface LabelOwnProps {
    wrap: 'wrap' | 'nowrap';
    placement?: 'top' | 'left' | 'right' | 'bottom';
}
export type LabelProps = PropsWithChildren<LabelOwnProps & Omit<HTMLLabelProps, keyof LabelOwnProps>>;
