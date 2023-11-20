import { useState } from 'react';
import { UseFormHandlerProps, UseFormHandlerReturn } from '../types/UseFormHandler';

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

  const getValue: UseFormHandlerReturn<T>['getValue'] = (name) => data[name];

  const setValues: UseFormHandlerReturn<T>['setValues'] = async (values) => {
    setData((prev) => {
      const newData = { ...prev };
      values.forEach(({ name, value }) => {
        newData[name] = value; // TODO: support dot notation
      });
      onChangeCallback?.(newData);
      return newData;
    });
  };

  const setValue: UseFormHandlerReturn<T>['setValue'] = async (name, value) => {
    setValues([{ name, value }]);
  };

  const onChange: UseFormHandlerReturn<T>['onChange'] = async (event) => {
    const name = event.target.name as Extract<keyof T, string>;
    let value: any = event.target.value;
    if (['', undefined, null].includes(value)) value = undefined;
    else if (event.target.type === 'number') value = Number(value);
    setValue(name, value);
  };

  const onSubmit: UseFormHandlerReturn<T>['onSubmit'] = async (event) => {
    event.preventDefault();
    // TODO: validate form before
    onSubmitCallback?.({ ok: true, data: data as T });
  };

  const formValues: UseFormHandlerReturn<T> = {
    data,
    getValue,
    setValue,
    setValues,
    onChange,
    onSubmit,
  };

  return formValues;
};

export default useFormHandler;
