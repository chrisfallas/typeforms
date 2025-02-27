import { useMemo } from 'react';
import { useValidationsContext } from '../contexts/ValidationsContext';
import { readFieldValidationResult } from '../utils/validations';
import { KeyOf } from '../types/Global';
import { FieldErrors } from '../types/Validations';

export const useFieldErrors = <T extends Record<string, any> = Record<string, any>>(
  key: KeyOf<T>,
): FieldErrors => {
  const { validationResultMap, fieldsBeingValidated } = useValidationsContext();

  const { isValid, errors } = useMemo(
    () => readFieldValidationResult(validationResultMap[key]),
    [key, validationResultMap[key]],
  );

  const isValidating = useMemo(() => {
    return fieldsBeingValidated[key] ?? false;
  }, [fieldsBeingValidated[key]]);

  return { isValid, isValidating, errors };
};
