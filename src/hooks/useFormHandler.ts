import { useState } from 'react';
import { UseFormHandlerProps, UseFormHandlerReturn } from '../types/UseFormHandler';

/**
 * Internal hook to handle form state.
 * This is not being exported to keep the library API simple and clean.
 */
const useFormHandler = <T extends Record<string, any> = Record<string, any>>({
  initialValues,
}: UseFormHandlerProps<T>): UseFormHandlerReturn<T> => {
  const [state, setState] = useState<UseFormHandlerReturn<T>['state']>(
    initialValues ?? ({} as Partial<T>),
  );

  const getValue: UseFormHandlerReturn<T>['getValue'] = (name) => state[name];

  const formValues: UseFormHandlerReturn<T> = {
    state,
    getValue,
  };

  return formValues;
};

export default useFormHandler;
