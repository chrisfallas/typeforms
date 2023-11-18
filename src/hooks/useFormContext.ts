import { FormContext } from '../providers/FormProvider';
import { FormContextValues } from '../types/FormProvider';
import { useContext } from 'react';

const useFormContext = <T extends Record<string, any> = Record<string, any>>() => {
  const context = useContext(FormContext);

  if (!context) throw new Error('useFormContext must be used within a FormProvider');

  return context as FormContextValues<T>;
};

export default useFormContext;
