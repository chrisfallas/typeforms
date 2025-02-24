import { createContext, useContext } from 'react';
import { ValidationsHandlerReturn } from '../types/ValidationsHandler';

export type ValidationsContext<T extends Record<string, any> = Record<string, any>> =
  ValidationsHandlerReturn<T>;

const ValidationsContext = createContext({} as ValidationsContext);

export const useValidationsContext = <
  T extends Record<string, any> = Record<string, any>,
>() => {
  const context = useContext(ValidationsContext);

  if (!Object.keys(context).length) {
    throw new Error('useFieldContext must be used from a Field child component');
  }

  return context as ValidationsContext<T>;
};

export default ValidationsContext;
