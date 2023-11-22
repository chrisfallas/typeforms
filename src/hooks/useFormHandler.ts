import { useMemo, useState } from 'react';
import { UseFormHandlerProps, UseFormHandlerReturn } from '../types/UseFormHandler';
import { KeyOf } from '../types/Global';

/**
 * Internal hook to handle form state.
 * This is not being exported to keep the library API simple and clean.
 */
const useFormHandler = <T extends Record<string, any> = Record<string, any>>({
  initialValues = {},
  schemaValidation,
  onChange: onChangeCallback,
  onSubmit: onSubmitCallback,
}: UseFormHandlerProps<T>): UseFormHandlerReturn<T> => {
  const [data, setData] = useState<UseFormHandlerReturn<T>['data']>(initialValues);

  const getValue: UseFormHandlerReturn<T>['getValue'] = (name) =>
    name ? data[name] : undefined;

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
    // TODO: validate form before
    onSubmitCallback?.({ ok: true, data: data as T });
  };

  const reset: UseFormHandlerReturn<T>['reset'] = async () => {
    setData(initialValues);
    // TODO: reset validation errors
    onChangeCallback?.(initialValues);
  };

  const isDirty = useMemo(() => {
    const stringifiedInitialValues = JSON.stringify(initialValues);
    const stringifiedData = JSON.stringify(data);
    return stringifiedInitialValues !== stringifiedData;
  }, [initialValues, data]);

  const formValues: UseFormHandlerReturn<T> = {
    data,
    isDirty,
    getValue,
    setValue,
    setValues,
    onChange,
    onBlur,
    onSubmit,
    reset,
  };

  return formValues;
};

export default useFormHandler;
