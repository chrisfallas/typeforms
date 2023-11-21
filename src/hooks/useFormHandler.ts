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
      values.forEach(({ name, value }) => {
        if (['', undefined, null].includes(value)) newData[name] = undefined;
        else if (name && value !== getValue(name)) newData[name] = value;
      });
      onChangeCallback?.(newData);
      return newData;
    });
  };

  const setValue: UseFormHandlerReturn<T>['setValue'] = async (name, value) => {
    if (name && value !== getValue(name)) setValues([{ name, value }]);
  };

  const onChange: UseFormHandlerReturn<T>['onChange'] = async (event) => {
    const name = event.target.name as KeyOf<T>;
    let value: any = event.target.value;
    if (value && event.target.type === 'number') value = Number(value);
    setValue(name, value);
  };

  const onSubmit: UseFormHandlerReturn<T>['onSubmit'] = async (event) => {
    event.preventDefault();
    // TODO: validate form before
    onSubmitCallback?.({ ok: true, data: data as T });
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
    onSubmit,
  };

  return formValues;
};

export default useFormHandler;
