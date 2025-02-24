import { createContext, useContext, PropsWithChildren } from 'react';
import useFormHandler from '../hooks/useFormHandler';
import { FormContextValues } from '../types/FormProvider';
import { FormProviderProps } from '../types/FormProvider';

export const FormContext = createContext<FormContextValues>({} as FormContextValues);

const FormProvider = <T extends Record<string, any> = Record<string, any>>({
  render,
  children,
  ...rest
}: PropsWithChildren<FormProviderProps<T>>) => {
  const formValues: FormContextValues<T> = useFormHandler<T>(rest);
  return (
    <FormContext.Provider value={formValues as FormContextValues}>
      {render ? render(formValues) : children}
    </FormContext.Provider>
  );
};

export const useFormContext = <T extends Record<string, any> = Record<string, any>>() => {
  const context = useContext(FormContext);

  if (!context)
    throw new Error('useFormContext must be used from a Form child component');

  return context as FormContextValues<T>;
};

export default FormProvider;
