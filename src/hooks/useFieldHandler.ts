import { useEffect, useImperativeHandle } from 'react';
import { useFormContext } from '../contexts/FormContext';
import { useValidationsContext } from '../contexts/ValidationsContext';
import { readFieldValidationResult } from '../utils/validations';
import { FieldHandlerProps, FieldHandlerReturn } from '../types/FieldHandler';
import { KeyOf } from '../types/Global';
import { useFieldErrors } from './useFieldErrors';

const useFieldHandler = <K extends KeyOf = KeyOf, V = any>({
  fieldRef,
  name,
  onChange,
  validation,
  validateOnMount,
  validateOnSubmit,
  validateOnChange,
  validateOnBlur,
}: FieldHandlerProps<K, V>): FieldHandlerReturn<K, V> => {
  const { getValue, setValue } = useFormContext();

  const validationsContext = useValidationsContext();

  const value = getValue(name);

  const { isValid, errors } = useFieldErrors(name);

  const setOwnValue: FieldHandlerReturn<K, V>['setValue'] = async (value, options) => {
    await setValue(name, value, { skipValidation: options?.skipValidation });
    onChange?.(value);
  };

  const validate: FieldHandlerReturn<K, V>['validate'] = async () => {
    const result = await validationsContext.validate({ keys: [name], event: 'manual' });
    return readFieldValidationResult(result[name]);
  };

  const cleanErrors: FieldHandlerReturn<K, V>['cleanErrors'] = () => {
    validationsContext.cleanErrors([name]);
  };

  const blur: FieldHandlerReturn<K, V>['blur'] = () => {
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

  const contextValues: FieldHandlerReturn<K, V> = {
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
