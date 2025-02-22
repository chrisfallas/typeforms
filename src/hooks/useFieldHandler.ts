import { KeyOf } from '../types/Global';
import { FieldHandlerProps, FieldHandlerReturn } from '../types/FieldHandler';
import useFormContext from './useFormContext';
import { useImperativeHandle, useMemo } from 'react';

const useFieldHandler = <K extends KeyOf = KeyOf, V = any>({
  fieldRef,
  name,
  onChange,
}: FieldHandlerProps<K, V>): FieldHandlerReturn<K, V> => {
  const { getValue, setValue } = useFormContext();

  const value = getValue(name);

  const handleSetValue: FieldHandlerReturn<K, V>['setValue'] = (value) => {
    onChange?.(value);
    setValue(name, value);
  };

  const onChangeHandler: FieldHandlerReturn<K, V>['onChangeHandler'] = (event) => {
    if (!event?.target) return;
    handleSetValue(event.target.value);
  };

  const contextValues: FieldHandlerReturn<K, V> = useMemo(
    () => ({
      name,
      value,
      setValue: handleSetValue,
      onChangeHandler,
    }),
    [name, value],
  );

  useImperativeHandle(fieldRef, () => contextValues);

  return contextValues;
};

export default useFieldHandler;
