import { createContext, useContext } from 'react';
import { ValidationsHandlerReturn } from '../types/Validations';

export type ValidationsContext<T extends Record<string, any> = Record<string, any>> =
  ValidationsHandlerReturn<T>;

const ValidationsContext = createContext<ValidationsContext | null>(null);

export const useValidationsContext = <
  T extends Record<string, any> = Record<string, any>,
>() => {
  const context = useContext(ValidationsContext);

  if (!context) {
    throw new Error('useFieldContext must be used from a Field child component');
  }

  return context as ValidationsContext<T>;
};

export default ValidationsContext;
