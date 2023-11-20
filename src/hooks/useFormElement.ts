import useFormContext from './useFormContext';
import { UseFormElementReturn } from '../types/UseFormElement';

const useFormElement = <T extends Record<string, any> = Record<string, any>>(
  name: Extract<keyof T, string>,
): UseFormElementReturn<T> => {
  const formContext = useFormContext<T>();

  const id = `${formContext.formId}-${name}`;
  const value = formContext.getValue(name);

  const setValue: UseFormElementReturn<T>['setValue'] = async (value) => {
    formContext.setValue(name, value);
  };

  return { id, value, setValue, onChange: formContext.onChange };
};

export default useFormElement;
