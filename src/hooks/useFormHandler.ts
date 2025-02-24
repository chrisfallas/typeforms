import { useImperativeHandle, useMemo, useState } from 'react';
import useOnMountEffect from './useOnMountEffect';
import { readFormValidationResult } from '../utils/validations';
import { KeyOf } from '../types/Global';
import { FormHandlerProps, FormHandlerReturn } from '../types/FormHandler';
import { ValidationsHandlerReturn } from '../types/ValidationsHandler';

const useFormHandler = <T extends Record<string, any> = Record<string, any>>(
  validationsContext: ValidationsHandlerReturn<T>,
  {
    formRef,
    initialValues = {},
    onChange,
    onSubmit,
    onReset,
    debug,
  }: FormHandlerProps<T>,
): FormHandlerReturn<T> => {
  const [data, _setData] = useState<FormHandlerReturn<T>['data']>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dataRef, validationResultMap } = validationsContext;

  dataRef.current = data;

  const isDirty = useMemo(() => {
    const stringifiedInitialValues = JSON.stringify(initialValues);
    const stringifiedData = JSON.stringify(data);
    return stringifiedInitialValues !== stringifiedData;
  }, [initialValues, data]);

  const { isValid, errors } = useMemo(
    () => readFormValidationResult(validationResultMap),
    [validationResultMap],
  );

  const validateOnChange = async (
    newData: typeof data,
    options?: { skipFieldValidations?: Array<KeyOf<T>> },
  ) => {
    const { skipFieldValidations } = options ?? {};
    const keys: Array<KeyOf<T>> = [];
    for (const key in { ...data, ...newData }) {
      if (skipFieldValidations?.includes(key as KeyOf<T>)) continue;
      if (data[key] !== newData[key]) keys.push(key as KeyOf<T>);
    }
    if (keys.length === 0) return;
    dataRef.current = newData;
    return validationsContext.validate({ keys: keys, event: 'onChange' });
  };

  const setData = async (
    newData: typeof data,
    options?: { override?: boolean; skipFieldValidations?: Array<KeyOf<T>> },
  ) => {
    const { override, skipFieldValidations } = options ?? {};
    const allNewData = override ? newData : { ...data, ...newData };
    if (typeof debug === 'string') console.log(`Form (${debug}) data:`, allNewData);
    else if (debug) console.log('Form data:', allNewData);
    _setData(allNewData);
    validateOnChange(allNewData, { skipFieldValidations });
    onChange?.(allNewData);
  };

  const getValue: FormHandlerReturn<T>['getValue'] = (name) =>
    name ? data[name] : undefined;

  const setValues: FormHandlerReturn<T>['setValues'] = async (values) => {
    const newData: typeof data = {};
    let fieldsChangingCount = 0;
    const skipFieldValidations: Array<KeyOf<T>> = [];
    for (const { name, value, skipValidation } of values) {
      if (!name) continue;
      if (['', undefined, null].includes(value)) newData[name] = undefined;
      else newData[name] = value;
      if (newData[name] !== getValue(name)) {
        fieldsChangingCount++;
        if (skipValidation) skipFieldValidations.push(name);
      }
    }
    if (fieldsChangingCount > 0) await setData(newData, { skipFieldValidations });
  };

  const setValue: FormHandlerReturn<T>['setValue'] = async (name, value, options) =>
    setValues([{ name, value, skipValidation: options?.skipValidation }]);

  const validate: FormHandlerReturn<T>['validate'] = async (options) => {
    const { keys, skipStateUpdate } = options ?? {};
    const result = await validationsContext.validate({
      keys,
      skipStateUpdate,
      event: 'manual',
    });
    return readFormValidationResult<T>(result);
  };

  const submit: FormHandlerReturn<T>['submit'] = async (event) => {
    event?.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await validationsContext.validate({ event: 'onSubmit' });
      const { isValid, errors } = readFormValidationResult(result);
      if (isValid) await onSubmit?.({ ok: true, data: data as T });
      else await onSubmit?.({ ok: false, errors });
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset: FormHandlerReturn<T>['reset'] = async () => {
    await setData(initialValues, { override: true });
    onReset?.();
  };

  useOnMountEffect(() => {
    validationsContext.validate({ event: 'onMount' });
  });

  const formHandler: FormHandlerReturn<T> = {
    data,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    getValue,
    setValue,
    setValues,
    validate,
    submit,
    reset,
  };

  useImperativeHandle(formRef, () => formHandler);

  return formHandler;
};

export default useFormHandler;
