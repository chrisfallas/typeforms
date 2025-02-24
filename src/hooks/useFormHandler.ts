import { useImperativeHandle, useMemo, useState } from 'react';
import { useValidationsContext } from '../providers/ValidationsProvider';
import { useFormErrors } from './useValidationErrors';
import { FormHandlerProps, FormHandlerReturn } from '../types/FormHandler';
import { KeyOf } from '../types/Global';
import useOnMountEffect from './useOnMountEffect';
import { readFormValidationResult } from '../utils/validations';

const useFormHandler = <T extends Record<string, any> = Record<string, any>>({
  formRef,
  initialValues = {},
  onChange: onChangeCallback,
  onSubmit: onSubmitCallback,
  onReset: onResetCallback,
  debug,
}: FormHandlerProps<T>): FormHandlerReturn<T> => {
  const [data, _setData] = useState<FormHandlerReturn<T>['data']>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dataRef, validate } = useValidationsContext<T>();

  dataRef.current = data;

  const isDirty = useMemo(() => {
    const stringifiedInitialValues = JSON.stringify(initialValues);
    const stringifiedData = JSON.stringify(data);
    return stringifiedInitialValues !== stringifiedData;
  }, [initialValues, data]);

  const { isValid, errors } = useFormErrors<T>();

  const validateOnChange = async (newData: typeof data) => {
    const keys: Array<KeyOf<T>> = [];
    for (const key in { ...data, ...newData }) {
      if (data[key] !== newData[key]) keys.push(key as KeyOf<T>);
    }
    if (keys.length === 0) return;
    dataRef.current = newData;
    return validate({ keys: keys, event: 'onChange' });
  };

  const setData = (newData: typeof data, options?: { override?: boolean }) => {
    const allNewData = options?.override ? newData : { ...data, ...newData };
    if (typeof debug === 'string') console.log(`Form (${debug}) data:`, allNewData);
    else if (debug) console.log('Form data:', allNewData);
    new Promise(() => onChangeCallback?.(allNewData));
    validateOnChange(allNewData);
    _setData(allNewData);
  };

  const getValue: FormHandlerReturn<T>['getValue'] = (name) =>
    name ? data[name] : undefined;

  const setValues: FormHandlerReturn<T>['setValues'] = async (values) => {
    const newData: typeof data = {};
    let fieldsChangingCount = 0;
    for (const { name, value } of values) {
      if (!name) continue;
      if (['', undefined, null].includes(value)) newData[name] = undefined;
      else newData[name] = value;
      if (newData[name] !== getValue(name)) fieldsChangingCount++;
    }
    if (fieldsChangingCount > 0) setData(newData);
  };

  const setValue: FormHandlerReturn<T>['setValue'] = async (name, value) =>
    setValues([{ name, value }]);

  const submit: FormHandlerReturn<T>['submit'] = async (event) => {
    event?.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await validate({ event: 'onSubmit' });
      const { isValid, errors } = readFormValidationResult(result);
      if (isValid) await onSubmitCallback?.({ ok: true, data: data as T });
      else await onSubmitCallback?.({ ok: false, errors });
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset: FormHandlerReturn<T>['reset'] = async () => {
    setData(initialValues, { override: true });
    onResetCallback?.();
  };

  useOnMountEffect(() => {
    validate({ event: 'onMount' });
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
    submit,
    reset,
  };

  useImperativeHandle(formRef, () => formHandler);

  return formHandler;
};

export default useFormHandler;
