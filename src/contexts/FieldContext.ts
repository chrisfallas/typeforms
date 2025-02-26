import { createContext, useContext } from 'react';
import { FieldHandlerReturn } from '../types/FieldHandler';

export type FieldContext<V> = FieldHandlerReturn<V>;

const FieldContext = createContext<FieldContext<any> | null>(null);

export const useFieldContext = <V>() => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error('useFieldContext must be used from a Field child component');
  }

  return context as FieldContext<V>;
};

export default FieldContext;
