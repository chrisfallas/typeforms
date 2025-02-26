import { useRef, useState } from 'react';
import { readFieldValidationResult } from '../utils/validations';
import { KeyOf } from '../types/Global';
import {
  FieldValidationCallback,
  FieldValidationEvent,
  ValidationsHandlerProps,
  ValidationsHandlerReturn,
  FieldValidationData,
} from '../types/Validations';

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

  const [validationResultMap, _setValidationResultMap] = useState<
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

  const setValidationResultMap = async (
    newValidationResultMap: Partial<typeof validationResultMap>,
    options?: { override?: boolean },
  ) => {
    if (options?.override) return _setValidationResultMap(newValidationResultMap);
    _setValidationResultMap((prev) => ({ ...prev, ...newValidationResultMap }));
  };

  const getAllKeysWithValidation = () => {
    const keys = new Set<KeyOf<T>>();
    for (const key in fieldValidationDataMapRef.current) keys.add(key as KeyOf<T>);
    for (const key in validations) keys.add(key as KeyOf<T>);
    return Array.from(keys);
  };

  const getFieldValidationFlags = (key: KeyOf<T>) => {
    const {
      validateOnMount = globalValidateOnMount,
      validateOnSubmit = globalValidateOnSubmit,
      validateOnChange = globalValidateOnChange,
      validateOnBlur = globalValidateOnBlur,
    } = fieldValidationDataMapRef.current[key] ?? {};
    return { validateOnMount, validateOnSubmit, validateOnChange, validateOnBlur };
  };

  const getFieldValidations = (key: KeyOf<T>, event: FieldValidationEvent) => {
    const { validateOnMount, validateOnSubmit, validateOnChange, validateOnBlur } =
      getFieldValidationFlags(key);
    if (event === 'onMount' && !validateOnMount) return [];
    if (event === 'onReset' && !validateOnMount) return [];
    if (event === 'onSubmit' && !validateOnSubmit) return [];
    if (event === 'onChange' && !validateOnChange) return [];
    if (event === 'onBlur' && !validateOnBlur) return [];
    const fieldValidationCallbacks: Array<FieldValidationCallback> = [];
    const fieldOwnValidation = fieldValidationDataMapRef.current[key]?.validation;
    if (fieldOwnValidation) fieldValidationCallbacks.push(fieldOwnValidation);
    const globalFieldValidationMap =
      typeof validations === 'function' ? validations(dataRef.current) : validations;
    const globalFieldValidation = globalFieldValidationMap[key];
    if (globalFieldValidation) fieldValidationCallbacks.push(globalFieldValidation);
    return fieldValidationCallbacks;
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

    const keysToValidate = keys ?? getAllKeysWithValidation();

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

    if (!skipStateUpdate) {
      setValidationResultMap(returnValue, { override: event === 'onReset' });
    }

    return returnValue;
  };

  const cleanErrors: ValidationsHandlerReturn<T>['cleanErrors'] = (keys) => {
    if (!keys?.length) return _setValidationResultMap({});
    const keysToClean = getAllKeysWithValidation();
    if (!keysToClean?.length) return;
    _setValidationResultMap((prev) => {
      const newState = { ...prev };
      for (const key of keysToClean) delete newState[key];
      return newState;
    });
  };

  return {
    dataRef,
    validationResultMap,
    registerFieldValidationData,
    validate,
    cleanErrors,
  };
};

type State = Awaited<ReturnType<ValidationsHandlerReturn['validate']>>;

export default useValidationsHandler;
