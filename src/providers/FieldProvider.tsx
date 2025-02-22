import { createContext, PropsWithChildren } from 'react';
import useFieldHandler from '../hooks/useFieldHandler';
import { FieldContextValues, FieldProviderProps } from '../types/FieldProvider';
import { KeyOf } from '../types/Global';

export const FieldContext = createContext<FieldContextValues>({} as FieldContextValues);

const FieldProvider = <K extends KeyOf = KeyOf, V = any>({
  component,
  children,
  ...rest
}: PropsWithChildren<FieldProviderProps<K, V>>) => {
  const contextValues: FieldContextValues<K, V> = useFieldHandler<K, V>(rest);
  return (
    <FieldContext.Provider value={contextValues as FieldContextValues}>
      {component ? component(contextValues) : children}
    </FieldContext.Provider>
  );
};

export default FieldProvider;
