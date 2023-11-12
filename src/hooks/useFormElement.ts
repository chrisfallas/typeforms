import useFormContext from './useFormContext';
import { UseFormHandlerReturn } from './useFormHandler';

export interface UseFormElementReturn<
  T extends Record<string, any> = Record<string, any>,
> {
  value: ReturnType<UseFormHandlerReturn<T>['getValue']>;
}

const useFormElement = <T extends Record<string, any> = Record<string, any>>(
  name: keyof T,
): UseFormElementReturn<T> => {
  const { getValue } = useFormContext<T>();

  const value = getValue(name);

  return { value };
};

export default useFormElement;
