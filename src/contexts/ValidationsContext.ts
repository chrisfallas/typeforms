import { createContext, useContext } from 'react';
import { ValidationsHandlerReturn } from '../types/ValidationsHandler';

const ValidationsContext = createContext({} as ValidationsHandlerReturn);

export const useValidationsContext = <
  T extends Record<string, any> = Record<string, any>,
>() => {
  const context = useContext(ValidationsContext);

  if (!Object.keys(context).length) {
    throw new Error('useFieldContext must be used from a Field child component');
  }

  return context as ValidationsHandlerReturn<T>;
};

export default ValidationsContext;
