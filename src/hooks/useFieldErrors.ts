import { KeyOf } from '../types/Global';
import { FieldErrors } from '../types/Validations';
import { useValidationsContext } from '../contexts/ValidationsContext';
import { useMemo } from 'react';
import { readFieldValidationResult } from '../utils/validations';

export const useFieldErrors = <T extends Record<string, any> = Record<string, any>>(
  key: KeyOf<T>,
): FieldErrors => {
  const { validationResultMap } = useValidationsContext();
  return useMemo(
    () => readFieldValidationResult(validationResultMap[key]),
    [key, validationResultMap[key]],
  );
};
