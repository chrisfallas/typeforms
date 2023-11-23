import { useMemo, useState } from 'react';
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
    schemaValidationObject: FormSchemaValidationObject<T>,
    schemaValidationStrategy?: SchemaValidationStrategy<T>,
  ): Promise<typeof errors> => {
    const { include, exclude } = schemaValidationStrategy ?? {};
    const errorsFound: typeof errors = {};
    for (const field in schemaValidationObject) {
      let needsValidation = true;
      if (include && !include.includes(field as KeyOf<T>)) needsValidation = false;
      if (exclude && exclude.includes(field as KeyOf<T>)) needsValidation = false;
      if (!needsValidation) continue;
      const validationFunction = schemaValidationObject[field];
      const value = getValue(field as KeyOf<T>);
      const result = await validationFunction?.(value);
      errorsFound[field as KeyOf<T>] = result;
    }
    return errorsFound;
  };

  const validate: UseFormHandlerReturn<T>['validate'] = async (options) => {
    const { updateFormState = true, include, exclude } = options ?? {};
    if (!schemaValidation) return {};
    let errorsFound: typeof errors;
    if (typeof schemaValidation === 'function') {
      errorsFound = await validateWithFunction(schemaValidation, { include, exclude });
    } else {
      errorsFound = await validateWithObject(schemaValidation, { include, exclude });
    }
    if (updateFormState) setErrors((prev) => ({ ...prev, ...errorsFound }));
    const filteredErrors: typeof errors = {};
    for (const field in errorsFound) {
      const error = errorsFound[field];
      if (error?.length) filteredErrors[field as KeyOf<T>] = error;
    }
    return filteredErrors;
  };

  const checkValidationStrategy = (strategy: boolean | SchemaValidationStrategy<T>) => {
    let needsValidation = false;
    let include: SchemaValidationStrategy<T>['include'] | undefined;
    let exclude: SchemaValidationStrategy<T>['exclude'] | undefined;
    if (typeof strategy === 'boolean') needsValidation = strategy;
    else if (Array.isArray(strategy.include)) {
      needsValidation = true;
      include = strategy.include;
    } else if (Array.isArray(strategy.exclude)) {
      needsValidation = true;
      exclude = strategy.exclude;
    }
    return { needsValidation, include, exclude };
  };

  const setValues: UseFormHandlerReturn<T>['setValues'] = async (values) => {
    setData((prev) => {
      const newData = { ...prev };
      let atLeastOneChanged = false;
      for (const { name, value } of values) {
        if (!name || value === getValue(name)) continue;
        atLeastOneChanged = true;
        if (['', undefined, null].includes(value)) newData[name] = undefined;
        else newData[name] = value;
      }
      if (atLeastOneChanged) onChangeCallback?.(newData);
      return atLeastOneChanged ? newData : prev;
    });
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
    const value = getValue(name);
    console.log('onBlur', name, value);
    // TODO: validate field if needed
  };

  const onSubmit: UseFormHandlerReturn<T>['onSubmit'] = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const { needsValidation, include, exclude } =
        checkValidationStrategy(validateOnSubmit);
      if (!needsValidation) {
        await onSubmitCallback?.({ ok: true, data: data as T });
      } else {
        const errorsFound = await validate({ updateFormState: true, include, exclude });
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
    onChangeCallback?.(initialValues);
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
