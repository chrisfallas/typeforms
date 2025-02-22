import { useContext } from 'react';
import { FieldContext } from '../providers/FieldProvider';
import { KeyOf } from '../types/Global';
import { FieldContextValues } from '../types/FieldProvider';

const useFieldContext = <K extends KeyOf = KeyOf, V = any>() => {
  const context = useContext(FieldContext);

  if (!context)
    throw new Error('useFieldContext must be used from a Field child component');

  return context as FieldContextValues<K, V>;
};

export default useFieldContext;
