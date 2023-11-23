import { useEffect, useMemo, useState } from 'react';
import {
  SchemaValidationStrategy,
  UseFormHandlerProps,
  UseFormHandlerReturn,
} from '../types/UseFormHandler';
import { FormSchemaValidationFunction, FormSchemaValidationObject } from '../types/Form';
import { KeyOf } from '../types/Global';

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
}: UseFormHandlerProps<T>): UseFormHandlerReturn<T> => {
  const [data, setData] = useState<UseFormHandlerReturn<T>['data']>(initialValues);
  const [errors, setErrors] = useState<UseFormHandlerReturn<T>['errors']>({});
  const [state, setState] = useState({
    isSubmitting: false,
  });

  const { isSubmitting } = state;

  const setIsSubmitting = async (isSubmitting: typeof state.isSubmitting) =>
    setState((prev) => ({ ...prev, isSubmitting }));

  const getValue: UseFormHandlerReturn<T>['getValue'] = (name) =>
    name ? data[name] : undefined;

  const getErrors: UseFormHandlerReturn<T>['getErrors'] = (name) =>
    name ? errors[name] : undefined;

  const validateWithFunction = async (
    data: Partial<T>,
    schemaValidationFunction: FormSchemaValidationFunction<T>,
    schemaValidationStrategy: SchemaValidationStrategy<T>,
  ): Promise<typeof errors> => {
    const { include, exclude } = schemaValidationStrategy;
    const errorsFound: typeof errors = {};
    const result = await schemaValidationFunction(data);
    for (const field in result) {
      let needsValidation = true;
      if (include && !include.includes(field as KeyOf<T>)) needsValidation = false;
      if (exclude && exclude.includes(field as KeyOf<T>)) needsValidation = false;
      if (!needsValidation) continue;
      errorsFound[field as KeyOf<T>] = result[field];
    }
    return errorsFound;
  };

  const validateWithObject = async (
    data: Partial<T>,
    schemaValidationObject: FormSchemaValidationObject<T>,
    schemaValidationStrategy: SchemaValidationStrategy<T>,
  ): Promise<typeof errors> => {
    const { include, exclude } = schemaValidationStrategy;
    const errorsFound: typeof errors = {};
    for (const field in schemaValidationObject) {
      let needsValidation = true;
      if (include && !include.includes(field as KeyOf<T>)) needsValidation = false;
      if (exclude && exclude.includes(field as KeyOf<T>)) needsValidation = false;
      if (!needsValidation) continue;
      const validationFunction = schemaValidationObject[field];
      const value = data[field] as T[KeyOf<T>] | undefined;
      const result = await validationFunction?.(value);
      errorsFound[field as KeyOf<T>] = result;
    }
    return errorsFound;
  };

  const validate: UseFormHandlerReturn<T>['validate'] = async (options = {}) => {
    const { data, updateFormState = true } = options;
    if (!schemaValidation || !data) return {};
    let errorsFound: typeof errors;
    if (typeof schemaValidation === 'function') {
      errorsFound = await validateWithFunction(data, schemaValidation, options);
    } else {
      errorsFound = await validateWithObject(data, schemaValidation, options);
    }
    if (updateFormState) setErrors((prev) => ({ ...prev, ...errorsFound }));
    const errorsWithoutUndefines: typeof errors = {};
    for (const field in errorsFound) {
      const error = errorsFound[field];
      if (error?.length) errorsWithoutUndefines[field as KeyOf<T>] = error;
    }
    return errorsWithoutUndefines;
  };

  const checkValidationStrategy = (strategy: boolean | SchemaValidationStrategy<T>) => {
    let isValidationRequired = false;
    let include: SchemaValidationStrategy<T>['include'] | undefined;
    let exclude: SchemaValidationStrategy<T>['exclude'] | undefined;
    if (typeof strategy === 'boolean') isValidationRequired = strategy;
    else if (Array.isArray(strategy.include)) {
      isValidationRequired = true;
      include = strategy.include;
    } else if (Array.isArray(strategy.exclude)) {
      isValidationRequired = true;
      exclude = strategy.exclude;
    }
    return { isValidationRequired, include, exclude };
  };

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
    setData(initialValues);
    setErrors({});
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

  useEffect(() => {
    console.log('errors', errors);
  }, [errors]);

  const formValues: UseFormHandlerReturn<T> = {
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

  return formValues;
};

export default useFormHandler;
