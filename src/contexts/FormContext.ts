import { createContext, useContext } from 'react';
import { FormHandlerReturn } from '../types/FormHandler';

export type FormContext<T extends Record<string, any>> = FormHandlerReturn<T>;

const FormContext = createContext<FormContext<Record<string, any>> | null>(null);

export const useFormContext = <T extends Record<string, any>>() => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFieldContext must be used from a Field child component');
  }

  return context as FormContext<T>;
};

export default FormContext;
