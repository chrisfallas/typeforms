import { PropsWithChildren, createContext, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useFormHandler from '../hooks/useFormHandler';
import { FormContextValues } from '../types/FormProvider';
import { FormProviderProps } from '../types/FormProvider';
import { RenderProp } from '../types/Global';

export const FormContext = createContext<FormContextValues>(null as any);

/**
 * Internal context provider to pass down to form elements the form state and handlers.
 * This is not being exported to keep the library API simple and clean.
 */
const FormProvider = <T extends Record<string, any> = Record<string, any>>({
  customFormId,
  initialValues,
  validateOnSubmit,
  validateOnChange,
  validateOnBlur,
  schemaValidation,
  onChange,
  onSubmit,
  render,
  children,
}: PropsWithChildren<FormProviderProps<T> & RenderProp<FormContextValues<T>>>) => {
  const formId = useMemo(() => customFormId || uuidv4(), [customFormId]);

  const formHandlerValues = useFormHandler<T>({
    initialValues,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
    schemaValidation,
    onChange,
    onSubmit,
  });

  const formValues: FormContextValues<T> = {
    ...formHandlerValues,
    formId,
  };

  return (
    <FormContext.Provider value={formValues}>
      {render ? render(formValues) : children}
    </FormContext.Provider>
  );
};

export default FormProvider;
