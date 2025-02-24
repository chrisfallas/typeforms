import { useMemo } from 'react';
import { useValidationsContext } from '../providers/ValidationsProvider';
import {
  readFieldValidationResult,
  readFormValidationResult,
} from '../utils/validations';
import { KeyOf } from '../types/Global';
import { FieldErrorsReturn, FormErrorsReturn } from '../types/ValidationErrors';

export const useFormErrors = <
  T extends Record<string, any> = Record<string, any>,
>(): FormErrorsReturn<T> => {
  const { validationResultMap } = useValidationsContext();
  return useMemo(
    () => readFormValidationResult(validationResultMap),
    [validationResultMap],
  );
};

export const useFieldErrors = <T extends Record<string, any> = Record<string, any>>(
  key: KeyOf<T>,
): FieldErrorsReturn => {
  const { validationResultMap } = useValidationsContext();
  return useMemo(
    () => readFieldValidationResult(validationResultMap[key]),
    [key, validationResultMap[key]],
  );
};
