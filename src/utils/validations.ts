import { KeyOf } from '../types/Global';
import {
  FieldErrors,
  FormErrors,
  ValidationResult,
  ValidationsHandlerReturn,
} from '../types/Validations';

export const readFormValidationResult = <T extends Record<string, any>>(
  validationResultMap: ValidationsHandlerReturn<T>['validationResultMap'],
): Omit<FormErrors<T>, 'isValidating'> => {
  const value: Omit<FormErrors<T>, 'isValidating'> = { isValid: true, errors: {} };

  for (const validationResultMapKey in validationResultMap) {
    const key = validationResultMapKey as keyof typeof validationResultMap;
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
): Omit<FieldErrors, 'isValidating'> => {
  const value: Omit<FieldErrors, 'isValidating'> = { isValid: true, errors: [] };

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
