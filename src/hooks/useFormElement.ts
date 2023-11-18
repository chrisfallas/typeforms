import useFormContext from './useFormContext';
import { UseFormElementReturn } from '../types/UseFormElement';

const useFormElement = <T extends Record<string, any> = Record<string, any>>(
  name: Extract<keyof T, string>,
): UseFormElementReturn<T> => {
  const { formId, getValue } = useFormContext<T>();

  const id = `${formId}-${name}`;
  const value = getValue(name);

  return { id, value };
};

export default useFormElement;
