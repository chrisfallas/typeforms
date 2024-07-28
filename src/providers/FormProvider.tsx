import { PropsWithChildren, createContext } from 'react';
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
  formRef,
  initialValues,
  validateOnSubmit,
  validateOnChange,
  validateOnBlur,
  schemaValidation,
  onChange,
  onSubmit,
  debug,
  render,
  children,
}: PropsWithChildren<FormProviderProps<T> & RenderProp<FormContextValues<T>>>) => {
  const formValues: FormContextValues<T> = useFormHandler<T>({
    formRef,
    initialValues,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
    schemaValidation,
    onChange,
    onSubmit,
    debug,
  });

  return (
    <FormContext.Provider value={formValues as FormContextValues}>
      {render ? render(formValues) : children}
    </FormContext.Provider>
  );
};

export default FormProvider;
