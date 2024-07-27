import useFormContext from './useFormContext';
import { UseFormElementReturn } from '../types/UseFormElement';
import { KeyOf } from '../types/Global';

const useFormElement = <T extends Record<string, any> = Record<string, any>>(
  name?: KeyOf<T>,
): UseFormElementReturn<T> => {
  const formContext = useFormContext<T>();

  const value = formContext.getValue(name);

  const setValue: UseFormElementReturn<T>['setValue'] = async (value) => {
    if (name) formContext.setValue(name, value);
  };

  return {
    value,
    setValue,
    onChange: formContext.onChange,
    onBlur: formContext.onBlur,
  };
};

export default useFormElement;
