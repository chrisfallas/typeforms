import { useState, PropsWithChildren, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useFormHandler from '../hooks/useFormHandler';
import { FormContextValues } from '../types/FormProvider';
import { FormProviderProps } from '../types/FormProvider';

export const FormContext = createContext<FormContextValues>(null as any);

/**
 * Internal context provider to pass down to form elements the form state and handlers.
 * This is not being exported to keep the library API simple and clean.
 */
const FormProvider = <T extends Record<string, any> = Record<string, any>>({
  initialValues,
  children,
}: PropsWithChildren<FormProviderProps<T>>) => {
  const [formId] = useState<string>(uuidv4());

  const formHandlerValues = useFormHandler<T>({
    initialValues,
  });

  const formValues: FormContextValues<T> = {
    ...formHandlerValues,
    formId,
  };

  return <FormContext.Provider value={formValues}>{children}</FormContext.Provider>;
};

export default FormProvider;
