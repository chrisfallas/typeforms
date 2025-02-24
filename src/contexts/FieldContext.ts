import { createContext, useContext } from 'react';
import { KeyOf } from '../types/Global';
import { FieldHandlerReturn } from '../types/FieldHandler';

export type FieldContext<K extends KeyOf = KeyOf, V = any> = FieldHandlerReturn<K, V>;

const FieldContext = createContext({} as FieldContext);

export const useFieldContext = <K extends KeyOf = KeyOf, V = any>() => {
  const context = useContext(FieldContext);

  if (!Object.keys(context).length) {
    throw new Error('useFieldContext must be used from a Field child component');
  }

  return context as FieldContext<K, V>;
};

export default FieldContext;
