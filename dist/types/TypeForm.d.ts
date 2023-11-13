import { JSXElement } from './Global';
import TypeFormInputProps from './TypeFormInput';
interface TypeForm<T extends Record<string, any>> {
    Input: <K extends keyof T, V = T[K]>(props: TypeFormInputProps<K, V>) => JSXElement;
}
export default TypeForm;
