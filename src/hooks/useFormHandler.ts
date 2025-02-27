import { useImperativeHandle, useMemo, useState } from 'react';
import useOnMountEffect from './useOnMountEffect';
import { readFormValidationResult } from '../utils/validations';
import { KeyOf } from '../types/Global';
import { FormHandlerProps, FormHandlerReturn } from '../types/FormHandler';
import { FieldValidationEvent, ValidationsHandlerReturn } from '../types/Validations';

const useFormHandler = <T extends Record<string, any> = Record<string, any>>(
  validationsContext: ValidationsHandlerReturn<T>,
  { formRef, initialValues = {}, onChange, onSubmit, onReset }: FormHandlerProps<T>,
): FormHandlerReturn<T> => {
  const [data, _setData] = useState<FormHandlerReturn<T>['data']>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dataRef, validationResultMap, fieldsBeingValidated, cleanErrors } =
    validationsContext;

  dataRef.current = data;

  const isDirty = useMemo(() => {
    const stringifiedInitialValues = JSON.stringify(initialValues);
    const stringifiedData = JSON.stringify(data);
    return stringifiedInitialValues !== stringifiedData;
  }, [initialValues, data]);

  const isValidating = useMemo(() => {
    for (const key in fieldsBeingValidated) {
      if (fieldsBeingValidated[key as KeyOf<T>]) return true;
    }
    return false;
  }, [fieldsBeingValidated]);

  const { isValid, errors } = useMemo(
    () => readFormValidationResult(validationResultMap),
    [validationResultMap],
  );

  const setData = async (
    newData: typeof data,
    options?: { isResetting?: boolean; skipValidations?: boolean | Array<KeyOf<T>> },
  ) => {
    const { isResetting, skipValidations } = options ?? {};
    if (!isResetting) _setData((prev) => ({ ...prev, ...newData }));
    else _setData(newData);
    await validateNewData(newData, { isResetting, skipValidations });
    onChange?.(isResetting ? newData : { ...data, ...newData });
  };

  const validateNewData = async (
    newData: typeof data,
    options?: { isResetting?: boolean; skipValidations?: boolean | Array<KeyOf<T>> },
  ) => {
    const { isResetting, skipValidations } = options ?? {};
    let keys: Array<KeyOf<T>> | undefined = undefined;
    if (!isResetting) {
      keys = [];
      for (const newDataKey in newData) {
        const key = newDataKey as KeyOf<T>;
        if (typeof skipValidations === 'boolean' && skipValidations) continue;
        if (Array.isArray(skipValidations) && skipValidations.includes(key)) continue;
        keys.push(key);
      }
    }
    dataRef.current = isResetting ? newData : { ...dataRef.current, ...newData };
    const event: FieldValidationEvent = isResetting ? 'onReset' : 'onChange';
    return validationsContext.validate({ keys, event });
  };

  const getValue: FormHandlerReturn<T>['getValue'] = (name) =>
    name ? data[name] : undefined;

  const setValues: FormHandlerReturn<T>['setValues'] = async (values) => {
    const newData: typeof data = {};
    let fieldsChangingCount = 0;
    const skipValidations: Array<KeyOf<T>> = [];
    for (const { name, value, skipValidation } of values) {
      if (!name) continue;
      if (['', undefined, null].includes(value)) newData[name] = undefined;
      else newData[name] = value;
      if (newData[name] !== getValue(name)) {
        fieldsChangingCount++;
        if (skipValidation) skipValidations.push(name);
      }
    }
    if (fieldsChangingCount > 0) await setData(newData, { skipValidations });
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
    new Promise(async () => {
      try {
        const result = await validationsContext.validate({ event: 'onSubmit' });
        const { isValid, errors } = readFormValidationResult(result);
        if (isValid) await onSubmit?.({ ok: true, data: data as T });
        else await onSubmit?.({ ok: false, errors });
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  const reset: FormHandlerReturn<T>['reset'] = async () => {
    await setData(initialValues, { isResetting: true });
    onReset?.();
  };

  useOnMountEffect(() => {
    validationsContext.validate({ event: 'onMount' });
  });

  const formHandler: FormHandlerReturn<T> = {
    data,
    isDirty,
    isValid,
    isValidating,
    errors,
    isSubmitting,
    getValue,
    setValue,
    setValues,
    validate,
    cleanErrors,
    submit,
    reset,
  };

  useImperativeHandle(formRef, () => formHandler);

  return formHandler;
};

export default useFormHandler;
