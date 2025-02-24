import { ValidationResult, ValidationsHandlerReturn } from '../types/ValidationsHandler';
import { FieldErrorsReturn, FormErrorsReturn } from '../types/ValidationErrors';
import { KeyOf } from '../types/Global';

export const readFormValidationResult = <T extends Record<string, any>>(
  validationResultMap: ValidationsHandlerReturn<T>['validationResultMap'],
): FormErrorsReturn<T> => {
  const value: FormErrorsReturn<T> = { isValid: true, errors: {} };

  for (const key in validationResultMap) {
    const validationResult = validationResultMap[key];
    const { isValid, errors } = readFieldValidationResult(validationResult);
    if (isValid) continue;
    value.isValid = false;
    value.errors[key as KeyOf<T>] = errors;
  }

  return value;
};

export const readFieldValidationResult = (
  validationResult?: ValidationResult,
): FieldErrorsReturn => {
  const value: FieldErrorsReturn = { isValid: true, errors: [] };

  if (typeof validationResult === 'string') {
    if (validationResult === '') return value;
    value.isValid = false;
    value.errors = [validationResult];
  } else if (Array.isArray(validationResult)) {
    if (validationResult.length === 0) return value;
    value.isValid = false;
    value.errors = validationResult;
  } else if (typeof validationResult === 'boolean') {
    value.isValid = validationResult;
  }

  return value;
};
