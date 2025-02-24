import { useMemo } from 'react';
import { useValidationsContext } from '../contexts/ValidationsContext';
import {
  readFieldValidationResult,
  readFormValidationResult,
} from '../utils/validations';
import { KeyOf } from '../types/Global';
import { FieldErrors, FormErrors } from '../types/ValidationErrors';

export const useFormErrors = <
  T extends Record<string, any> = Record<string, any>,
>(): FormErrors<T> => {
  const { validationResultMap } = useValidationsContext();
  return useMemo(
    () => readFormValidationResult(validationResultMap),
    [validationResultMap],
  );
};

export const useFieldErrors = <T extends Record<string, any> = Record<string, any>>(
  key: KeyOf<T>,
): FieldErrors => {
  const { validationResultMap } = useValidationsContext();
  return useMemo(
    () => readFieldValidationResult(validationResultMap[key]),
    [key, validationResultMap[key]],
  );
};
