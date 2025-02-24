import { useRef, useState } from 'react';
import { readFieldValidationResult } from '../utils/validations';
import { KeyOf } from '../types/Global';
import {
  FieldValidationCallback,
  FieldValidationEvent,
  ValidationsHandlerProps,
  ValidationsHandlerReturn,
  FieldValidationData,
} from '../types/ValidationsHandler';

const useValidationsHandler = <T extends Record<string, any> = Record<string, any>>({
  validations = {},
  validateOnMount: globalValidateOnMount = false,
  validateOnSubmit: globalValidateOnSubmit = true,
  validateOnChange: globalValidateOnChange = true,
  validateOnBlur: globalValidateOnBlur = true,
}: ValidationsHandlerProps<T>): ValidationsHandlerReturn<T> => {
  const dataRef = useRef<Partial<T>>({});

  const fieldValidationDataMapRef = useRef<
    Partial<Record<KeyOf<T>, FieldValidationData>>
  >({});

  const [validationResultMap, setValidationResultMap] = useState<
    ValidationsHandlerReturn<T>['validationResultMap']
  >({});

  const registerFieldValidationData = (
    key: KeyOf<T>,
    validationData: FieldValidationData,
  ) => {
    fieldValidationDataMapRef.current[key] = validationData;
    return () => {
      delete fieldValidationDataMapRef.current[key];
    };
  };

  const updateValidationResultMap = async (
    partialValidationResultMap: Partial<typeof validationResultMap>,
  ) => {
    setValidationResultMap((prevState) => ({
      ...prevState,
      ...partialValidationResultMap,
    }));
  };

  const getFieldValidations = (key: KeyOf<T>, event: FieldValidationEvent) => {
    const fieldValidations: Array<FieldValidationCallback> = [];
    const {
      validation: fieldValidation,
      validateOnMount = globalValidateOnMount,
      validateOnSubmit = globalValidateOnSubmit,
      validateOnChange = globalValidateOnChange,
      validateOnBlur = globalValidateOnBlur,
    } = fieldValidationDataMapRef.current[key] ?? {};
    const globalValidation = validations[key];
    for (const validation of [fieldValidation, globalValidation]) {
      if (!validation) continue;
      if (event === 'onMount' && !validateOnMount) continue;
      if (event === 'onSubmit' && !validateOnSubmit) continue;
      if (event === 'onChange' && !validateOnChange) continue;
      if (event === 'onBlur' && !validateOnBlur) continue;
      fieldValidations.push(validation);
    }
    return fieldValidations;
  };

  const validateField =
    (key: KeyOf<T>) => async (validation: FieldValidationCallback) => {
      const value = dataRef.current[key];
      const result = await validation(value);
      return [key, result];
    };

  const validate: ValidationsHandlerReturn<T>['validate'] = async (options = {}) => {
    const { keys, skipStateUpdate = false, event = 'manual' } = options;

    const returnValue: State = {};

    if (keys?.length === 0) return returnValue;

    let keysToValidate = keys ? new Set(keys) : null;
    if (!keysToValidate) {
      keysToValidate = new Set();
      for (const key in fieldValidationDataMapRef.current)
        keysToValidate.add(key as KeyOf<T>);
      for (const key in validations) keysToValidate.add(key as KeyOf<T>);
    }

    const validationPromises: Array<ReturnType<ReturnType<typeof validateField>>> = [];

    for (const key of keysToValidate) {
      const fieldValidations = getFieldValidations(key, event);
      for (const validation of fieldValidations) {
        validationPromises.push(validateField(key)(validation));
      }
    }

    if (!validationPromises.length) return returnValue;

    const validationResults = await Promise.all(validationPromises);

    for (const [key, result] of validationResults) {
      if (returnValue[key as KeyOf<T>] === undefined) {
        returnValue[key as KeyOf<T>] = result;
      } else {
        const existingResult = readFieldValidationResult(returnValue[key as KeyOf<T>]);
        const newResult = readFieldValidationResult(result);
        const { isValid: existingIsValid, errors: existingErrors } = existingResult;
        const { isValid: newIsValid, errors: newErrors } = newResult;
        returnValue[key as KeyOf<T>] = newIsValid && existingIsValid;
        const allErrors = [...existingErrors, ...newErrors];
        if (allErrors.length) returnValue[key as KeyOf<T>] = allErrors;
      }
    }

    if (!skipStateUpdate) updateValidationResultMap(returnValue);

    return returnValue;
  };

  return {
    dataRef,
    validationResultMap,
    registerFieldValidationData,
    validate,
  };
};

type State = Awaited<ReturnType<ValidationsHandlerReturn['validate']>>;

export default useValidationsHandler;
