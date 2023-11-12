import { createContext, useState, PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useFormHandler, {
  UseFormHandlerProps,
  UseFormHandlerReturn,
} from '../hooks/useFormHandler';

export interface FormProviderProps<T extends Record<string, any> = Record<string, any>>
  extends UseFormHandlerProps<T> {}

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

export interface FormContextValues<T extends Record<string, any> = Record<string, any>>
  extends UseFormHandlerReturn<T> {
  formId: string;
}

export const FormContext = createContext<FormContextValues>({
  formId: '',
  state: {},
  getValue: () => ({}),
});

export default FormProvider;
