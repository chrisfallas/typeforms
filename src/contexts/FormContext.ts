import { createContext, useContext } from 'react';
import { FormHandlerReturn } from '../types/FormHandler';

const FormContext = createContext({} as FormHandlerReturn);

export const useFormContext = <T extends Record<string, any> = Record<string, any>>() => {
  const context = useContext(FormContext);

  if (!Object.keys(context).length) {
    throw new Error('useFieldContext must be used from a Field child component');
  }

  return context as FormHandlerReturn<T>;
};

export default FormContext;
