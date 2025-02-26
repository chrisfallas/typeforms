import { FormErrors } from '../types/Validations';
import { useValidationsContext } from '../contexts/ValidationsContext';
import { useMemo } from 'react';
import { readFormValidationResult } from '../utils/validations';

export const useFormErrors = <
  T extends Record<string, any> = Record<string, any>,
>(): FormErrors<T> => {
  const { validationResultMap } = useValidationsContext();
  return useMemo(
    () => readFormValidationResult(validationResultMap),
    [validationResultMap],
  );
};
