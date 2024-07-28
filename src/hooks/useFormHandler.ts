import { useMemo, useState } from 'react';
import { UseFormHandlerProps, UseFormHandlerReturn } from '../types/UseFormHandler';
import { KeyOf } from '../types/Global';
import useSchemaValidation from './useSchemaValidation';

/**
 * Internal hook to handle form state.
 * This is not being exported to keep the library API simple and clean.
 */
const useFormHandler = <T extends Record<string, any> = Record<string, any>>({
  initialValues = {},
  validateOnSubmit = true,
  validateOnChange = false,
  validateOnBlur = false,
  schemaValidation,
  onChange: onChangeCallback,
  onSubmit: onSubmitCallback,
  debug,
}: UseFormHandlerProps<T>): UseFormHandlerReturn<T> => {
  const [data, setData] = useState<UseFormHandlerReturn<T>['data']>(initialValues);
  const [state, setState] = useState({
    isSubmitting: false,
  });

  const { isSubmitting } = state;

  const { errors, getErrors, validate, checkValidationStrategy, resetErrors } =
    useSchemaValidation<T>({ schemaValidation });

  const setIsSubmitting = async (isSubmitting: typeof state.isSubmitting) =>
    setState((prev) => {
      const newState = { ...prev, isSubmitting };
      if (typeof debug === 'string') console.log(`Form (${debug}) state:`, newState);
      else if (debug) console.log('Form state:', newState);
      return newState;
    });

  const getValue: UseFormHandlerReturn<T>['getValue'] = (name) =>
    name ? data[name] : undefined;

  const setValues: UseFormHandlerReturn<T>['setValues'] = async (values) => {
    const { isValidationRequired, include, exclude } =
      checkValidationStrategy(validateOnChange);
    const newData: typeof data = {};
    let fieldsChangingCount = 0;
    const fieldsThatNeedValidation: Array<KeyOf<T>> = [];
    for (const { name, value } of values) {
      if (!name) continue;
      if (['', undefined, null].includes(value)) newData[name] = undefined;
      else newData[name] = value;
      if (newData[name] !== getValue(name)) fieldsChangingCount++;
      let needsValidation = isValidationRequired;
      if (include && !include.includes(name)) needsValidation = false;
      if (exclude && exclude.includes(name)) needsValidation = false;
      if (!needsValidation) continue;
      fieldsThatNeedValidation.push(name);
    }
    if (fieldsThatNeedValidation.length) {
      validate({ data: newData, include: fieldsThatNeedValidation });
    }
    if (fieldsChangingCount > 0) {
      setData((prev) => {
        const allNewData = { ...prev, ...newData };
        if (typeof debug === 'string') console.log(`Form (${debug}) data:`, allNewData);
        else if (debug) console.log('Form data:', allNewData);
        new Promise(() => onChangeCallback?.(allNewData));
        return allNewData;
      });
    }
  };

  const setValue: UseFormHandlerReturn<T>['setValue'] = async (name, value) => {
    if (!name || value === getValue(name)) return;
    setValues([{ name, value }]);
  };

  const onChange: UseFormHandlerReturn<T>['onChange'] = async (event) => {
    const name = event.target.name as KeyOf<T> | undefined;
    if (!name) return;
    let value: any = event.target.value;
    if (value && event.target.type === 'number') value = Number(value);
    setValue(name, value);
  };

  const onBlur: UseFormHandlerReturn<T>['onBlur'] = async (event) => {
    const name = event.target.name as KeyOf<T> | undefined;
    if (!name) return;
    const { isValidationRequired, include, exclude } =
      checkValidationStrategy(validateOnBlur);
    let needsValidation = isValidationRequired;
    if (include && !include.includes(name)) needsValidation = false;
    if (exclude && exclude.includes(name)) needsValidation = false;
    if (!needsValidation) return;
    validate({ data, include: [name] });
  };

  const onSubmit: UseFormHandlerReturn<T>['onSubmit'] = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const { isValidationRequired, include, exclude } =
        checkValidationStrategy(validateOnSubmit);
      if (!isValidationRequired) {
        await onSubmitCallback?.({ ok: true, data: data as T });
      } else {
        const errorsFound = await validate({ data, include, exclude });
        const hasErrors = !!Object.keys(errorsFound).length;
        if (!hasErrors) await onSubmitCallback?.({ ok: true, data: data as T });
        else await onSubmitCallback?.({ ok: false, errors: errorsFound });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset: UseFormHandlerReturn<T>['reset'] = async () => {
    setData(() => {
      if (typeof debug === 'string') console.log(`Form (${debug}) data:`, initialValues);
      else if (debug) console.log('Form data:', initialValues);
      return initialValues;
    });
    resetErrors();
    new Promise(() => onChangeCallback?.(initialValues));
  };

  const isDirty = useMemo(() => {
    const stringifiedInitialValues = JSON.stringify(initialValues);
    const stringifiedData = JSON.stringify(data);
    return stringifiedInitialValues !== stringifiedData;
  }, [initialValues, data]);

  const isValid = useMemo(() => {
    const hasErrors = !!Object.keys(errors).length;
    return !hasErrors;
  }, [errors]);

  return {
    data,
    isValid,
    isDirty,
    isSubmitting,
    errors,
    getValue,
    setValue,
    setValues,
    getErrors,
    onChange,
    onBlur,
    onSubmit,
    validate,
    reset,
  };
};

export default useFormHandler;
