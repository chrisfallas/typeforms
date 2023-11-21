import { FormProps } from '../types/Form';
import { FormContextValues } from '../types/FormProvider';
import { RenderProp } from '../types/Global';
declare const Form: <T extends Record<string, any> = Record<string, any>>(props: FormProps<T> & RenderProp<FormContextValues<T>>) => import("react/jsx-runtime").JSX.Element;
export default Form;
