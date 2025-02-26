import { useEffect, useImperativeHandle } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { useValidationsContext } from '../contexts/ValidationsContext';
import { useFieldErrors } from './useFieldErrors';
import { readFieldValidationResult } from '../utils/validations';
import { FieldHandlerProps, FieldHandlerReturn } from '../types/FieldHandler';
import { KeyOf } from '../types/Global';

const useFieldHandler = <
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T> = KeyOf<T>,
  V = T[K],
>({
  fieldRef,
  name,
  onChange,
  validation,
  validateOnMount,
  validateOnSubmit,
  validateOnChange,
  validateOnBlur,
}: FieldHandlerProps<T, K, V>): FieldHandlerReturn<V> => {
  const { getValue, setValue } = useFormContext();

  const validationsContext = useValidationsContext();

  const value = getValue(name);

  const { isValid, errors } = useFieldErrors(name);

  const setOwnValue: FieldHandlerReturn<V>['setValue'] = async (value, options) => {
    await setValue(name, value, { skipValidation: options?.skipValidation });
    onChange?.(value);
  };

  const validate: FieldHandlerReturn<V>['validate'] = async () => {
    const result = await validationsContext.validate({ keys: [name], event: 'manual' });
    return readFieldValidationResult(result[name]);
  };

  const cleanErrors: FieldHandlerReturn<V>['cleanErrors'] = () => {
    validationsContext.cleanErrors([name]);
  };

  const blur: FieldHandlerReturn<V>['blur'] = () => {
    validationsContext.validate({ keys: [name], event: 'onBlur' });
  };

  useEffect(() => {
    return validationsContext.registerFieldValidationData(name, {
      validation,
      validateOnMount,
      validateOnSubmit,
      validateOnChange,
      validateOnBlur,
    });
  }, [
    name,
    validation,
    validateOnMount,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
  ]);

  const contextValues: FieldHandlerReturn = {
    name,
    value,
    errors,
    isValid,
    setValue: setOwnValue,
    validate,
    cleanErrors,
    blur,
  };

  useImperativeHandle(fieldRef, () => contextValues);

  return contextValues;
};

export default useFieldHandler;
