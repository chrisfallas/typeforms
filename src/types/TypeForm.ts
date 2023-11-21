import { JSXElement, LabelProps, KeyOf, RenderProp } from './Global';
import { HTMLInputProps, InputOwnProps } from './Input';
import { FormElementProps } from './Element';
import Form from '../components/Form';

interface TypeFormReturn<T extends Record<string, any>> {
  Form: typeof Form<T>;
  Input: <K extends KeyOf<T>, V = T[K]>(
    props: TypeFormInputProps<K, V> & RenderProp<HTMLInputProps>,
  ) => JSXElement;

  applyTypes: <C extends FormElementProps>(
    component: (props: C) => JSXElement,
  ) => <K extends KeyOf<T> = KeyOf<T>, V = T[K]>(
    props: FormElementProps<K, V> & Omit<C, keyof FormElementProps>,
  ) => JSXElement;
}

export interface TypeFormInputProps<K extends KeyOf = string, V = any>
  extends InputOwnProps<K, V>,
    Omit<HTMLInputProps, keyof InputOwnProps>,
    LabelProps {}

export default TypeFormReturn;
