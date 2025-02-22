import { FormHandlerProps, FormHandlerReturn } from './FormHandler';
import { RenderProp } from './Global';

export interface FormProviderProps<T extends Record<string, any> = Record<string, any>>
  extends FormHandlerProps<T> {
  render?: RenderProp<FormContextValues<T>>;
}

export interface FormContextValues<T extends Record<string, any> = Record<string, any>>
  extends FormHandlerReturn<T> {}
