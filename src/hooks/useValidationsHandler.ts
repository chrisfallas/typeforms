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

  const [fieldsBeingValidated, setFieldsBeingValidated] = useState<
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

  const analyzeFieldValidationCallback = async <K extends KeyOf<T>, V = T[K]>(
    key: K,
    callback: FieldValidationCallback<V>,
    value: V,
  ) => {
    const result = callback(value);
    if (result instanceof Promise) return [key, 'async', result] as const;
    return [key, 'sync', result] as const;
  };

  const validate: ValidationsHandlerReturn<T>['validate'] = async (options = {}) => {
    const { keys, skipStateUpdate = false, event = 'manual' } = options;

    const returnValue: State = {};

    if (keys?.length === 0) return returnValue;

    const keysToValidate = keys ?? getAllKeysWithValidation();

    const newFieldsBeingValidated: typeof fieldsBeingValidated = {};
    const analyzePromises: Array<ReturnType<typeof analyzeFieldValidationCallback>> = [];

    for (const key of keysToValidate) {
      const fieldValidations = getFieldValidations(key, event);
      if (!fieldValidations.length) continue;
      for (const validation of fieldValidations) {
        newFieldsBeingValidated[key] = true;
        const value = dataRef.current[key];
        analyzePromises.push(analyzeFieldValidationCallback(key, validation, value));
      }
    }

    setFieldsBeingValidated((prev) => ({ ...prev, ...newFieldsBeingValidated }));

    const analyzeResults = await Promise.all(analyzePromises);

    const validationPromises: Array<Promise<[KeyOf<T>, ValidationResult]>> = [];
    const validationResults: Array<[KeyOf<T>, ValidationResult]> = [];

    for (const [key, type, callbackResult] of analyzeResults) {
      if (type === 'async') {
        validationPromises.push(callbackResult.then((result) => [key, result]));
      } else {
        validationResults.push([key, callbackResult]);
      }
    }

    if (event === 'onSubmit' || event === 'manual') {
      validationResults.push(...(await Promise.all(validationPromises)));
    } else {
      for (const promise of validationPromises) {
        promise.then(([key, result]) => {
          const { isValid, errors } = readFieldValidationResult(result);
          const newState: State = { [key]: errors?.length ? errors : isValid };
          setValidationResultMap(newState);
          setFieldsBeingValidated((prev) => ({ ...prev, [key]: false }));
        });
      }
    }

    if (!validationResults.length) return returnValue;

    const successfullyValidatedFields: typeof fieldsBeingValidated = {};

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
      successfullyValidatedFields[key] = false;
    }

    if (!skipStateUpdate) {
      setValidationResultMap(returnValue, { override: event === 'onReset' });
    }

    setFieldsBeingValidated((prev) => ({ ...prev, ...successfullyValidatedFields }));

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
    fieldsBeingValidated,
    registerFieldValidationData,
    validate,
    cleanErrors,
  };
};

type State = Awaited<ReturnType<ValidationsHandlerReturn['validate']>>;

export default useValidationsHandler;
