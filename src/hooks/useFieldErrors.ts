import { useMemo } from 'react';
import { useValidationsContext } from '../contexts/ValidationsContext';
import { readFieldValidationResult } from '../utils/validations';
import { KeyOf } from '../types/Global';
import { FieldErrors } from '../types/Validations';

export const useFieldErrors = <T extends Record<string, any> = Record<string, any>>(
  key: KeyOf<T>,
): FieldErrors => {
  const { validationResultMap, fieldsBeingValidatedAsync } = useValidationsContext();

  const { isValid, errors } = useMemo(
    () => readFieldValidationResult(validationResultMap[key]),
    [key, validationResultMap[key]],
  );

  const isValidating = useMemo(() => {
    return fieldsBeingValidatedAsync[key] ?? false;
  }, [fieldsBeingValidatedAsync[key]]);

  return { isValid, isValidating, errors };
};
