import { createContext, useContext } from 'react';
import { KeyOf } from '../types/Global';
import { FieldHandlerReturn } from '../types/FieldHandler';

const FieldContext = createContext({} as FieldHandlerReturn);

export const useFieldContext = <K extends KeyOf = KeyOf, V = any>() => {
  const context = useContext(FieldContext);

  if (!Object.keys(context).length) {
    throw new Error('useFieldContext must be used from a Field child component');
  }

  return context as FieldHandlerReturn<K, V>;
};

export default FieldContext;
