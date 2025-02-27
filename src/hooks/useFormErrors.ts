import { useMemo } from 'react';
import { useValidationsContext } from '../contexts/ValidationsContext';
import { readFormValidationResult } from '../utils/validations';
import { KeyOf } from '../types/Global';
import { FormErrors } from '../types/Validations';

export const useFormErrors = <
  T extends Record<string, any> = Record<string, any>,
>(): FormErrors<T> => {
  const { validationResultMap, fieldsBeingValidatedAsync } = useValidationsContext();

  const { isValid, errors } = useMemo(
    () => readFormValidationResult(validationResultMap),
    [validationResultMap],
  );

  const isValidating = useMemo(() => {
    for (const key in fieldsBeingValidatedAsync) {
      if (fieldsBeingValidatedAsync[key as KeyOf<T>]) return true;
    }
    return false;
  }, [fieldsBeingValidatedAsync]);

  return { isValid, isValidating, errors };
};
