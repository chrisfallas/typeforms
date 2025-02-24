import { createContext, useContext } from 'react';
import { FormHandlerReturn } from '../types/FormHandler';

export type FormContext<T extends Record<string, any> = Record<string, any>> =
  FormHandlerReturn<T>;

const FormContext = createContext({} as FormContext);

export const useFormContext = <T extends Record<string, any> = Record<string, any>>() => {
  const context = useContext(FormContext);

  if (!Object.keys(context).length) {
    throw new Error('useFieldContext must be used from a Field child component');
  }

  return context as FormContext<T>;
};

export default FormContext;
