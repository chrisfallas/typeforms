import { useRef, useState } from 'react';
import { readFieldValidationResult } from '../utils/validations';
import { KeyOf } from '../types/Global';
import {
  FieldValidationCallback,
  FieldValidationEvent,
  ValidationsHandlerProps,
  ValidationsHandlerReturn,
  FieldValidationData,
  ValidationResult,
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

  const [fieldsBeingValidatedAsync, setFieldsBeingValidatedAsync] = useState<
    Partial<Record<KeyOf<T>, boolean>>
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

  const validate: ValidationsHandlerReturn<T>['validate'] = async (options = {}) => {
    const { keys, skipStateUpdate = false, event = 'manual' } = options;

    const returnValue: State = {};

    if (keys?.length === 0) return returnValue;

    const keysToValidate = keys ?? getAllKeysWithValidation();

    const validationPromises: Array<Promise<[KeyOf<T>, ValidationResult]>> = [];
    const validationResults: Array<[KeyOf<T>, ValidationResult]> = [];
    const newFieldsBeingValidatedAsync: typeof fieldsBeingValidatedAsync = {};

    for (const key of keysToValidate) {
      const fieldValidations = getFieldValidations(key, event);
      if (!fieldValidations.length) continue;
      for (const validation of fieldValidations) {
        const result = validation(dataRef.current[key]);
        if (result instanceof Promise) {
          newFieldsBeingValidatedAsync[key as KeyOf<T>] = true;
          validationPromises.push(result.then((res) => [key, res]));
        } else {
          validationResults.push([key, result]);
        }
      }
    }

    if (event === 'onSubmit' || event === 'manual') {
      validationResults.push(...(await Promise.all(validationPromises)));
    } else {
      setFieldsBeingValidatedAsync((prev) => ({
        ...prev,
        ...newFieldsBeingValidatedAsync,
      }));
      for (const promise of validationPromises) {
        promise.then(([key, result]) => {
          const { isValid, errors } = readFieldValidationResult(result);
          const newState: State = { [key]: errors?.length ? errors : isValid };
          setValidationResultMap(newState);
          setFieldsBeingValidatedAsync((prev) => ({ ...prev, [key]: false }));
        });
      }
    }

    if (!validationResults.length) return returnValue;

    for (const [validationResultsKey, result] of validationResults) {
      const key = validationResultsKey as KeyOf<T>;
      if (returnValue[key] === undefined) {
        returnValue[key] = result;
      } else {
        const existingResult = readFieldValidationResult(returnValue[key]);
        const newResult = readFieldValidationResult(result);
        const { isValid: existingIsValid, errors: existingErrors } = existingResult;
        const { isValid: newIsValid, errors: newErrors } = newResult;
        returnValue[key] = newIsValid && existingIsValid;
        const allErrors = [...existingErrors, ...newErrors];
        if (allErrors.length) returnValue[key] = allErrors;
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
    fieldsBeingValidatedAsync,
    registerFieldValidationData,
    validate,
    cleanErrors,
  };
};

type State = Awaited<ReturnType<ValidationsHandlerReturn['validate']>>;

export default useValidationsHandler;
