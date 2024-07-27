import { UseFormHandlerProps, UseFormHandlerReturn } from './UseFormHandler';

export interface FormProviderProps<T extends Record<string, any> = Record<string, any>>
  extends UseFormHandlerProps<T> {}

export interface FormContextValues<T extends Record<string, any> = Record<string, any>>
  extends UseFormHandlerReturn<T> {}
