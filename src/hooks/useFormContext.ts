import { useContext } from 'react';
import { FormContext } from '../providers/FormProvider';
import { FormContextValues } from '../types/FormProvider';

const useFormContext = <T extends Record<string, any> = Record<string, any>>() => {
  const context = useContext(FormContext);

  if (!context)
    throw new Error('useFormContext must be used from a Form child component');

  return context as FormContextValues<T>;
};

export default useFormContext;
