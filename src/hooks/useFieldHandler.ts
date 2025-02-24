import { useEffect, useImperativeHandle } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { useValidationsContext } from '../contexts/ValidationsContext';
import { useFieldErrors } from './useValidationErrors';
import { FieldHandlerProps, FieldHandlerReturn } from '../types/FieldHandler';
import { KeyOf } from '../types/Global';

const useFieldHandler = <K extends KeyOf = KeyOf, V = any>({
  fieldRef,
  name,
  onChange,
  ...rest
}: FieldHandlerProps<K, V>): FieldHandlerReturn<K, V> => {
  const { getValue, setValue } = useFormContext();

  const { registerFieldValidationData, validate } = useValidationsContext();

  const value = getValue(name);

  const { isValid, errors } = useFieldErrors(name);

  const handleSetValue: FieldHandlerReturn<K, V>['setValue'] = async (value) => {
    onChange?.(value);
    setValue(name, value);
  };

  const blur = () => {
    validate({ keys: [name], event: 'onBlur' });
  };

  useEffect(() => registerFieldValidationData(name, rest), []);

  const contextValues: FieldHandlerReturn<K, V> = {
    name,
    value,
    errors,
    isValid,
    setValue: handleSetValue,
    blur,
  };

  useImperativeHandle(fieldRef, () => contextValues);

  return contextValues;
};

export default useFieldHandler;
