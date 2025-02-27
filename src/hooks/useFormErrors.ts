import { useMemo } from 'react';
import { useValidationsContext } from '../contexts/ValidationsContext';
import { readFormValidationResult } from '../utils/validations';
import { KeyOf } from '../types/Global';
import { FormErrors } from '../types/Validations';

export const useFormErrors = <
  T extends Record<string, any> = Record<string, any>,
>(): FormErrors<T> => {
  const { validationResultMap, fieldsBeingValidated } = useValidationsContext();

  const { isValid, errors } = useMemo(
    () => readFormValidationResult(validationResultMap),
    [validationResultMap],
  );

  const isValidating = useMemo(() => {
    for (const key in fieldsBeingValidated) {
      if (fieldsBeingValidated[key as KeyOf<T>]) return true;
    }
    return false;
  }, [fieldsBeingValidated]);

  return { isValid, isValidating, errors };
};
